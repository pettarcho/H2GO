# H2GO Frontend

Clean React/Vite frontend for the H2GO smart bottle app.

## Screens

- `/` - Login / Sign Up
- `/dashboard` - Hydration dashboard, reminders, bottle connection, water quality, notifications
- `/profile` - User preferences and connected bottle

## Run

```bash
npm install
npm run dev
```

Open the Vite URL, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Backend handoff notes

- Login and Sign Up call the ASP.NET backend.
- Dashboard calls backend data and falls back to sample data if the backend is offline.
- Profile settings are local UI state in `src/app/pages/ProfilePage.tsx`.
- Bottle status is connection-only. There is no battery percentage in the UI.
- See `BACKEND_CONNECT.md` for run and CORS notes.
