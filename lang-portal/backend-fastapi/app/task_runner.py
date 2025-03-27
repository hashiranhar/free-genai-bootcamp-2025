import os
import sys
import json
from sqlalchemy.orm import Session
from sqlalchemy.sql import text  # Import text for raw SQL execution

# Add the project root directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.database import engine, Base, SessionLocal
from app.models.models import Word, Group

def initialize_database():
    """Initialize the database by creating all tables."""
    Base.metadata.create_all(bind=engine)
    print("Database initialized.")

def seed_data():
    """Seed the database with initial data from words.sql."""
    seed_file_path = os.path.join(os.path.dirname(__file__), "../db/seeds/words.sql")
    db: Session = SessionLocal()
    try:
        with open(seed_file_path, "r") as file:
            sql_script = file.read()
        for statement in sql_script.strip().split(";"):  # Split the script into individual statements
            if statement.strip():  # Skip empty statements
                db.execute(text(statement.strip()))  # Execute each statement
        db.commit()
        print("Database seeded with initial data from words.sql.")
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