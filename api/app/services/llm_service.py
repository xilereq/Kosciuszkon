import logging
import os

from google import genai
from google.genai import types
from groq import Groq

logger = logging.getLogger(__name__)

def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        logger.error("Błąd: Zmienna GROQ_API_KEY jest pusta lub nie została załadowana z .env!")
        return None
    try:
        return Groq(api_key=api_key)
    except Exception as e:
        logger.error(f"Nie udało się zainicjalizować klienta Groq: {e}")
        return None

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("Błąd: Zmienna GEMINI_API_KEY jest pusta lub nie została załadowana z .env!")
        return None

    try:
        return genai.Client(api_key = api_key)
    except Exception as e:
        logger.error(f"Nie udało się skonfigurować API Gemini: {e}")
        return None

def generate_spam_explanation(text: str, msg_type: str, confidence: float) -> str:
    client = get_groq_client()

    if not client:
        return "System LLM jest obecnie niedostępny (Brak konfiguracji API)."

    confidence_percent = round(confidence * 100, 1)

    prompt = (
        f"Poniższa wiadomość ({msg_type}) została oflagowana jako potencjalne oszustwo lub spam.\n\n"
        f"Twoje zadanie: Napisz bardzo krótkie ostrzeżenie dla użytkownika (maksymalnie 1-2 zdania). "
        f"Wskaż wprost konkretne elementy, które zdradzają oszustwo (np. podejrzany link, presja czasu, żądanie dopłaty).\n\n"
        f"ZASADY:\n"
        f"- Podawaj konkretne informacje, bez zbędnych dodatków."
        f"- Kategorycznie zabraniam używania słów takich jak 'algorytm', 'system', 'prawdopodobieństwo' czy podawania jakichkolwiek procentów.\n"
        f"- Bądź zwięzły i konkretny.\n\n"
        f"Wiadomość do analizy:\n\"{text}\""
    )

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Jesteś asystentem cyberbezpieczeństwa. Zwracaj się bezpośrednio do użytkownika. "
                        "Pisz zwięźle, prosto do celu, po polsku. Nie dodawaj wstępów typu 'Oto odpowiedź'."
                    )
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.1-8b-instant",
            temperature=0.2,
            max_tokens=256,
        )

        explanation = chat_completion.choices[0].message.content.strip()
        return explanation

    except Exception as e:
        logger.error(f"Błąd podczas komunikacji z API Groq: {e}")
        return "Wiadomość wykazuje cechy spamu, ale generator szczegółowego opisu jest w tej chwili przeciążony."


def generate_training_explanation(text: str, true_label: str, user_guess: str, msg_type: str = "wiadomość") -> str:
    client = get_gemini_client()
    if not client:
        return "System edukacyjny jest obecnie niedostępny."

    if true_label == 'spam' and user_guess == 'safe':
        prompt = (
            f"Użytkownik uznał poniższą wiadomość ({msg_type}) za bezpieczną, ale w rzeczywistości to PHISHING/OSZUSTWO. "
            f"Bądź dla niego wyrozumiały, ale wskaż mu palcem w 1-2 zdaniach, jakie elementy (tzw. red flags) "
            f"powinny wzbudzić jego czujność.\nWiadomość:\n\"{text}\""
        )
    else:
        prompt = (
            f"Użytkownik uznał poniższą wiadomość ({msg_type}) za oszustwo, ale w rzeczywistości to BEZPIECZNY, "
            f"zwykły komunikat. Wyjaśnij mu w 1-2 zdaniach, dlaczego ta wiadomość nie zawiera cech ataku "
            f"i dlaczego mógł się pomylić (np. to tylko zwykłe powiadomienie).\nWiadomość:\n\"{text}\""
        )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "Jesteś trenerem cyberbezpieczeństwa. Uczysz użytkowników przez wskazywanie błędów. "
                    "Pisz zwięźle i przystępnie."
                ),
                temperature=0.3,
                max_output_tokens=5000
            )
        )

        return response.text.strip()

    except Exception as e:
        logger.error(f"Błąd LLM w module treningowym (Gemini): {e}")
        return "Niestety pomyliłeś się, ale generator szczegółowych wyjaśnień jest w tej chwili przeciążony."