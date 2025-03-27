from fastapi import APIRouter

router = APIRouter()

@router.get("/last_study_session")
async def get_last_study_session():
    return {
        "id": 123,
        "group_id": 456,
        "created_at": "2025-02-08T17:20:23-05:00",
        "study_activity_id": 789,
        "group_name": "Basic Greetings"
    }

@router.get("/study_progress")
async def get_study_progress():
    return {
        "total_words_studied": 3,
        "total_available_words": 124
    }

@router.get("/quick-stats")
async def get_quick_stats():
    return {
        "success_rate": 80.0,
        "total_study_sessions": 4,
        "total_active_groups": 3,
        "study_streak_days": 4
    }