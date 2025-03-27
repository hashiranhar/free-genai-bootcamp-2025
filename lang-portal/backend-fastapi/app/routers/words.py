from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.models import Word, WordReviewItem

router = APIRouter()  

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_words(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    words = db.query(Word).offset(skip).limit(limit).all()
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
            "total_pages": (db.query(Word).count() + limit - 1) // limit,
            "total_items": db.query(Word).count(),
            "items_per_page": limit
        }
    }

@router.get("/{word_id}/")
def get_word(word_id: int, db: Session = Depends(get_db)):
    word = db.query(Word).filter(Word.id == word_id).first()
    if word:
        correct_count = db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == True).count()
        wrong_count = db.query(WordReviewItem).filter(WordReviewItem.word_id == word.id, WordReviewItem.correct == False).count()
        return {
            "japanese": word.japanese,
            "romaji": word.romaji,
            "english": word.english,
            "stats": {
                "correct_count": correct_count,
                "wrong_count": wrong_count
            },
            "groups": []  # Add logic to fetch groups if needed
        }
    return {}