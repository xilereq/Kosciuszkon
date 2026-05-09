import logging
import os

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

def generate_spam_explanation(text: str, msg_type: str, confidence: float) -> str:
    client = get_groq_client()

    if not client:
        return "System LLM jest obecnie niedostępny (Brak konfiguracji API)."

    confidence_percent = round(confidence * 100, 1)

    prompt = (
        f"Przeanalizuj poniższą wiadomość ({msg_type}). Nasz główny system wykrywania zagrożeń "
        f"ocenił z pewnością {confidence_percent}%, że jest to próba oszustwa/spamu.\n\n"
        f"Twoje zadanie: Napisz w 1-2 zdaniach wyjaśnienie dla użytkownika.\n"
        f"- Jeśli pewność wynosi powyżej 80%, wskaż stanowczo, co zdradza oszustwo (np. linki, podszywanie się).\n"
        f"- Jeśli pewność wynosi poniżej 80%, użyj tonu doradczego – wskaż elementy, które wzbudziły podejrzenia "
        f"algorytmu, ale zaznacz, że sytuacja nie jest jednoznaczna.\n\n"
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