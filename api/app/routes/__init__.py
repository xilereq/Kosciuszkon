from flask import Flask
from .auth import auth_api_bp
from .scan import scan_api_bp

def register_routes(app: Flask):
    app.register_blueprint(auth_api_bp)
    app.register_blueprint(scan_api_bp)
