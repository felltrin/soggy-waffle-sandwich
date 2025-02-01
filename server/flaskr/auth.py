from datetime import datetime, timezone

from flask import Blueprint, redirect, request, url_for, jsonify
from flask_jwt_extended import jwt_required, create_access_token, current_user, get_jwt
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
from . import jwt

bp = Blueprint("auth", __name__, url_prefix="/auth")


@jwt.user_identity_loader
def user_identity_loader(user):
    return user["id"]


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    db = get_db()

    return db.execute("SELECT * FROM user WHERE id = ?", (identity,)).fetchone()


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    db = get_db()
    token = db.execute("SELECT * FROM tokenblocklist WHERE jti = ?", (jti,)).fetchone()

    return token is not None


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["formData"]["username"]
    password = data["formData"]["password"]
    print("Received data:", username, password)
    db = get_db()

    if not username:
        return (
            jsonify({"message": "Registration Failed: Username is required."}),
            401,
        )
    elif not password:
        return (
            jsonify({"message": "Registration Failed: Password is required."}),
            401,
        )

    try:
        db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, generate_password_hash(password)),
        )
        db.commit()
    except db.IntegrityError:
        return (
            jsonify({"message": f"Username {username} is already registered."}),
            401,
        )
    else:
        user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()
        access_token = create_access_token(identity=user)
        return (
            jsonify(
                {"message": "Registration Successful", "access_token": access_token}
            ),
            200,
        )


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        print("Received data:", username, password)

        db = get_db()
        user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()

        if user and check_password_hash(user["password"], password):
            access_token = create_access_token(identity=user)
            return jsonify({"message": "Login Success", "access_token": access_token})
        else:
            return jsonify({"message": "Login Failed"}), 401


@bp.route("/get_name", methods=["GET"])
@jwt_required()
def get_name():
    return jsonify(
        {
            "message": "User found",
            "name": "User " + current_user["username"],
            "id": current_user["id"],
            "password": current_user["password"],
        }
    )


@bp.route("/logout", methods=["DELETE"])
@jwt_required()
def modify_token():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db = get_db()

    try:
        db.execute(
            "INSERT INTO tokenblocklist (jti, created_at) VALUES (?, ?)",
            (jti, now),
        )
        db.commit()
    except db.IntegrityError:
        return (
            jsonify({"message": f"JTI {jti} is already blocked."}),
            401,
        )
    else:
        print("JWT Revoked")
        return redirect(url_for("auth.login"))
