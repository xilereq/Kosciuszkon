from sqlalchemy import Column, Integer, String, Text

from app.db import Base


class TrainingMessage(Base):
    __tablename__ = 'training_messages'

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    label = Column(String(50), nullable=False)
    msg_type = Column(String(50), nullable=False)

    def __repr__(self):
        return f"<TrainingMessage(id={self.id}, label='{self.label}', type='{self.msg_type}')>"