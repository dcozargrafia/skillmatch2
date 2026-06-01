# Proposal: Phase 0 Project Foundation

## Intent

Turn specs and ADRs into a runnable foundation: monorepo structure, app skeletons, tooling, tests, environment examples, and deployment-compatible assumptions before product workflows begin.

## Scope

### In Scope
- Configure `pnpm` workspaces, root scripts, `.gitignore`, and strict TypeScript baselines.
- Create Fastify API and React+Vite web skeletons with architectural folders, smoke tests, and documented commands.
- Prepare Prisma/PostgreSQL boundaries, i18next `en/es/fr` scaffolding, Ant Design wrapper location, env examples, and Docker/Coolify-compatible local assumptions.
- Resolve lint/format by using Biome for Phase 0 formatting and linting, with TypeScript `tsc` as the type gate; revisit ESLint only if React/type-aware lint needs exceed Biome.

### Out of Scope
- Authentication implementation, profiles, projects, applications, deliverables, notifications, certificates, admin workflows.
- Production hardening, real migrations/schema, user-facing product screens, full CI/CD or E2E journeys.

## Capabilities

### New Capabilities
- `project-foundation`: Repository, workspace, tooling, app skeleton, test, env, and local deployment foundation for Phase 0.

### Modified Capabilities
- None — no existing OpenSpec capability specs exist yet.

## Approach

Use the exploration’s bootstrap-first approach, delivered as 2–3 reviewable work units: root workspace/tooling, API skeleton, web skeleton plus local-dev docs. Keep framework code at boundaries and avoid product behavior.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `specs/12-phase-0-project-foundation.md` | Reference | Phase 0 source contract. |
| `specs/09-architecture.md`, `specs/10-non-functional-requirements.md`, `specs/adr/` | Reference | Architecture, testing, i18n, UI, persistence, deployment constraints. |
| `apps/api`, `apps/web` | New | Fastify and React+Vite skeletons. |
| `packages/shared`, `packages/config`, root files | New/Modified | Workspace, shared config, scripts, env, git hygiene. |
| `docker`, `docs`, `README.md` | New/Modified | Local setup and Coolify-compatible assumptions. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scope creep into Phase 1 behavior | Med | Keep placeholders/smoke tests only; review against Phase 0 exclusions. |
| Prisma or UI vendor leakage | Med | Enforce infrastructure and wrapper boundaries from folder structure. |
| Tooling mismatch | Low | Start with Biome + `tsc`; document revisit trigger. |

## Rollback Plan

Revert the Phase 0 work-unit commits. Since no product data or migrations are introduced, rollback is file-level only: remove workspace/app skeletons, tooling config, docs, and env examples.

## Dependencies

- `pnpm`, Node.js, PostgreSQL-compatible local setup, accepted ADRs 0001–0010.

## Success Criteria

- [ ] Clone/install/check path is documented and runnable.
- [ ] `format`, `lint`, `typecheck`, `test`, and `build` gates exist or have explicit staged rationale.
- [ ] API/web skeletons respect ADR boundaries and include minimal useful tests.
- [ ] Env examples contain no secrets and deployment assumptions do not conflict with Coolify.
- [ ] No Phase 1+ product workflow behavior is implemented.
