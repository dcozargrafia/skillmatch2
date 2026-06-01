# Local Development

This document describes the Phase 0 local setup for SkillMatch.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (optional, for local PostgreSQL)

## Setup

```bash
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

`apps/web/.env` must define `VITE_API_BASE_URL` for every environment. The local example points to the development API at `http://localhost:3000`; staging and production must provide their own configured API URL.

## Start local dependencies (optional)

```bash
docker compose -f docker/docker-compose.yml up -d
```

The PostgreSQL credentials in `docker/docker-compose.yml` are local placeholders only. Do not reuse them for shared, staging, or production environments.

## Run apps in development

```bash
pnpm --filter @skillmatch/api dev
pnpm --filter @skillmatch/web dev
```

## Baseline quality gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Coolify-compatible assumptions

- API and web remain independently deployable services.
- Database is externalized (managed PostgreSQL in production).
- No Phase 0 workflow logic is coupled to local-only infrastructure.
