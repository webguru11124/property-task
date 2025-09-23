# Plyo Property Leads – Frontend

## Setup

1. Install deps:
```
npm install
```

2. Env (create `frontend/.env`):
```
VITE_API_BASE_URL=http://localhost:3000
```

3. Run dev server:
```
npm run dev
```

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – typecheck + build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## Tech
- React 19 + TypeScript
- Mantine UI + Tailwind (layout)
- React Hook Form + Zod
- React Query (+ Devtools)
- Axios client with error normalization

## Structure
```
src/
  components/
    common/PhoneInput.tsx
    layout/{Header,Footer,Layout}.tsx
  features/
    leads/
      components/LeadCaptureForm.tsx
      schemas/leadForm.schema.ts
    brokers/
      components/{BrokerCard,BrokerList}.tsx
      types/broker.types.ts
  hooks/
  lib/api/client.ts
  pages/HomePage.tsx
  providers/AppProviders.tsx
  theme/mantineTheme.ts
  utils/{index,validation.utils}.ts
```

## Notes
- Tailwind tokens align to Mantine theme in `src/styles/app.css`.
- API base URL is read from `VITE_API_BASE_URL`.
