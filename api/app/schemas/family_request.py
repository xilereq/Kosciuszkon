from pydantic import BaseModel, Field


class FamilyCreateRequest(BaseModel):
    family_name: str = Field(..., min_length=3, max_length=100)


class FamilyJoinRequest(BaseModel):
    family_name: str
    is_admin: bool = False
