# OrbitorX Backend

Lightweight Express backend for OrbitorX — open-source, file-backed, and production-ready for small projects.

Features
- Express + Helmet + CORS + rate limiting
- Simple JSON file DB (no external DB required)
- Admin listing protected by `API_KEY`
- Dockerfile for container deployments

Quick start

1. Copy `.env.example` to `.env` and set `API_KEY`.
2. Install dependencies and run:

```bash
cd server
npm ci
npm run dev   # for local development
npm start     # production
```

Endpoints
- `GET /health` — simple health check
- `GET /api/v1/info` — backend info
- `POST /api/v1/contact` — accepts `{ name, email, message }`
- `GET /api/v1/messages?api_key=...` — list stored messages (or use `x-api-key` header)

Deployment
- Build image: `docker build -t orbitorx-backend .`
- Run: `docker run -e API_KEY=... -p 3000:3000 orbitorx-backend`

Notes
- This backend is intentionally minimal and free/open-source. For production scale, replace the JSON DB with a real database (Postgres, etc.) and add TLS/load-balancing as needed.
