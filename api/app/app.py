import os
from datetime import timedelta

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.db import Base, engine
from app.services.predict_service import load_models

load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["JWT_SECRET_KEY"] = os.getenv(
        "JWT_SECRET_KEY", "default"
    )

    access_expires = int(os.getenv("JWT_ACCESS_TOKEN_MINUTES", 15))
    refresh_expires = int(os.getenv("JWT_REFRESH_TOKEN_DAYS", 1))

    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(
        minutes=access_expires
    )
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(
        days=refresh_expires
    )
    JWTManager(app)

    from app.routes import register_routes
    from app.utils import register_error_handlers
    register_routes(app)
    register_error_handlers(app)

    with app.app_context():
        from app.models import Family, User, UserFamily # noqa
        Base.metadata.create_all(bind=engine)
        load_models()

    return app
