# Deployment

## Local (Docker)
```
docker compose up --build -d
docker compose exec backend npm run migration:run | cat
docker compose exec backend npm run seed:run | cat
```

## Production (outline)
- Use managed Postgres.
- Build backend and frontend images; set `DB_*` and `ALLOWED_ORIGINS` env vars.
- Run migrations at boot (entrypoint) before starting backend.

