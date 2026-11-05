# API integration

The Vite development server proxies `/api` requests to `https://zero5nov-workshop.onrender.com`.

- `GET /api/events`
- `GET /api/me/registrations?student_id=<UUID>`
- `POST /api/registrations` with `{ "event_id": "...", "student_id": "..." }`

The registration request body is inferred from the live event record fields. Confirm it against the backend contract before relying on registrations in production.

The API currently does not return `Access-Control-Allow-Origin`. For a separately hosted production frontend, allow its origin in the API's CORS settings or route requests through a same-origin reverse proxy. `VITE_API_BASE_URL` can override the production API origin.