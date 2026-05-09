from flask import Blueprint, request, jsonify
from pydantic import ValidationError

from app.services.predict_service import get_prediction
from app.services.llm_service import generate_spam_explanation
from app.schemas.predict_schema import PredictRequest, PredictResponse, PredictionDetails

predict_bp = Blueprint('predict', __name__, url_prefix='/api/predict')

@predict_bp.route('/sms', methods=['POST'])
def predict_sms():
    json_data = request.get_json() or {}

    try:
        req = PredictRequest(**json_data)
    except ValidationError as e:
        return jsonify({"error": "Błąd walidacji danych wejściowych", "details": e.errors()}), 400

    try:
        result = get_prediction('sms', req.text)

        if result.get('is_spam') is True:
            explanation = generate_spam_explanation(
                text=req.text,
                msg_type='sms',
                confidence=result.get('confidence')
            )
        else:
            explanation = None

        response_obj = PredictResponse(
            type="sms",
            prediction=PredictionDetails(
                is_spam=result.get('is_spam'),
                confidence=result.get('confidence'),
                explanation=explanation
            )
        )

        return jsonify(response_obj.model_dump()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@predict_bp.route('/email', methods=['POST'])
def predict_email():
    json_data = request.get_json() or {}

    try:
        req = PredictRequest(**json_data)
    except ValidationError as e:
        return jsonify({"error": "Błąd walidacji danych wejściowych", "details": e.errors()}), 400

    try:
        text = req.text
        result = get_prediction('email', text)

        if result.get('is_spam') is True:
            explanation = generate_spam_explanation(
                text=req.text,
                msg_type='email',
                confidence=result.get('confidence')
            )
        else:
            explanation = None

        response_obj = PredictResponse(
            type="email",
            prediction=PredictionDetails(
                is_spam=result.get('is_spam'),
                confidence=result.get('confidence'),
                explanation=explanation
            )
        )

        return jsonify(response_obj.model_dump()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500