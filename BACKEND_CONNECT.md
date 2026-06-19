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

## Database

The API connects to MySQL on Railway via individual env vars, set on the **API service** (not the MySQL service):

```text
MYSQLHOST=<from Railway MySQL Variables tab>
MYSQLPORT=<from Railway MySQL Variables tab>
MYSQLUSER=<from Railway MySQL Variables tab>
MYSQLPASSWORD=<from Railway MySQL Variables tab>
MYSQLDATABASE=<from Railway MySQL Variables tab>
```

If `MYSQLHOST` isn't set, the app falls back to the local `DefaultConnection` string in
`appsettings.json` (for local dev against a local MySQL instance).

**Schema:** there are no EF Core migrations yet. On startup, `Program.cs` calls
`Database.EnsureCreated()`, which creates all tables from the current models if the database is
completely empty. This is a no-op if any tables already exist — it does **not** apply schema
changes to an existing database. Once the schema needs to evolve, switch to real EF Core
migrations (`dotnet ef migrations add ...` + `Database.Migrate()`).


