from sqlalchemy import Column, DateTime, Enum, Float, ForeignKey, \
    Integer, String
from sqlalchemy.sql import func

from app.db import Base
from app.schemas import NotificationType


class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True)
    family_id = Column(Integer, ForeignKey('families.id'))
    user_id = Column(Integer, ForeignKey('users.id'),
                     nullable=False)
    title = Column(String(2000), nullable=False)
    sender = Column(String(500), nullable=False)
    probability = Column(Float, nullable=False)
    content = Column(String(5000), nullable=True)

    created_at = Column(DateTime,
                        server_default=func.now())
    type = Column(Enum(NotificationType), nullable=False,
                  default=NotificationType.EMAIL)
