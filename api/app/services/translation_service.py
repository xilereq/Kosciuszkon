import logging

from deep_translator import GoogleTranslator
from langdetect import detect, DetectorFactory

logger = logging.getLogger(__name__)

DetectorFactory.seed = 0

def detect_language(text: str) -> str:
    if not text or not text.strip():
        return 'unknown'

    try:
        lang = detect(text)
        return lang
    except Exception as e:
        logger.warning(f"Nie udało się wykryć języka dla tekstu. Błąd: {e}")
        return 'unknown'

def translate_to_english(text: str) -> str:
    if not text or not text.strip():
        return text

    try:
        translated_text = GoogleTranslator(source='auto', target='en').translate(text)
        return translated_text
    except Exception as e:
        logger.error(f"Błąd podczas tłumaczenia tekstu: {e}")
        return text