from flask import Blueprint, request, jsonify
from werkzeug.exceptions import abort

from flask_jwt_extended import jwt_required, current_user
from flaskr.db import get_db

from calendar import month_name

bp = Blueprint("workout", __name__)


def get_workouts(db):
    user_months_set = set()
    workout_arr = []
    
    workouts = db.execute(
        "SELECT w.id, created, distance, duration, user_id"
        " FROM workout w WHERE w.user_id = ?"
        "  ORDER BY created DESC",
        (current_user["id"],),
    ).fetchall()
    
    for workout in workouts:
        workout_obj = {
            "id": workout["id"],
            "created": workout["created"],
            "duration": workout["duration"],
            "distance": workout["distance"],
        }
        user_months_set.add(workout["created"].strftime("%B"))
        workout_arr.append(workout_obj)

    # used during month sorting
    month_lookup = list(month_name)
    month_list = sorted(user_months_set, key=month_lookup.index)

    """
    This is a multi line comment 
    Yippie
    This section of code is for calculating the average time of a user's
    logged workouts
    For this, I will use a dictionary to keep track of the month (key)
    And the times for the value
    """
    # Empty dictionary with keys
    user_month_data = dict.fromkeys(month_list, 0)
    month_count = dict.fromkeys(month_list, 0)

    # calculating time
    for i in range(len(workout_arr)):
        cur_workout = workout_arr[i]
        cur_month = cur_workout["created"].strftime("%B")
        month_count[cur_month] += 1
        user_month_data[cur_month] += cur_workout["duration"]

    for key in user_month_data.keys():
        user_month_data[key] /= month_count[key]
    
    workout_data = {"data": workout_arr, "month_label": month_list, "times": user_month_data}
    return workout_data


@bp.route("/")
@jwt_required()
def index():
    db = get_db()
    workout_data = get_workouts(db)
    
    return jsonify({"message": "Workouts Retrieved", "workouts": workout_data})


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
            workout_arr = get_workouts(db)
            return jsonify({"message": "Workout Added", "data": f"{duration}, {distance}", "workouts": workout_arr})


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


@bp.route("/<int:id>/update", methods=['GET', "POST"])
@jwt_required()
def update(id):
    if request.method == "GET":
        workout = get_workout(id)
        return jsonify({"duration": workout["duration"], "distance": workout["distance"]});

    if request.method == "POST":
        data = request.get_json()
        distance = data["workout"]["distance"]
        duration = data["workout"]["duration"]
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
            workout_arr = get_workouts(db)
            return jsonify({"message": "Workout has been successfully updated", "workouts": workout_arr}), 200


@bp.route("/<int:id>/delete", methods=["POST"])
@jwt_required()
def delete(id):
    get_workout(id)
    db = get_db()
    db.execute("DELETE FROM workout WHERE id = ?", (id,))
    db.commit()
    workout_arr = get_workouts(db)
    return jsonify({"message": "Workout has been successfully deleted", "workouts": workout_arr}), 200
