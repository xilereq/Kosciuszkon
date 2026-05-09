from typing import Optional

from pydantic import BaseModel


class ScanRequest(BaseModel):
    text: str
    source_type: Optional[str] = "unknown"
    sender: Optional[str] = None
    title: Optional[str] = None


class ScanResponse(BaseModel):
    status: str
    message: Optional[str] = None
    confidence: Optional[float] = None
