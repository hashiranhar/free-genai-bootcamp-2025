from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    japanese = Column(String, nullable=False)
    romaji = Column(String, nullable=False)
    english = Column(String, nullable=False)
    parts = Column(JSON, nullable=True)

class WordGroup(Base):
    __tablename__ = "words_groups"
    id = Column(Integer, primary_key=True, index=True)
    word_id = Column(Integer, ForeignKey("words.id"), nullable=False)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)

class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

class StudySession(Base):
    __tablename__ = "study_sessions"
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    study_activity_id = Column(Integer, ForeignKey("study_activities.id"), nullable=True)

class StudyActivity(Base):
    __tablename__ = "study_activities"
    id = Column(Integer, primary_key=True, index=True)
    study_session_id = Column(Integer, ForeignKey("study_sessions.id"), nullable=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)

class WordReviewItem(Base):
    __tablename__ = "word_review_items"
    word_id = Column(Integer, ForeignKey("words.id"), primary_key=True)
    study_session_id = Column(Integer, ForeignKey("study_sessions.id"), primary_key=True)
    correct = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=False)