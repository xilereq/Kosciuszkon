from flask import Flask

from .auth import auth_api_bp
from .family import family_bp
from .predict import predict_bp


def register_routes(app: Flask):
    app.register_blueprint(auth_api_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(family_bp)
