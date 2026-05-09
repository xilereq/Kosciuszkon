from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, validates

from app.db import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default='user')
    latest_refresh_token = Column(String(2000), nullable=True)
    cyber_score = Column(Integer, default=50)
    current_streak = Column(Integer, default=0)
    family_memberships = relationship("UserFamily", backref="user")

    @validates('cyber_score')
    def validate_cyber_score(self, key, value): # noqa
        if value < 0:
            return 0
        if value > 100:
            return 100
        return value
