.PHONY: dev migrate seed logs-backend logs-frontend build-frontend test-backend

dev:
	docker compose up --build -d

migrate:
	docker compose exec backend npm run migration:run | cat

seed:
	docker compose exec backend npm run seed:run | cat

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

build-frontend:
	cd frontend && npm run build

test-backend:
	docker compose exec backend npm test | cat

cities-import:
	docker compose exec backend npm run cities:import | cat


