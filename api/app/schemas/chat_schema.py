from typing import List

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(..., description="Rola: 'user', 'system' lub 'assistant'")
    content: str = Field(..., description="Treść wiadomości")

class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., description="Historia konwersacji")

class ChatResponse(BaseModel):
    status: str
    reply: str