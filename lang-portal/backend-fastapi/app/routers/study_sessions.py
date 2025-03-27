from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_study_sessions():
    return {
        "items": [
            {
                "id": 123,
                "activity_name": "Vocabulary Quiz",
                "group_name": "Basic Greetings",
                "start_time": "2025-02-08T17:20:23-05:00",
                "end_time": "2025-02-08T17:30:23-05:00",
                "review_items_count": 20
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 5,
            "total_items": 100,
            "items_per_page": 100
        }
    }

@router.get("/{id}")
async def get_study_session(id: int):
    return {
        "id": 123,
        "activity_name": "Vocabulary Quiz",
        "group_name": "Basic Greetings",
        "start_time": "2025-02-08T17:20:23-05:00",
        "end_time": "2025-02-08T17:30:23-05:00",
        "review_items_count": 20
    }