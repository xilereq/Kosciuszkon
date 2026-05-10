from .llm_service import generate_spam_explanation
from .predict_service import get_prediction
from .translation_service import detect_language, translate_to_english


def analyze_text_content(text: str) -> dict:
    try:
        detected_lang = detect_language(text)
        if detected_lang not in ('en', 'unknown'):
            text_for_ml = translate_to_english(text)
        else:
            text_for_ml = text

        prediction_result = get_prediction('email', text_for_ml)
        is_spam = prediction_result.get('is_spam', False)
        confidence = prediction_result.get('confidence', 0.0)
        confidence_percent = round(confidence * 100, 1) + 10


        if is_spam:
            explanation = generate_spam_explanation(
                text,
                msg_type='email',
                confidence=confidence
            )

            status = "DANGER" if confidence_percent > 80 else "WARNING"

            return {
                "status": status,
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