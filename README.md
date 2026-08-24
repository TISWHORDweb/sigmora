# Sigmora

Next.js monolith for trading academies — UI + API in one app.

## Stack

- **Next.js 14** (App Router) — frontend
- **Express** mounted at `/api/*` — same process
- **MongoDB / Mongoose** — data
- **JWT + sessions** — auth

## Project layout

```
sigmora/
├── app/                 # Next.js pages (App Router)
├── pages/api/           # Express catch-all + cron
├── server/              # Express app, models, controllers, routes
├── src/                 # React components, pages, services, context
└── public/              # Static assets
```

## Setup

1. Copy env and fill secrets:

```bash
cp .env.example .env
```

Required: `MONGODB_URI`, `JWT_SECRET`. Set `FRONTEND_URL=http://localhost:3000`.

2. Install and run:

```bash
npm install
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)  
API health: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Production server |

## Notes

- Client API calls use same-origin `/api` (`NEXT_PUBLIC_API_URL`).
- The separate `sigmora-server-beta` repo is no longer needed for local/prod — API lives in `server/`.
