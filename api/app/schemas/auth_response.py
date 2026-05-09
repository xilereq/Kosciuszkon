from pydantic import BaseModel


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    username: str
    role: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True
