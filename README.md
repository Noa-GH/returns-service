# Returns Service

A mock Amazon SDE I project: a two-pizza team's Returns Service that checks return eligibility, issues a label, and tracks each return until it's refunded. MERN stack, TypeScript end to end, organized as an npm workspaces monorepo.

> The full portfolio README (architecture diagram, API table, screenshots) is ticket RET-23.

## Repo layout

| Path                   | What it is                                             |
| ---------------------- | ------------------------------------------------------ |
| `packages/shared`      | zod schemas, inferred types and constants used by both |
| `services/returns-api` | Express 5 + Mongoose API                               |
| `apps/returns-web`     | React 19 + Vite customer page                          |
| `.run/`                | Shared WebStorm run configurations                     |
| `.github/`             | CI workflow, issue and PR templates                    |

## Getting started

Requires Node.js 24 LTS (see `.nvmrc`) and Docker Desktop.

```bash
npm install
cp services/returns-api/.env.example services/returns-api/.env
npm run db:up        # start MongoDB in Docker
npm run dev:api      # http://localhost:4000
npm run dev:web      # http://localhost:5173
```

## Scripts (run from the repo root)

| Script                      | What it does                                         |
| --------------------------- | ---------------------------------------------------- |
| `npm run dev:api`           | API with reload on save                              |
| `npm run dev:web`           | Web app dev server                                   |
| `npm run check`             | lint + typecheck + format check + tests (run pre-PR) |
| `npm run typecheck`         | `tsc -b` across all workspaces                       |
| `npm test`                  | Vitest for every workspace                           |
| `npm run build`             | Production build of API and web                      |
| `npm run start:api`         | Run the built API from `dist/`                       |
| `npm run db:up` / `db:down` | Start / stop local MongoDB                           |
