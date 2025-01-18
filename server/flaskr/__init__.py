import os

from datetime import timedelta
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

jwt = JWTManager()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
        JWT_SECRET_KEY="a72068d06c2c4ea18de0510df1d7b9a600fdc215010dedec4d85c59f0a743f21",
        JWT_TOKEN_LOCATION="headers",
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1)
    )
    cors = CORS(app, origins="*")
    jwt.init_app(app)

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/api/users", methods=["GET"])
    def users():
        return jsonify({"users": ["lucius", "gabe", "jai"]})

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import workout
    app.register_blueprint(workout.bp)
    app.add_url_rule("/", endpoint="index")

    return app
