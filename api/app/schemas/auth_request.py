from pydantic import BaseModel


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    role: str = "user"


class LoginRequest(BaseModel):
    username: str
    password: str
