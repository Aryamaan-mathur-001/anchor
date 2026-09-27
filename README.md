# ⚓ Anchor — A Full-Stack Task Logbook (Next.js + PostgreSQL + Docker + CI/CD)

**A logbook-style task and project tracker, built full-stack in TypeScript.**

![CI](https://github.com/Aryamaan-mathur-001/anchor/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)

Anchor treats your work like ship's log entries: each task is logged with a timestamp, a project tag, a priority, and a status you can advance from **Open → Underway → Closed**.

## Stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Frontend   | Next.js 14 (App Router), React, TypeScript |
| Styling    | Tailwind CSS                              |
| Backend    | Next.js Route Handlers (REST API)         |
| Database   | PostgreSQL + Prisma ORM                   |
| Containers | Docker, docker-compose                    |
| CI/CD      | GitHub Actions → GitHub Container Registry |

## Project structure

```
anchor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── tasks/          # REST endpoints: list, create, update, delete
│   │   │   └── health/         # health check used by Docker/K8s probes
│   │   ├── layout.tsx
│   │   ├── page.tsx            # main logbook view
│   │   └── globals.css
│   ├── components/              # EntryRow, NewEntryForm, StatusStamp, PriorityMark
│   └── lib/                     # Prisma client singleton, shared types
├── prisma/
│   └── schema.prisma            # Task model
├── Dockerfile                    # multi-stage production build
├── docker-compose.yml            # app + Postgres for local dev
└── .github/workflows/ci.yml      # lint, build, test, image publish
```

## Getting started (local, no Docker)

Requirements: Node.js 20+, a local or hosted PostgreSQL instance.

```bash
npm install
cp .env.example .env          # edit DATABASE_URL if needed
npx prisma migrate dev --name init
npm run dev
```

Visit `http://localhost:3000`.

## Getting started (Docker)

This is the fastest way to run the whole stack — app and database together.

```bash
docker compose up --build
```

The app runs its own `prisma migrate deploy` on container start, so the schema is applied automatically. Visit `http://localhost:3000`.

To stop and remove containers (keeping data): `docker compose down`
To also wipe the database volume: `docker compose down -v`

## API

| Method | Route              | Description                     |
|--------|---------------------|----------------------------------|
| GET    | `/api/tasks`         | List tasks (`?status=`, `?project=` filters) |
| POST   | `/api/tasks`         | Create a task                   |
| PATCH  | `/api/tasks/:id`     | Update a task                   |
| DELETE | `/api/tasks/:id`     | Delete a task                   |
| GET    | `/api/health`        | Liveness/readiness probe        |

## CI/CD

`.github/workflows/ci.yml` runs on every push and pull request against `main`:

1. **Lint, type-check & build** — spins up an ephemeral Postgres service container, runs migrations, lints, and builds the app.
2. **Build & push Docker image** — on pushes to `main` only, builds the production image and pushes it to `ghcr.io/<your-org>/<repo>` tagged with both `latest` and the commit SHA.

No extra secrets are required beyond the automatically provided `GITHUB_TOKEN`, as long as the repository has package-publish permissions enabled (Settings → Actions → General → Workflow permissions → Read and write).

## Deploying the built image

```bash
docker pull ghcr.io/<your-org>/<repo>:latest
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/anchor" \
  ghcr.io/<your-org>/<repo>:latest
```

Point `DATABASE_URL` at any managed Postgres instance (RDS, Supabase, Neon, etc.), then run `npx prisma migrate deploy` once against it before first boot.

## Roadmap ideas

- Auth (NextAuth) for multi-user logs
- Drag-to-reorder within a project
- Weekly digest email of closed entries

## License

MIT — see [LICENSE](./LICENSE).
