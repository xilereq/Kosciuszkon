# 🛡️ Kompleksowa Platforma Anty-Phishingowa (Nazwa Robocza)

System składający się z aplikacji oraz wtycznki internetowej (docelowo również zawiera aplikację mobilną), który skutecznie łączy **aktywną ochronę przed cyberzagrożeniami** z **interaktywną edukacją**. Naszym celem jest budowa świadomości użytkowników na każdym poziomie zaawansowania technologicznego – od dziecka po seniora.

## 📖 Spis Treści
* [Wizja Projektu](#-wizja-projektu)
* [Główne Moduły)](#-główne-moduły)
* [Architektura Projektu](#-architektura-projektu)
* [Instalacja i Uruchomienie](#-instalacja-i-uruchomienie)

---

## 👁️ Wizja Projektu
W dobie rosnącej liczby cyberataków, tradycyjne filtry antyspamowe to za mało. Platforma nie tylko blokuje zagrożenia, ale przede wszystkim **edukuje użytkownika w czasie rzeczywistym**, przekładając skomplikowany żargon techniczny na prosty, zrozumiały język przy użyciu Sztucznej Inteligencji. Dzięki temu użytkownicy niezależnie od stopnia zaawansowania są w stanie dostrzegać otaczające ich zagrożenia w głównie w postaci phishingu.

---

## 🛠️ Główne Moduły

### 1. Analiza w Czasie Rzeczywistym
Bezpośrednia integracja ze skrzynką e-mail (docelowo również powiadomieniami SMS).
* **Sygnalizacja Wizualna:** Intuicyjny system świateł – 🟡 Żółta (Podejrzenie oszustwa) oraz 🔴 Czerwona (Definitywne oszustwo).
* **Wykrywanie Błędów:** Zaimplementowane algorytmy ML, pozwalające na ocenę wiarygodności wiadomości (mail, sms). Docelowo można wykorzystać większe wytrenowane modele np. z platformy Hugging Face. 
* **Zrozumiałe Komunikaty AI:** Algorytm generuje proste wyjaśnienie (np. *"Ten link jest niebezpieczny, ponieważ udaje Twojego kuriera"*).

### 2. Ręczne Weryfikacja Wiadomości
Bezpieczny sandbox. Użytkownik wkleja dowolny e-mail, SMS, a system (korzystający z hybrydy modeli Machine Learning i LLM) ocenia jego wiarygodność przed kliknięciem. Opisuje użytkownikowi potencjalne zagrożenie wynikające z treści wiadomości.

### 3. Interaktywna Strefa Edukacyjna
* **"Tinder dla Phishingu":** Minigra polegająca na szybkim ocenianiu wiadomości (Swipe w prawo = "Bezpieczne", Swipe w lewo = "Oszustwo"). Błędne decyzje są natychmiast korygowane przez wirtualnego trenera AI.

### 4. Bezpieczna Sieć Rodzinna
* **Cyfrowy Parasol Rodzinny:** Mechanizm ochrony głównie osób starszych oraz dzieci. Biegły technologicznie członek rodziny (np. wnuk) staje się administratorem. Jeśli chroniona osoba (np. babcia) próbuje wejść w interakcję z krytycznym zagrożeniem, administrator otrzymuje natychmiastowe powiadomienie PUSH, co pozwala na szybką interwencję. Pozwala to na ochronę osób najbardziej podatnych na próby phishingu.

### 5. Przycisk Paniki
* **Interaktywny Asystent SOS:** Ratunkowy Chatbot AI dostępny pod jednym przyciskiem. Zbiera najważniejsze fakty (np. "Czy podałeś kod BLIK?") i błyskawicznie generuje spersonalizowany plan ratunkowy (np. bezpośrednie numery do blokady kart), chroniąc ofiarę przed chaosem decyzyjnym.

---

## ⚙️ Architektura Projektu

Część serwerowa (API) została zaprojektowana z myślą o wysokiej wydajności, bezpieczeństwie i dokładności predykcji. Wykorzystany stack technologiczny:

* **Framework:** Python / Flask (`flask`, `flask-cors`, `flask-jwt-extended`)
* **Baza Danych:** PostgreSQL / SQLite (`sqlalchemy>=2.0`, `psycopg2-binary`)
* **Machine Learning:** Scikit-Learn (TF-IDF, Logistic Regression), `pandas`, `joblib`
* **Sztuczna Inteligencja (LLM):** Google Gemini (`google-genai`) oraz Groq API (`groq`)
* **Przetwarzanie Języka:** Automatyczna detekcja i tłumaczenie (`langdetect`, `deep_translator`)
* **Walidacja i DTO:** Ścisła kontrola typów (`pydantic`)
* **Infrastruktura i Testy:** Zarządzanie środowiskiem i testy automatyczne (`python-dotenv`, `pytest`)
