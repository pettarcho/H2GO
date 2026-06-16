# Backend Connection

The frontend calls the ASP.NET backend at:

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

The ASP.NET backend must allow CORS for:

```text
http://localhost:5173
```

If CORS is not enabled, the browser will block frontend requests even when the backend is running.
