This folder contains Alembic migration scripts. Use the following commands to manage migrations:

- `alembic revision --autogenerate -m "Migration message"`: Create a new migration.
- `alembic upgrade head`: Apply all migrations.
- `alembic downgrade -1`: Roll back the last migration.