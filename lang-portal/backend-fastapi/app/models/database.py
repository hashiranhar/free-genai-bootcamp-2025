from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Absolute path to words.db
DATABASE_URL = "sqlite:////Users/hashiranhar/Developer/free-genai-bootcamp-2025/lang-portal/backend-fastapi/words.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()