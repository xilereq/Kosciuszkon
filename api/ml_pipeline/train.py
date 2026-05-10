import os

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(SCRIPT_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'ml_models')

os.makedirs(MODELS_DIR, exist_ok=True)


def train_and_evaluate(df, text_column, label_column, model_name,
                       save_filename):
    print(f"\n--- Trenowanie modelu: {model_name} ---")

    X = df[text_column]
    y = df[label_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y,
                                                        test_size=0.2,
                                                        random_state=42,
                                                        stratify=y)

    model = make_pipeline(
        TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_df=0.9),

        LogisticRegression(class_weight='balanced', max_iter=1000)
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print(f"Skuteczność (Raport Klasyfikacji) dla {model_name}:")
    print(classification_report(y_test, y_pred,
                                target_names=['Ham (0)', 'Spam (1)']))

    print(
        f"Dotrenowywanie na pełnym zbiorze danych dla {model_name}...")
    model.fit(df[text_column], df[label_column])

    model_path = os.path.join(MODELS_DIR, save_filename)
    joblib.dump(model, model_path)
    print(f"Model zapisany poprawnie w: {model_path}")


def train_sms_model():
    data_path = os.path.join(DATA_DIR, 'sms_spam.csv')
    df = pd.read_csv(data_path, encoding='latin-1',
                     usecols=['v1', 'v2'])
    df.columns = ['label', 'text']
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})

    train_and_evaluate(df, text_column='text', label_column='label',
                       model_name="SMS",
                       save_filename="sms_model.joblib")


def train_email_model():
    data_path = os.path.join(DATA_DIR, 'email_spam.csv')
    df = pd.read_csv(data_path)
    df = df.dropna()

    train_and_evaluate(df, text_column='body', label_column='label',
                       model_name="Email",
                       save_filename="email_model.joblib")


if __name__ == "__main__":
    train_sms_model()
    train_email_model()
    print("\n[OK] Zakończono proces budowy modeli!")
