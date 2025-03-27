from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import StudySession, WordReviewItem, Group

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/last_study_session")
def get_last_study_session(db: Session = Depends(get_db)):
    session = db.query(StudySession).order_by(StudySession.created_at.desc()).first()
    if session:
        group = db.query(Group).filter(Group.id == session.group_id).first()
        return {
            "id": session.id,
            "group_id": session.group_id,
            "created_at": session.created_at,
            "study_activity_id": session.study_activity_id,
            "group_name": group.name if group else None
        }
    return {}

@router.get("/study_progress")
def get_study_progress(db: Session = Depends(get_db)):
    total_words_studied = db.query(WordReviewItem.word_id).distinct().count()
    total_available_words = db.query(Group).count()
    return {
        "total_words_studied": total_words_studied,
        "total_available_words": total_available_words
    }

@router.get("/quick_stats")
def get_quick_stats(db: Session = Depends(get_db)):
    success_rate = db.query(WordReviewItem).filter(WordReviewItem.correct == True).count() / max(
        db.query(WordReviewItem).count(), 1) * 100
    total_study_sessions = db.query(StudySession).count()
    total_active_groups = db.query(Group).count()
    study_streak_days = 4  # Placeholder logic
    return {
        "success_rate": success_rate,
        "total_study_sessions": total_study_sessions,
        "total_active_groups": total_active_groups,
        "study_streak_days": study_streak_days
    }