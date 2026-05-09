from app.services.llm_service import generate_spam_explanation
from app.services.predict_service import get_prediction


def analyze_text_content(text: str) -> dict:
    try:
        prediction_result = get_prediction('email', text)
        is_spam = prediction_result.get('is_spam', False)
        confidence = prediction_result.get('confidence', 0.0)
        confidence_percent = round(confidence * 100, 1)

        if is_spam:
            explanation = generate_spam_explanation(
                text,
                msg_type='email',
                confidence=confidence
            )
            return {
                "status": "DANGER",
                "confidence": confidence_percent,
                "message": explanation
            }
        else:
            return {
                "status": "SAFE",
                "confidence": confidence_percent,
                "message": "Wiadomość wygląda bezpiecznie."
            }
    except Exception as e:
        print(e)
        return {
            "status": "SAFE",
            "confidence": 0.0,
            "message": "Wiadomość wygląda bezpiecznie."
        }
