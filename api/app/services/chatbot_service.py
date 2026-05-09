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


SYSTEM_PROMPT = """Jesteś ekspertem ds. cyberbezpieczeństwa i reagowania na incydenty. 
Twoim zadaniem jest pomoc użytkownikom, którzy padli ofiarą oszustwa internetowego (phishing, scam, wyciek danych, itp.).

TWOJE ZASADY:
1. Bądź spokojny, empatyczny i profesjonalny. Nigdy nie obwiniaj ofiary (ludzie w tej sytuacji są w stresie).
2. Działaj jak ratownik medyczny: najpierw zatamuj krwawienie. Podawaj instrukcje w krótkich, numerowanych krokach, zaczynając od najważniejszego.
3. Bazuj na polskich realiach. Zawsze doradzaj odpowiednie dla sytuacji kroki:
   - Wyciek danych z karty / loginu do banku: Natychmiastowy telefon na infolinię banku, by zablokować kartę/aplikację.
   - Wyciek danych osobowych (dowód osobisty, PESEL): Zastrzeżenie numeru PESEL w aplikacji mObywatel, wykupienie Alertów BIK.
   - Przejęcie konta (Facebook, Google): Zmiana hasła (jeśli to możliwe), włączenie uwierzytelniania dwuskładnikowego (2FA), wylogowanie wszystkich sesji.
   - Zgłaszanie incydentów: Zgłoszenie złośliwej strony do CERT Polska (incydent.cert.pl lub SMS na nr 799 448 084) oraz zgłoszenie sprawy na Policję w przypadku utraty środków finansowych.
4. Pisz zwięźle. Używaj Markdown (pogrubień) do podkreślenia kluczowych akcji. Nie używaj żargonu technicznego.
"""

def generate_chat_response(conversation_history: list) -> str:
    """
    Przyjmuje historię konwersacji w formacie:
    [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
    """
    client = get_groq_client()
    if not client:
        return "Przepraszamy, asystent bezpieczeństwa jest w tej chwili niedostępny. Jeśli Twoje środki na koncie są zagrożone, natychmiast skontaktuj się ze swoim bankiem!"

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(conversation_history)

    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            max_tokens=1024,
        )

        return chat_completion.choices[0].message.content.strip()

    except Exception as e:
        logger.error(f"Błąd podczas komunikacji z API Groq (Chatbot): {e}")
        return "Wystąpił problem z połączeniem. Pamiętaj: najważniejszy krok to zablokowanie dostępu do konta bankowego poprzez infolinię Twojego banku."