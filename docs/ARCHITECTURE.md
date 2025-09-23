# Architecture

- Backend: NestJS modular structure (`cities`, `brokers`, `leads`) with TypeORM.
- DB: PostgreSQL; migrations define `cities`, `broker_offices`, `leads`.
- Matching: local brokers if available; otherwise nearest 3 via Haversine SQL.
- Frontend: React + Mantine; React Query for data; simple pages router.

