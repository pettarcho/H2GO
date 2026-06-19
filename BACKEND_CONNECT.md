# Backend Connection

**Production:**

- Frontend (Vercel): https://h2-go.vercel.app
- Backend (Railway): set `VITE_API_BASE_URL` in Vercel to your Railway domain, e.g.
  `https://<your-railway-service>.up.railway.app/api`

**Local dev**, the frontend calls the ASP.NET backend at:

```text
http://10.184.248.211:5285/api
```

Override it with:

```env
VITE_API_BASE_URL=http://10.184.248.211:5285/api
```

## Run backend

```bash
cd backend/H2GO.API
dotnet run
```

Swagger should be available at:

```text
http://localhost:5285/swagger
```

## Run frontend

```bash
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Connected frontend calls

- `POST /api/Auth/login`
- `POST /api/Auth/register`
- `GET /api/Dashboard`
- `GET /api/Analytics`
- `GET /api/Notifications`

## Backend requirement

The ASP.NET backend (`Program.cs`) only accepts requests from allowed origins, configured via the
`AllowedOrigins` setting. Defaults include:

```text
http://localhost:5173
https://h2-go.vercel.app
```

To add more frontend domains without redeploying code, set an env var on Railway:

```text
AllowedOrigins=https://h2-go.vercel.app,https://another-domain.com
```

If CORS is misconfigured, the browser will block frontend requests even when the backend is running and reachable.

