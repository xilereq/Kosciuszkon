import os
import joblib
import pytest
from app.services.predict_service import load_models, get_prediction

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_MODELS_DIR = os.path.join(BASE_DIR, 'ml_models')

SMS_SPAM_TEXT = "URGENT! You have won a 1 week FREE membership in our $100,000 Prize Jackpot! Txt the word: CLAIM to No: 81010"
SMS_HAM_TEXT = "Hey, are we still meeting for lunch today?"

EMAIL_PHISHING_TEXT = "Dear user, your PayPal account has been compromised. Click here to verify your identity: http://secure-paypal-update.com"
EMAIL_SAFE_TEXT = "Attached is the invoice for the Q3 marketing campaign. Let me know if you have questions."


@pytest.fixture(scope="module", autouse=True)
def setup_models():
    assert os.path.exists(os.path.join(ML_MODELS_DIR, 'sms_model.joblib')), "Brak modelu SMS!"
    assert os.path.exists(os.path.join(ML_MODELS_DIR, 'email_model.joblib')), "Brak modelu Email!"

    load_models()


def test_sms_spam_prediction():
    result = get_prediction('sms', SMS_SPAM_TEXT)
    assert result['is_spam'] is True
    assert result['confidence'] > 0.8

def test_sms_ham_prediction():
    result = get_prediction('sms', SMS_HAM_TEXT)
    assert result['is_spam'] is False


def test_email_phishing_prediction():
    result = get_prediction('email', EMAIL_PHISHING_TEXT)
    assert result['is_spam'] is True


def test_email_safe_prediction():
    result = get_prediction('email', EMAIL_SAFE_TEXT)
    assert result['is_spam'] is False
