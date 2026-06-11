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

- Login currently redirects to `/dashboard` after submit.
- Connect the login API in `src/app/pages/LoginPage.tsx`.
- Dashboard currently uses local sample data in `src/app/pages/DashboardPage.tsx`.
- Profile settings are local UI state in `src/app/pages/ProfilePage.tsx`.
- Bottle status is connection-only. There is no battery percentage in the UI.
