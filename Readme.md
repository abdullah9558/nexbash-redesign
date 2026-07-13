# NexBash Website (Next.js + Node API)

Lightweight rewrite of the original single-page site.

## Stack
- **Frontend:** Next.js (App Router) + React
- **Backend:** Express (Node) on port `4000`
- **Assets:** `public/assets`

## Run
```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- API: http://localhost:4000

## API
- `GET /api/health`
- `GET /api/site`
- `GET /api/studios`
- `GET /api/projects`
- `GET /api/industries`
- `GET /api/faq`
- `POST /api/contact` — `{ name, email, message, company? }`

Contact leads are stored in `server/leads.json`.

## Structure
- `app/` — Next.js pages
- `components/` — UI sections
- `data/site.js` — shared content
- `server/` — Express API
- `public/assets/` — images
- `nexbash.html` — original static reference
