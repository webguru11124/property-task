# Database Schema

Tables:
- `cities(id uuid, name, county, municipality_code, latitude, longitude, population, created_at, updated_at)`
- `broker_offices(id uuid, city_id, name, address, postal_code, phone, email, website, latitude, longitude, is_active, created_at, updated_at)`
- `leads(id uuid, full_name, phone, email, city_id, comment, assigned_broker_id, created_at, updated_at)`

Indexes:
- `cities(name)`
- `broker_offices(is_active)`, `broker_offices(latitude, longitude)`

