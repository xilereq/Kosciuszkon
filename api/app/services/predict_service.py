import logging
import os

import joblib

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ML_MODELS_DIR = os.path.join(BASE_DIR, 'ml_models')

_sms_model = None
_email_model = None


def load_models():
    global _sms_model, _email_model
    try:
        if not _sms_model:
            _sms_model = joblib.load(os.path.join(ML_MODELS_DIR, 'sms_model.joblib'))
        if not _email_model:
            _email_model = joblib.load(os.path.join(ML_MODELS_DIR, 'email_model.joblib'))
    except Exception as e:
        logger.error(f"Nie udało się załadować modeli ML: {e}")


def get_prediction(msg_type, text):
    model = _sms_model if msg_type == 'sms' else _email_model

    if not model:
        raise ValueError(f"Model dla {msg_type} nie jest załadowany.")

    prediction = model.predict([text])[0]
    probabilities = model.predict_proba([text])[0]
    confidence = float(probabilities[prediction])

    return {
        "is_spam": bool(prediction == 1),
        "confidence": round(confidence, 4)
    }