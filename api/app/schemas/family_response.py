from typing import List

from pydantic import BaseModel


class FamilyCreateResponse(BaseModel):
    family_name: str
    id: int

    class Config:
        from_attributes = True


class AddFamilyMemberResponse(BaseModel):
    family_name: str
    is_admin: bool

    class Config:
        from_attributes = True


class FamilyMemberResponse(BaseModel):
    name: str
    is_admin: bool
    notification_count: int
    id: int

    class Config:
        from_attributes = True


class FamilyDashboardResponse(BaseModel):
    family_name: str
    members: List[FamilyMemberResponse]
