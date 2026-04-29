# OrbitorX Backend

Lightweight Express backend for OrbitorX — open-source, file-backed, and production-ready for small projects.

Features
- Express + Helmet + CORS + rate limiting
- Simple JSON file DB (no external DB required)
- Admin listing protected by `API_KEY`
- Dockerfile for container deployments

Email notifications
- The backend can send email alerts when a new contact is submitted. Configure SMTP credentials and recipients via environment variables in `.env`:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=smtp-user
SMTP_PASS=smtp-pass
EMAIL_FROM=no-reply@yourdomain.com
EMAIL_TO=ops@yourdomain.com
```

If SMTP is not configured, notifications are skipped and messages are still stored in the database.

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


Database
- This scaffold now supports PostgreSQL. Provide a `DATABASE_URL` environment variable (see `.env.example`). If `DATABASE_URL` is set the server will create a `messages` table on startup.

Deployment
- Build image: `docker build -t orbitorx-backend .`
- Run (with Postgres connection):

```bash
docker run -e API_KEY=... -e DATABASE_URL='postgres://user:pass@host:5432/db' -p 3000:3000 orbitorx-backend
```

Notes
- This backend is intentionally minimal and free/open-source. For production scale, replace the JSON DB with a real database (Postgres, etc.) and add TLS/load-balancing as needed.
