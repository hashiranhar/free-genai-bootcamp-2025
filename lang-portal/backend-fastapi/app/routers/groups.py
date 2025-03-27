from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import Group, WordGroup, Word, StudySession, WordReviewItem, StudyActivity  # Ensure WordReviewItem is imported

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_groups(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    groups = db.query(Group).offset(skip).limit(limit).all()
    return {
        "items": [
            {
                "id": group.id,
                "name": group.name,
                "word_count": db.query(WordGroup).filter(WordGroup.group_id == group.id).count()
            }
            for group in groups
        ],
        "pagination": {
            "current_page": skip // limit + 1,
            "total_pages": (db.query(Group).count() + limit - 1) // limit,
            "total_items": db.query(Group).count(),
            "items_per_page": limit
        }
    }

@router.get("/{group_id}")
def get_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if group:
        word_count = db.query(WordGroup).filter(WordGroup.group_id == group.id).count()
        return {
            "id": group.id,
            "name": group.name,
            "stats": {
                "total_word_count": word_count
            }
        }
    return {}

@router.get("/{group_id}/words")
def get_group_words(group_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    word_ids = db.query(WordGroup.word_id).filter(WordGroup.group_id == group_id).all()
    words = db.query(Word).filter(Word.id.in_([word_id[0] for word_id in word_ids])).offset(skip).limit(limit).all()
    return {
        "items": [
            {
                "japanese": word.japanese,
                "romaji": word.romaji,
                "english": word.english,
                "correct_count": db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == True).count(),
                "wrong_count": db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == False).count()
            }
            for word in words
        ],
        "pagination": {
            "current_page": skip // limit + 1,
            "total_pages": (len(word_ids) + limit - 1) // limit,
            "total_items": len(word_ids),
            "items_per_page": limit
        }
    }

@router.get("/{group_id}/study_sessions")
def get_group_study_sessions(group_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sessions = db.query(StudySession).filter(StudySession.group_id == group_id).offset(skip).limit(limit).all()
    return {
        "items": [
            {
                "id": session.id,
                "activity_name": db.query(StudyActivity).filter(StudyActivity.id == session.study_activity_id).first().name,  # Use actual activity name
                "group_name": db.query(Group).filter(Group.id == session.group_id).first().name,
                "start_time": session.created_at,
                "end_time": session.updated_at,  # Assuming updated_at represents the end time
                "review_items_count": db.query(WordReviewItem).filter(WordReviewItem.study_session_id == session.id).count()
            }
            for session in sessions
        ],
        "pagination": {
            "current_page": skip // limit + 1,
            "total_pages": (db.query(StudySession).filter(StudySession.group_id == group_id).count() + limit - 1) // limit,
            "total_items": db.query(StudySession).filter(StudySession.group_id == group_id).count(),
            "items_per_page": limit
        }
    }

@router.get("/{id}/words")
def get_group_words_hardcoded(id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    word_ids = db.query(WordGroup.word_id).filter(WordGroup.group_id == id).all()
    words = db.query(Word).filter(Word.id.in_([word_id[0] for word_id in word_ids])).all()
    return {
        "items": [
            {
                "japanese": word.japanese,
                "romaji": word.romaji,
                "english": word.english,
                "correct_count": db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == True).count(),
                "wrong_count": db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == False).count()
            }
            for word in words
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_items": len(words),
            "items_per_page": len(words)
        }
    }