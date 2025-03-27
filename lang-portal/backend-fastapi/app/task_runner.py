import os
import json
from sqlalchemy.orm import Session
from app.models.database import engine, Base, SessionLocal
from app.models.models import Word, Group

def initialize_database():
    """Initialize the database by creating all tables."""
    Base.metadata.create_all(bind=engine)
    print("Database initialized.")

def seed_data():
    """Seed the database with initial data."""
    seed_file_path = os.path.join(os.path.dirname(__file__), "../db/seeds/words.json")
    with open(seed_file_path, "r") as file:
        seed_data = json.load(file)

    db: Session = SessionLocal()
    try:
        for item in seed_data:
            word = Word(
                japanese=item["kanji"],
                romaji=item["romaji"],
                english=item["english"],
                parts=item.get("parts", None)
            )
            db.add(word)
        db.commit()
        print("Database seeded with initial data.")
    finally:
        db.close()

def run_migrations():
    """Run database migrations using Alembic."""
    os.system("alembic upgrade head")
    print("Migrations applied.")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Task Runner for Backend")
    parser.add_argument("task", choices=["init_db", "migrate", "seed"], help="Task to run")
    args = parser.parse_args()

    if args.task == "init_db":
        initialize_database()
    elif args.task == "migrate":
        run_migrations()
    elif args.task == "seed":
        seed_data()