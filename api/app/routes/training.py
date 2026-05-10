import os

from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.schemas import RandomMessageResponse, \
    SwipeRequest, SwipeResponse
from app.services import get_random_training_message, \
    process_user_swipe

training_bp = Blueprint('training', __name__,
                        url_prefix='/api/training')

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False,
                            bind=engine)


def get_db():
    db = SessionLocal()
    try:
        return db
    except Exception as e:
        db.close()
        raise e


@training_bp.route('/random', methods=['GET'])
def get_random_message():
    db_session = get_db()
    try:
        raw_msg = get_random_training_message(db_session)

        response_obj = RandomMessageResponse(**raw_msg)
        return jsonify(response_obj.model_dump()), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db_session.close()


@training_bp.route('/swipe', methods=['POST'])
def handle_swipe():
    json_data = request.get_json() or {}

    try:
        req = SwipeRequest(**json_data)
    except ValidationError as e:
        return jsonify({"error": "Błąd walidacji wejścia",
                        "details": e.errors()}), 400

    db_session = get_db()
    try:
        result = process_user_swipe(db_session, req.message_id,
                                    req.guess)

        response_obj = SwipeResponse(**result)
        return jsonify(response_obj.model_dump()), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": "Wewnętrzny błąd serwera"}), 500
    finally:
        db_session.close()
