from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import StudyActivity, StudySession, Group

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_study_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    activities = db.query(StudyActivity).offset(skip).limit(limit).all()
    return {
        "items": [
            {
                "id": activity.id,
                "name": f"Activity {activity.id}",  # Replace with actual name if available
                "thumbnail_url": None,  # Add logic for thumbnail URL if needed
                "description": None  # Add logic for description if needed
            }
            for activity in activities
        ],
        "pagination": {
            "current_page": skip // limit + 1,
            "total_pages": (db.query(StudyActivity).count() + limit - 1) // limit,
            "total_items": db.query(StudyActivity).count(),
            "items_per_page": limit
        }
    }

@router.get("/{activity_id}")
def get_study_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(StudyActivity).filter(StudyActivity.id == activity_id).first()
    if activity:
        return {
            "id": activity.id,
            "name": f"Activity {activity.id}",  # Replace with actual name if available
            "thumbnail_url": None,  # Add logic for thumbnail URL if needed
            "description": None  # Add logic for description if needed
        }
    return {}

@router.post("/")
def create_study_activity(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if group:
        new_activity = StudyActivity(
            study_session_id=None,  # Add logic to link to a session if needed
            group_id=group.id,
            created_at=None  # Add logic to set the current timestamp
        )
        db.add(new_activity)
        db.commit()
        return {"id": new_activity.id, "group_id": group.id}
    return {"error": "Group not found"}