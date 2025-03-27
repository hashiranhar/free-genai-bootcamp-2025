from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_words():
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
            "total_pages": 5,
            "total_items": 500,
            "items_per_page": 100
        }
    }

@router.get("/{id}")
async def get_word(id: int):
    return {
        "japanese": "こんにちは",
        "romaji": "konnichiwa",
        "english": "hello",
        "stats": {
            "correct_count": 5,
            "wrong_count": 2
        },
        "groups": [
            {
                "id": 1,
                "name": "Basic Greetings"
            }
        ]
    }