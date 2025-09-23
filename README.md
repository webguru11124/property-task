# Plyo Property Leads

Quickstart:
```
docker compose up --build -d
docker compose exec backend npm run migration:run | cat
docker compose exec backend npm run seed:run | cat
```

Useful commands:
```
# Migrations
docker compose exec backend npm run migration:run | cat
# Seeds
docker compose exec backend npm run seed:run | cat
# Backend logs
docker compose logs -f backend
# Frontend dev
cd frontend && npm run dev
```

Frontend environment:
```
# frontend/.env
VITE_API_BASE_URL=http://localhost:3000
```

Docs are under `docs/`.
