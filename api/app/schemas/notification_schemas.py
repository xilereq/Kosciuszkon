from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from .notification_type import NotificationType


class NotificationCreateRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=2000)
    sender: str = Field(..., min_length=1, max_length=500)
    probability: float = Field(..., ge=0.0, le=1.0)
    content: Optional[str] = Field(None, max_length=5000)
    created_at: datetime
    type: NotificationType


class NotificationResponse(BaseModel):
    id: int
    title: str
    sender: str
    probability: float
    content: Optional[str]
    type: NotificationType
    created_at: datetime

    class Config:
        from_attributes = True
        use_enum_values = True


class NotificationsList(BaseModel):
    notifications: List[NotificationResponse]
