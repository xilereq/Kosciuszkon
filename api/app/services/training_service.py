import logging

from sqlalchemy.sql.expression import func

from app.models.training_message import TrainingMessage
from app.services.llm_service import generate_training_explanation
from app.services.translation_service import translate_to_polish

logger = logging.getLogger(__name__)


def get_random_training_message(db_session):
    msg = db_session.query(TrainingMessage).order_by(func.random()).first()

    if not msg:
        raise ValueError("Brak wiadomości treningowych w bazie danych. Wykonaj import z pliku CSV.")

    text = translate_to_polish(msg.text)
    return {
        "message_id": str(msg.id),
        "text": text,
        "type": msg.msg_type
    }


def process_user_swipe(db_session, message_id: str, user_guess: str) -> dict:
    msg = db_session.query(TrainingMessage).filter(TrainingMessage.id == int(message_id)).first()

    if not msg:
        raise ValueError(f"Nie znaleziono wiadomości o ID: {message_id}")

    true_label = msg.label
    is_correct = (user_guess == true_label)
    explanation = None

    if not is_correct:
        explanation = generate_training_explanation(
            text=msg.text,
            true_label=true_label,
            user_guess=user_guess,
            msg_type=msg.msg_type
        )

    return {
        "is_correct": is_correct,
        "true_label": true_label,
        "explanation": explanation
    }