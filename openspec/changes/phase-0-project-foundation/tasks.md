# Tasks: Phase 0 Project Foundation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 650-900 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 root workspace/tooling → PR 2 API skeleton → PR 3 web/docs/docker |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Root workspace/tooling + contributor contract | PR 1 | `main` base; docs + env examples included |
| 2 | API skeleton and smoke test | PR 2 | depends on PR 1; keep Fastify boundary-only |
| 3 | Web skeleton + Docker/Coolify + local-dev docs | PR 3 | depends on PR 2; keep UI/i18n scaffolding only |

## Phase 1: Foundation / Workspace

- [x] 1.1 Add `pnpm-workspace.yaml`, root `package.json`, `tsconfig.base.json`, `biome.json`, and `.gitignore` with workspace scripts for format, lint, typecheck, test, and build.
- [x] 1.2 Create `packages/shared/package.json`, `packages/shared/src/index.ts`, `packages/config/package.json`, and `packages/config/src/index.ts` as framework-neutral stubs only.
- [x] 1.3 Add `.env.example`, `apps/api/.env.example`, `apps/web/.env.example`, and update `README.md` with clone/install/run/check instructions.

## Phase 2: API Skeleton

- [x] 2.1 Create `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/vitest.config.ts`, `apps/api/src/main.ts`, and `apps/api/src/http/health-route.ts`.
- [x] 2.2 Add placeholder folders under `apps/api/src/modules/`, `apps/api/src/infrastructure/`, `apps/api/src/shared/`, and `apps/api/prisma/` with no product logic or Prisma leakage.
- [x] 2.3 Add `apps/api/tests/health.test.ts` using Fastify `inject` to verify `GET /health` only.

## Phase 3: Web Skeleton / Deployment

- [ ] 3.1 Create `apps/web/package.json`, `apps/web/vite.config.ts`, `apps/web/tsconfig.json`, `apps/web/index.html`, `apps/web/src/main.tsx`, and `apps/web/src/app/App.tsx`.
- [ ] 3.2 Add `apps/web/src/areas/{public,contributor,ngo,admin}/`, `apps/web/src/shared/{ui,i18n,api}/`, Ant wrapper + `I18nextProvider` scaffolding, and `en/es/fr` resource files.
- [ ] 3.3 Add `apps/web/tests/app.test.tsx`, `docker/docker-compose.yml`, and `docs/local-development.md` with Coolify-compatible build/start assumptions.

## Phase 4: Verification / Cleanup

- [ ] 4.1 Run and fix root/app `format`, `lint`, `typecheck`, `test`, and `build` commands until baseline checks pass.
- [ ] 4.2 Audit `apps/api/src/modules/` and `apps/web/src/areas/` to confirm only Phase 0 placeholders exist; remove any accidental auth/profile/project/application/deliverable/notification/certificate/admin behavior.
