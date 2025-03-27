from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import dashboard, words, groups, study_sessions, study_activities

app = FastAPI()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(words.router, prefix="/api/words", tags=["Words"])
app.include_router(groups.router, prefix="/api/groups", tags=["Groups"])
app.include_router(study_sessions.router, prefix="/api/study_sessions", tags=["Study Sessions"])
app.include_router(study_activities.router, prefix="/api/study_activities", tags=["Study Activities"])
