from fastapi import APIRouter

router = APIRouter()

@router.get("/{id}")
async def get_study_activity(id: int):
    return {
        "id": 1,
        "name": "Vocabulary Quiz",
        "thumbnail_url": "https://example.com/thumbnail.jpg",
        "description": "Practice your vocabulary with flashcards"
    }

@router.post("/")
async def create_study_activity(group_id: int, study_activity_id: int):
    return {
        "id": 124,
        "group_id": group_id
    }