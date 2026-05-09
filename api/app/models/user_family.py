from sqlalchemy import Boolean, Column, ForeignKey, Integer

from app.db import Base


class UserFamily(Base):
    __tablename__ = 'user_family'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    family_id = Column(Integer, ForeignKey('families.id'),
                       primary_key=True)

    is_admin = Column(Boolean, default=False)
    notifications_enabled = Column(Boolean, default=True)
    