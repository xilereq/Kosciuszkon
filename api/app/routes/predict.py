from flask import Blueprint, request, jsonify

from app.services.predict_service import get_prediction
from app.services.llm_service import generate_spam_explanation

predict_bp = Blueprint('predict', __name__, url_prefix='/api/v1/predict')

@predict_bp.route('/sms', methods=['POST'])
def predict_sms():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Brak pola 'text'"}), 400

    try:
        text = data['text']
        result = get_prediction('sms', text)

        if result.get('is_spam') is True:
            explanation = generate_spam_explanation(
                text,
                msg_type = 'sms',
                confidence = result.get('confidence')
            )
            result['explanation'] = explanation
        else:
            result['explanation'] = None

        return jsonify({"type": "sms", "prediction": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@predict_bp.route('/email', methods=['POST'])
def predict_email():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Brak pola 'text'"}), 400

    try:
        text = data['text']
        result = get_prediction('email', text)

        if result.get('is_spam') is True:
            explanation = generate_spam_explanation(
                text,
                msg_type = 'email',
                confidence = result.get('confidence')
            )
            result['explanation'] = explanation
        else:
            result['explanation'] = None

        return jsonify({"type": "email", "prediction": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500