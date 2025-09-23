# API Documentation

## Cities
GET /api/v1/cities/autocomplete
- query: `search` (min 2 chars)
- 200: `{ success, data: City[], meta }`

## Leads
POST /api/v1/leads
- body: `{ fullName, phone, email, cityId, comment? }`
- 201: `{ success, data: { id, fullName, createdAt, recommendedBrokers[], brokerMatchType, message }}`

PATCH /api/v1/leads/:leadId/assign
- body: `{ brokerId }`
- 200: `{ success, data: { leadId, assignedBrokerId, assignedAt } }`

## Brokers
GET /api/v1/brokers/nearby
- query: `lat`, `lng`, `limit?`
- 200: `{ success, data: BrokerOffice[], meta }`

