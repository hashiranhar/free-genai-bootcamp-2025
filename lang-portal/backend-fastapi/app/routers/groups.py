from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_groups():
    return {
        "items": [
            {
                "id": 1,
                "name": "Basic Greetings",
                "word_count": 20
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_items": 10,
            "items_per_page": 100
        }
    }

@router.get("/{id}")
async def get_group(id: int):
    return {
        "id": 1,
        "name": "Basic Greetings",
        "stats": {
            "total_word_count": 20
        }
    }

@router.get("/{id}/words")
async def get_group_words(id: int):
    return {
        "items": [
            {
                "japanese": "こんにちは",
                "romaji": "konnichiwa",
                "english": "hello",
                "correct_count": 5,
                "wrong_count": 2
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_items": 20,
            "items_per_page": 100
        }
    }