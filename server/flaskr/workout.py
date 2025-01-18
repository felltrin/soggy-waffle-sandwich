from flask import (
    Blueprint, redirect, request, url_for, jsonify
)
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
        " FROM workout w JOIN user u ON w.user_id = u.id"
        " ORDER BY created DESC"
    ).fetchall()

    workout_arr = []
    for workout in workouts:
        workout_obj = {"created": workout["created"], "duration": workout["duration"], "distance": workout["distance"]}
        workout_arr.append(workout_obj)

    return jsonify({"message": "Workouts Retrieved", "workouts": workout_arr})


@bp.route("/create", methods=["GET", "POST"])
@jwt_required()
def create():
    if request.method == "POST":
        data = request.get_json()
        duration = data["duration"]
        distance = data["distance"]

        if not duration:
            return jsonify({"message": "Duration is required."})
        else:
            db = get_db()
            db.execute(
                "INSERT INTO workout (duration, distance, user_id)"
                " VALUES (?, ?, ?)",
                (duration, distance, current_user["id"])
            )
            db.commit()
            return redirect(url_for("workout.index"))
