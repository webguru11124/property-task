# Plyo Property Leads – README

## Overview
Full-stack lead capture app for Norwegian home buyers. Users submit contact details and city; backend stores the lead and returns matching broker offices (local or nearest by Haversine).

## Tech Stack
- Backend: NestJS, TypeORM, PostgreSQL
- Frontend: React + Vite + TypeScript, Mantine, React Query
- Infra: Docker Compose

## Prerequisites
- Node.js 20+
- Docker + Docker Compose

## Environment
Create `.env` in project root (copied from `.env.example`):
```
DB_PASSWORD=change_me
ALLOWED_ORIGINS=http://localhost:5173
```

## Quickstart (Docker)
```
docker compose up --build -d
docker compose exec backend npm run migration:run | cat
docker compose exec backend npm run seed:run | cat
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Local development (without Docker)
1) Start Postgres locally (db: plyo_leads, user: plyo_user, password: set in `.env`). Ensure `uuid-ossp` extension.
2) Backend:
```
cd backend
npm i
npm run migration:run
npm run seed:run
npm run start:dev
```
3) Frontend:
```
cd frontend
npm i
npm run dev
```

## API Overview
- GET `/api/v1/cities/autocomplete?search=os`
- POST `/api/v1/leads` (creates lead, returns recommended brokers)
- GET `/api/v1/brokers/nearby?lat=59.9139&lng=10.7522` (Haversine)
- PATCH `/api/v1/leads/:leadId/assign` (assign a broker)

See `docs/API_DOCUMENTATION.md` for full specs.

## Notes & Assumptions
- City data seeded from curated Norwegian cities (cite Kartverket/SSB source in docs).
- Core nearest calculation uses Haversine (no PostGIS).
- DB schema in `docs/DATABASE_SCHEMA.md`.

## Time log & decisions
See TODO.md for time log and scope decisions.

