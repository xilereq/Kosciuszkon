from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db import Base


class Family(Base):
    __tablename__ = 'families'
    id = Column(Integer, primary_key=True)
    family_name = Column(String(100), nullable=False, unique=True)
    members = relationship("UserFamily", backref="family")
