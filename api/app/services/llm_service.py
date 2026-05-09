import logging

from groq import Groq

logger = logging.getLogger(__name__)

try:
    client = Groq()
except Exception as e:
    logger.error(f"Nie udało się zainicjalizować klienta Groq. Sprawdź czy GROQ_API_KEY jest w .env: {e}")
    client = None


def generate_spam_explanation(text: str, msg_type: str, confidence: float) -> str:
    if not client:
        return "System LLM jest obecnie niedostępny."

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
            model="llama3-8b-8192",
            temperature=0.2,
            max_tokens=256,
        )

        explanation = chat_completion.choices[0].message.content.strip()
        return explanation

    except Exception as e:
        logger.error(f"Błąd podczas komunikacji z API Groq: {e}")
        return "Wiadomość wykazuje cechy spamu, ale generator szczegółowego opisu jest w tej chwili przeciążony."