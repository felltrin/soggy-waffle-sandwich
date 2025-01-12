from flask import Flask, jsonify
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app, origins="*")

    @app.route("/api/users", methods=["GET"])
    def users():
        return jsonify({"users": ["lucius", "gabe", "jai"]})

    return app
