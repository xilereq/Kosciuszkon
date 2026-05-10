# 🛡️ Kompleksowa Platforma Anty-Phishingowa (Nazwa Robocza)

System składający się z aplikacji oraz wtycznki internetowej (docelowo również zawiera aplikację mobilną), który skutecznie łączy **aktywną ochronę przed cyberzagrożeniami** z **interaktywną edukacją**. Naszym celem jest budowa świadomości użytkowników na każdym poziomie zaawansowania technologicznego – od dziecka po seniora.

## Spis Treści
* [Wizja Projektu](#wizja-projektu)
* [Główne Moduły](#główne-moduły)
* [Architektura Projektu](#architektura-projektu)
* [Instalacja i Uruchomienie](#instalacja-i-uruchomienie)
* [Struktura Aplikacji](#struktura-aplikacji)

---

## Wizja Projektu
W dobie rosnącej liczby cyberataków, tradycyjne filtry antyspamowe to za mało. Platforma nie tylko blokuje zagrożenia, ale przede wszystkim **edukuje użytkownika w czasie rzeczywistym**, przekładając skomplikowany żargon techniczny na prosty, zrozumiały język przy użyciu Sztucznej Inteligencji. Dzięki temu użytkownicy niezależnie od stopnia zaawansowania są w stanie dostrzegać otaczające ich zagrożenia w głównie w postaci phishingu.

---

## Główne Moduły

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

## Architektura Projektu

Część serwerowa (API) została zaprojektowana z myślą o wysokiej wydajności, bezpieczeństwie i dokładności predykcji. Wykorzystany stack technologiczny:

* **Framework:** Python / Flask (`flask`, `flask-cors`, `flask-jwt-extended`)
* **Baza Danych:** PostgreSQL / SQLAlchemy (`sqlalchemy>=2.0`, `psycopg2-binary`)
* **Machine Learning:** Scikit-Learn (TF-IDF, Logistic Regression), `pandas`, `joblib`
* **Sztuczna Inteligencja (LLM):** Google Gemini (`google-genai`) oraz Groq API (`groq`)
* **Przetwarzanie Języka:** Automatyczna detekcja i tłumaczenie (`langdetect`, `deep_translator`)
* **Walidacja i DTO:** Ścisła kontrola typów (`pydantic`)
* **Infrastruktura i Testy:** Zarządzanie środowiskiem i testy (`python-dotenv`, `pytest`)

## Instalacja i Uruchomienie

Projekt składa się z dwóch niezależnych modułów, które należy uruchomić osobno: serwera backendowego (`api`) oraz interfejsu użytkownika (`gui`).
Oraz wtyczki internetowej, którą trzeba rozpakować w trybie developera (`plugin`).

### 1. Klonowanie repozytorium
Pobierz projekt na swój dysk i wejdź do głównego folderu:
```bash
git clone https://github.com/xilereq/Kosciuszkon.git
```
Pobierz wszystkie potrzebne zależności:
```bash
pip install -e .
```
Uruchom aplikację serwerową:
```bash
cd api
flask run
```
Przejdź do katalogu gui i uruchom frontend:
```bash
cd ../gui
npm install
npm start
```
Wejdź na adres:
http://localhost:3000/

Instalacja wersji deweloperskiej (ScanRadar):
Otwórz nową kartę i wpisz adres: 
chrome://extensions
Włącz 'Tryb dewelopera' w prawym górnym rogu.
Kliknij 'Załaduj rozpakowane' i wybierz folder 'plugin' z naszego projektu."

## Struktura Aplikacji
```bash
📦 Katalog Główny
├── 📂 api/                              # Backend (FastAPI/Flask)
│   ├── 📂 app/                          # Główny pakiet aplikacji
│   │    ├── 📂 routes/                  # Endpointy API (auth, family, notification...)
│   │    ├── 📂 schemas/                 # Schematy Pydantic (walidacja danych)
│   │    ├── 📂 services/                # Logika biznesowa (AI, powiadomienia, DB) │
│   │    ├── 📂 utils/                   # Funkcje pomocnicze i obsługa błędów
│   │    ├── 📄 __init__.py              # Dodanie zależności głównej aplikacji do pakietu app
│   │    ├── 📄 app.py                   # Konfiguracja głównej aplikacji
│   │    └── 📄 db.py                    # Konfiguracja połączenia z bazą danych
│   ├── 📂 ml_models/                    # Katalog z modelami do wykrywania phishingu
│   │    ├── 📄 email_model.joblib       # Model do analizy wiadomości emaili
│   │    └── 📄 sms_model.joblib         # Model do analizy wiadomości sms
│   └── 📂 ml_pipeline/                  # Katalog z plikami do ML
│   │    ├── 📂 data/                    # Dane do treningu
│   │    │    ├── 📄 email_spam.csv      # Dane treningowe dla wiadomości email
│   │    │    └── 📄 sms_spam.csv        # Dane treningowe dla wiadomości sms
│   │    ├── 📄 import_csv.py            # Inicjalizacja tabeli w bazie danych do wiadomości "tinder"
│   │    └── 📄 train.py                 # Trenowanie modeli i ich zapis do pliku 
│   ├── 📄 run.py                        # Główny plik uruchamiający serwer (pakiet app)
└── 📂 gui/ 
    ├── 📂 public/                       # Pliki statyczne
    ├── 📄 favicon.svg                   # Ikona strony
    ├── 📄 icons.svg                     # Zbiór ikon wektorowych
    ├── 📄 index.html                    # Główny plik HTML aplikacji
    ├── 📂 src/                          # Frontend (React)
    │   ├── 📂 assets/                   # Grafiki i ikony (m m.in. hero.png, react.svg, vite.svg)
    │   ├── 📂 components/               # Komponenty wielokrotnego użytku
    │   │   ├── 📂 auth/                 # Komponenty formularzy (FormInput.js, SubmitButton.js)
    │   │   ├── 📂 layout/               # Elementy układu (Navbar.js, Footer.js, layout.css)
    │   │   └── 📂 sections/             # Większe sekcje podzielone na odpowiednie widoki:
    │   │       ├── 📂 FamilyDashboard/  # Sekcje panelu rodziny (np. MemberList, FamilyManagement)
    │   │       ├── 📂 MainDashboard/    # Sekcje strony głównej (np. Hero, Features, Partners)
    │   │       └── 📂 UserDashboard/    # Sekcje panelu użytkownika (np. ActiveShield, AnalysisLab)
    │   ├── 📂 pages/                    # Główne widoki/strony aplikacji
    │   │   ├── 📂 Auth/                 # Strony autoryzacji (Login.js, Register.js, AuthLayout.js)
    │   │   └── 📂 Dashboard/            # Strony paneli (Dashboard.js, FamilyDashboard.js, UserDashboard.js)
    │   ├── 📂 services/                 # Logika biznesowa i komunikacja z API (api.js oraz poszczególne serwisy m.in. AuthService, FamilyService)
    │   ├── 📄 App.js                    # Główny komponent i routing
    │   ├── 📄 index.js                  # Główny plik eksportujący/agregujący
    │   ├── 📄 index.css                 # Główne style (Tailwind CSS)
    │   ├── 📄 main.js                   # Punkt wejścia aplikacji React (charakterystyczny dla Vite)
    │   └── 📄 reportWebVitals.js        # Pomiary wydajności (Web Vitals)
    ├── 📄 app.py                        # Główny plik startowy serwera backendowego (Python)
    ├── 📄 package.json                  # Konfiguracja projektu frontendowego, skrypty i zależności npm
    ├── 📄 package-lock.json             # Zablokowane, dokładne wersje drzewa zależności npm
    ├── 📄 postcss.config.js             # Konfiguracja narzędzia PostCSS
    ├── 📄 tailwind.config.js            # Konfiguracja stylów Tailwind CSS
    └── 📄 README.md                     # Dokumentacja projektu
```
