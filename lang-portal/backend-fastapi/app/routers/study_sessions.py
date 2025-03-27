from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import StudySession, WordReviewItem, Group, StudyActivity

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_study_sessions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sessions = db.query(StudySession).offset(skip).limit(limit).all()
    return {
        "items": [
            {
                "id": session.id,
                "activity_name": db.query(StudyActivity).filter(StudyActivity.id == session.study_activity_id).first().id,
                "group_name": db.query(Group).filter(Group.id == session.group_id).first().name,
                "start_time": session.created_at,
                "end_time": None,  # Add logic to calculate end time if needed
                "review_items_count": db.query(WordReviewItem).filter(WordReviewItem.study_session_id == session.id).count()
            }
            for session in sessions
        ],
        "pagination": {
            "current_page": skip // limit + 1,
            "total_pages": (db.query(StudySession).count() + limit - 1) // limit,
            "total_items": db.query(StudySession).count(),
            "items_per_page": limit
        }
    }

@router.get("/{session_id}")
def get_study_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(StudySession).filter(StudySession.id == session_id).first()
    if session:
        activity = db.query(StudyActivity).filter(StudyActivity.id == session.study_activity_id).first()
        group = db.query(Group).filter(Group.id == session.group_id).first()
        review_items_count = db.query(WordReviewItem).filter(WordReviewItem.study_session_id == session.id).count()
        return {
            "id": session.id,
            "activity_name": activity.id if activity else None,
            "group_name": group.name if group else None,
            "start_time": session.created_at,
            "end_time": None,  # Add logic to calculate end time if needed
            "review_items_count": review_items_count
        }
    return {}