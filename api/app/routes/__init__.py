from flask import Flask

from .auth import auth_api_bp
from .chatbot import chat_bp
from .family import family_bp
from .notification import notification_bp
from .predict import predict_bp
from .scan import scan_api_bp
from .training import training_bp


def register_routes(app: Flask):
    app.register_blueprint(auth_api_bp)
    app.register_blueprint(scan_api_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(family_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(training_bp)
