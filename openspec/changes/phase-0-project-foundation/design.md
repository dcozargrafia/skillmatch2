# Design: Phase 0 Project Foundation

## Technical Approach

Create a runnable `pnpm` monorepo foundation matching `specs/12-phase-0-project-foundation.md` and ADRs 0001–0010. The repository is currently implementation-empty, so Phase 0 will add root workspace/tooling, `apps/api`, `apps/web`, `packages/shared`, `packages/config`, env examples, local Docker support, and contributor docs. This design intentionally stops at skeletons, smoke checks, and boundaries: no authentication, profiles, projects, applications, deliverables, notifications, certificates, admin workflows, real Prisma schema, or product screens.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Workspace | `pnpm-workspace.yaml` with `apps/*` and `packages/*` | npm/yarn workspaces | ADR 0001 and Phase 0 recommend pnpm; it keeps app/package boundaries explicit. |
| Tooling | Biome for format/lint, `tsc` for typecheck | ESLint + Prettier | Biome is simpler and faster for Phase 0. ESLint can be revisited if React/type-aware rules exceed Biome. |
| API skeleton | Fastify only at HTTP/composition boundary | Framework-driven module layout | ADR 0002 requires Fastify not to own domain/application architecture. |
| Persistence prep | Prisma files under `apps/api/prisma` and adapters under `src/infrastructure` only | Prisma types in domain/use cases | ADR 0004 requires Prisma isolation; Phase 0 creates structure, not real migrations. |
| Web skeleton | React + Vite with product-area folders and shared boundaries | Next.js or flat pages | ADR 0003 favors explicit SPA frontend/backend separation. |
| UI/i18n | Ant Design dependency behind `src/shared/ui`; i18next `en/es/fr` scaffolding | Direct Ant imports; English-only copy | ADRs 0007–0009 require wrappers, tokens, and trilingual readiness. |
| Delivery | 3 reviewable work units | One large scaffold PR | Supports the 400-line review budget and chained-PR ask-always strategy. |

## Data Flow

Phase 0 validates only foundation wiring:

```text
Contributor ──pnpm scripts──> apps/api smoke + apps/web smoke
                         │            │
                         └── packages/shared/config boundaries

Browser ──Vite app shell──> i18next provider ──> App UI wrappers
API client boundary ──────> Fastify health route ──> no product use cases yet
```

## File Changes

| File | Action | Description |
|---|---|---|
| `pnpm-workspace.yaml`, `package.json`, `pnpm-lock.yaml` | Create | Workspace and root scripts: `format`, `lint`, `typecheck`, `test`, `build`. |
| `biome.json`, `tsconfig.base.json`, `.gitignore`, `.env.example` | Create/Modify | Formatting/linting, strict TS baseline, generated/env exclusions, root env docs. |
| `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/vitest.config.ts` | Create | API workspace commands. |
| `apps/api/src/main.ts`, `apps/api/src/http/`, `apps/api/src/modules/`, `apps/api/src/infrastructure/`, `apps/api/prisma/`, `apps/api/tests/` | Create | Fastify app factory/entrypoint, visible Clean/Hexagonal placeholders, health smoke test. |
| `apps/web/package.json`, `apps/web/vite.config.ts`, `apps/web/tsconfig*.json`, `apps/web/index.html` | Create | React + Vite workspace. |
| `apps/web/src/app/`, `apps/web/src/areas/{public,contributor,ngo,admin}/`, `apps/web/src/shared/{ui,i18n,api}/`, `apps/web/tests/` | Create | App shell, product-area placeholders, Ant wrapper location, i18n setup, smoke component test. |
| `packages/shared/`, `packages/config/` | Create | Framework-neutral shared types/config only; no business logic. |
| `docker/docker-compose.yml`, `docs/local-development.md`, `README.md` | Create/Modify | Local PostgreSQL option, command guide, Docker/Coolify assumptions. |

## Interfaces / Contracts

Root scripts are the contributor contract:

```json
{"format":"biome format --write .","lint":"biome lint .","typecheck":"pnpm -r typecheck","test":"pnpm -r test","build":"pnpm -r build"}
```

Backend skeleton contract: expose only `GET /health` for foundation verification. Frontend skeleton contract: render an app shell through `I18nextProvider` and Ant `ConfigProvider` wrapper. Shared package contract: export only framework-neutral primitives when two consumers need them.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Shared config/type exports | Vitest only if real logic exists. |
| API | Fastify app responds to `/health` | Vitest + Fastify `inject`; no auth/domain tests. |
| Component | Web app shell renders translated foundation text | Vitest + React Testing Library. |
| Integration | PostgreSQL/Prisma readiness | Documented/deferred until real persistence behavior exists. |
| E2E | None | Out of scope for Phase 0 foundation. |

## Migration / Rollout

No data migration required. Rollout is file-level scaffold delivery in three work units: root tooling, API skeleton, web/docs/docker skeleton. Rollback is reverting those commits.

## Open Questions

- [ ] None blocking.
