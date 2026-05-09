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
