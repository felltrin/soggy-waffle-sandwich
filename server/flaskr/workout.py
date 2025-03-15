from flask import Blueprint, redirect, request, url_for, jsonify
from werkzeug.exceptions import abort

from flask_jwt_extended import jwt_required, current_user
from flaskr.db import get_db

bp = Blueprint("workout", __name__)


@bp.route("/")
@jwt_required()
def index():
    db = get_db()
    workouts = db.execute(
        "SELECT w.id, created, distance, duration, user_id"
        " FROM workout w WHERE w.user_id = ?"
        "  ORDER BY created DESC",
        (current_user["id"],),
    ).fetchall()

    workout_arr = []
    for workout in workouts:
        workout_obj = {
            "id": workout["id"],
            "created": workout["created"],
            "duration": workout["duration"],
            "distance": workout["distance"],
        }
        workout_arr.append(workout_obj)

    return jsonify({"message": "Workouts Retrieved", "workouts": workout_arr})


@bp.route("/create", methods=["GET", "POST"])
@jwt_required()
def create():
    if request.method == "POST":
        data = request.get_json()
        duration = data["formData"]["duration"]
        distance = data["formData"]["distance"]

        if not duration:
            return jsonify({"message": "Duration is required."})
        else:
            db = get_db()
            db.execute(
                "INSERT INTO workout (duration, distance, user_id)" " VALUES (?, ?, ?)",
                (duration, distance, current_user["id"]),
            )
            db.commit()
            # return redirect(url_for("workout.index"))
            return jsonify({"message": "Workout Added", "data": f"{duration}, {distance}"})


def get_workout(id, check_author=True):
    workout = (
        get_db()
        .execute(
            "SELECT w.id, duration, distance, created, user_id"
            " FROM workout w JOIN user u ON w.user_id = u.id"
            " WHERE w.id = ?",
            (id,),
        )
        .fetchone()
    )

    if workout is None:
        abort(404, f"Workout id {id} doesn't exist.")

    if check_author and workout["user_id"] != current_user["id"]:
        abort(403)

    return workout


@bp.route("/<int:id>/update", methods=["POST"])
@jwt_required()
def update(id):
    workout = get_workout(id)

    # FIXME: add functionality for a GET request
    data = request.get_json()
    distance = data["distance"]
    duration = data["duration"]
    error = None

    if not distance:
        error = "Distance is required"

    if error is not None:
        return jsonify({"error": error})
    else:
        db = get_db()
        db.execute(
            "UPDATE workout SET distance = ?, duration = ?" " WHERE id = ?",
            (distance, duration, id),
        )
        db.commit()
        return redirect(url_for("workout.index"))


@bp.route("/<int:id>/delete", methods=["POST"])
@jwt_required()
def delete(id):
    get_workout(id)
    db = get_db()
    db.execute("DELETE FROM workout WHERE id = ?", (id,))
    db.commit()
    workouts = db.execute(
        "SELECT w.id, created, distance, duration, user_id"
        " FROM workout w WHERE w.user_id = ?"
        "  ORDER BY created DESC",
        (current_user["id"],),
    ).fetchall()

    workout_arr = []
    for workout in workouts:
        workout_obj = {
            "id": workout["id"],
            "created": workout["created"],
            "duration": workout["duration"],
            "distance": workout["distance"],
        }
        workout_arr.append(workout_obj)

    return jsonify({"message": "Workout has been successfully deleted", "workouts": workout_arr}), 200
