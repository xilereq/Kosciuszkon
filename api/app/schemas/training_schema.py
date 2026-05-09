from typing import Optional

from pydantic import BaseModel, Field


class RandomMessageResponse(BaseModel):
    message_id: str = Field(..., description="Unikalny identyfikator wiadomości w bazie")
    text: str = Field(..., description="Treść wiadomości do oceny")
    type: str = Field(..., description="Typ wiadomości: 'email' lub 'sms'")

class SwipeRequest(BaseModel):
    message_id: str
    guess: str = Field(..., description="Odpowiedź użytkownika: 'spam' (w lewo) lub 'safe' (w prawo)")

class SwipeResponse(BaseModel):
    is_correct: bool = Field(..., description="Czy użytkownik zgadł poprawnie?")
    true_label: str = Field(..., description="Prawdziwa etykieta wiadomości z bazy danych")
    explanation: Optional[str] = Field(None, description="Wyjaśnienie błędu przez LLM. Puste, jeśli zgadł poprawnie.")