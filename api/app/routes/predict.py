from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from app.schemas.predict_schema import PredictionDetails, \
    PredictRequest, PredictResponse
from app.services import generate_spam_explanation
from app.services.predict_service import get_prediction
from app.services.translation_service import detect_language, \
    translate_to_english

predict_bp = Blueprint('predict', __name__, url_prefix='/api/predict')


def _process_prediction(msg_type: str):
    json_data = request.get_json() or {}

    try:
        req = PredictRequest(**json_data)
    except ValidationError as e:
        return jsonify({"error": "Błąd walidacji danych wejściowych",
                        "details": e.errors()}), 400

    try:
        original_text = req.text

        detected_language = detect_language(original_text)
        if detected_language not in ('en', 'unknown'):
            text_for_ml = translate_to_english(original_text)
        else:
            text_for_ml = original_text

        result = get_prediction(msg_type, text_for_ml)

        if result.get('is_spam') is True:
            explanation = generate_spam_explanation(
                text=original_text,
                msg_type=msg_type,
                confidence=result.get('confidence')
            )
        else:
            explanation = None

        response_obj = PredictResponse(
            type=msg_type,
            prediction=PredictionDetails(
                is_spam=result.get('is_spam'),
                confidence=result.get('confidence'),
                explanation=explanation
            )
        )

        return jsonify(response_obj.model_dump()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@predict_bp.route('/sms', methods=['POST'])
def predict_sms():
    return _process_prediction('sms')


@predict_bp.route('/email', methods=['POST'])
def predict_email():
    return _process_prediction('email')
