from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    text: str = Field(..., description="Treść wiadomości do analizy")


class PredictionDetails(BaseModel):
    is_spam: bool
    confidence: float
    explanation: str or None


class PredictResponse(BaseModel):
    type: str
    prediction: PredictionDetails
