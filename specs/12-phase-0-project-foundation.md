# 12-phase-0-project-foundation.md

# Phase 0 Project Foundation

## Purpose

This document defines the first implementation foundation for SkillMatch.

Phase 0 turns the approved specifications and ADRs into a safe project skeleton that future implementation phases can build on without re-deciding architecture, tooling, testing strategy, or deployment assumptions.

This is not a product feature phase. It should not implement accounts, profiles, projects, applications, deliverables, notifications, certificates, or administration workflows.

---

## Outcome

After Phase 0, a contributor should be able to clone the repository, install dependencies, run basic checks, understand the project structure, and start implementing Phase 1 without guessing foundational decisions.

---

## Source Decisions

Phase 0 must follow these accepted ADRs:

| ADR | Impact On Phase 0 |
| --- | ----------------- |
| ADR 0001 Repository Strategy | Create a monorepo with separable frontend/backend boundaries. |
| ADR 0002 Backend Framework Runtime | Prepare a Node.js + TypeScript + Fastify backend workspace. |
| ADR 0003 Frontend Framework Runtime | Prepare a React + TypeScript + Vite frontend workspace. |
| ADR 0004 Database And Persistence | Prepare PostgreSQL + Prisma structure without leaking Prisma into domain code. |
| ADR 0005 Testing Strategy And Tooling | Prepare behavior-focused Vitest-centered testing commands. |
| ADR 0006 Authentication And Session Strategy | Reserve backend/session architecture decisions for Phase 1 implementation. |
| ADR 0007 Design System Wrapper Strategy | Prepare frontend folders that support app-owned UI wrappers. |
| ADR 0008 UI Component Library | Prepare for Ant Design and token-based theming. |
| ADR 0009 Internationalization Implementation | Prepare translation structure for English, Spanish, and French. |
| ADR 0010 Deployment And Hosting | Keep the repository Docker/Coolify-friendly from the beginning. |

---

## Repository Shape

Phase 0 should establish this logical monorepo shape:

```text
.
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   ├── shared/
│   └── config/
├── specs/
│   └── adr/
├── docker/
└── docs/
```

Recommended responsibilities:

| Path | Responsibility |
| ---- | -------------- |
| `apps/api` | Fastify backend/API application. |
| `apps/web` | React + Vite frontend application. |
| `packages/shared` | Framework-neutral shared types or constants only when genuinely needed. |
| `packages/config` | Shared tooling configuration, if useful. |
| `specs` | Product, architecture, ADR, and implementation source of truth. |
| `docker` | Docker/Coolify-oriented supporting files when introduced. |
| `docs` | Contributor-facing implementation documentation not belonging to specs. |

Rules:

* Frontend must not import backend internals.
* Backend must not import frontend internals.
* Shared packages must not become a shortcut for business logic dumping.
* Shared code should be introduced only when at least two consumers clearly need it.
* Specs and ADRs remain outside application workspaces.

---

## Package Manager And Workspace

Phase 0 should choose and configure one workspace-capable package manager before dependencies are installed.

Recommended decision for implementation:

* Use `pnpm` workspaces.

Rationale:

* Good monorepo support.
* Efficient dependency storage.
* Common in modern TypeScript full-stack projects.
* Works well with separate `apps/*` and `packages/*` workspaces.

If a different package manager is chosen, document the reason before implementation.

---

## Baseline Tooling

Phase 0 should establish baseline tooling before product code grows.

Minimum foundation:

| Area | Expected Foundation |
| ---- | ------------------- |
| TypeScript | Shared strict baseline with app-specific extensions. |
| Formatting | One documented formatter command. |
| Linting | One documented lint command. |
| Testing | One documented test command plus app-specific test commands where needed. |
| Environment | Example environment files without secrets. |
| Git hygiene | Ignore generated files, dependencies, local env files, and build artifacts. |
| Documentation | Local setup instructions in README or docs. |

Tooling should optimize for consistency, not cleverness.

---

## Backend Foundation

Phase 0 may create backend structure, but should avoid implementing product behavior.

Expected backend preparation:

```text
apps/api/
├── src/
│   ├── modules/
│   ├── shared/
│   ├── infrastructure/
│   └── main.ts
├── prisma/
└── tests/
```

Rules:

* Fastify belongs at the API/composition boundary.
* Domain and application logic must remain framework-independent.
* Prisma must be isolated behind infrastructure adapters when persistence is implemented.
* Product modules may be represented as empty or minimal placeholders only if useful.
* Do not implement authentication, accounts, or domain workflows in Phase 0 unless the phase is explicitly expanded.

---

## Frontend Foundation

Phase 0 may create frontend structure, but should avoid implementing real product screens.

Expected frontend preparation:

```text
apps/web/
├── src/
│   ├── app/
│   ├── areas/
│   │   ├── public/
│   │   ├── contributor/
│   │   ├── ngo/
│   │   └── admin/
│   ├── shared/
│   │   ├── ui/
│   │   ├── components/
│   │   ├── i18n/
│   │   └── api/
│   └── main.tsx
└── tests/
```

Rules:

* Ant Design should be consumed through app-owned wrappers when used broadly.
* Translation setup should support `en`, `es`, and `fr` from the beginning.
* Initial UI can be minimal; do not build real workflows before Phase 1.
* Routes may be placeholders only if they help verify the foundation.

---

## Testing Foundation

Phase 0 should make testing possible, not exhaustive.

Minimum expectation:

* Test runner configured.
* A tiny smoke test or example test per app where useful.
* Commands documented.
* No large generated test suite.
* Tests should demonstrate behavior-focused style rather than implementation mocking.

Testing setup should support later layers:

| Layer | Phase 0 Expectation |
| ----- | ------------------- |
| Domain/use-case tests | Tooling ready. |
| API tests | Fastify testing approach ready or documented. |
| Integration tests | PostgreSQL strategy documented or deferred with reason. |
| Frontend component tests | Tooling ready or explicitly deferred. |
| E2E tests | Not required yet unless needed for foundation smoke. |
| Contract tests | Planned, not necessarily implemented. |

---

## Environment And Configuration

Phase 0 should define how configuration enters the system.

Rules:

* No secrets committed to the repository.
* Provide example environment files only.
* Use clear variable names.
* Separate local development values from production values.
* Production secrets must be managed outside git, eventually through Coolify.

Potential files:

```text
.env.example
apps/api/.env.example
apps/web/.env.example
```

The final file layout may differ, but the rules above must hold.

---

## Docker And Coolify Readiness

Phase 0 does not need a full production deployment.

It should, however, avoid choices that make Coolify deployment harder later.

Expected preparation:

* App boundaries compatible with container builds.
* Clear app start/build commands.
* Environment configuration compatible with container runtime variables.
* No local-only assumptions baked into application code.

Docker Compose or Dockerfiles may be introduced in Phase 0 if they help local development, but production deployment hardening belongs later.

---

## CI And Quality Gates

Phase 0 should define or create initial quality gates.

Minimum gate candidates:

```text
format
lint
typecheck
test
build
```

Rules:

* A failing quality gate should mean something actionable.
* Do not add slow or fragile gates before there is product code to validate.
* CI can start minimal and become stricter as implementation grows.

---

## Out Of Scope

Phase 0 must not implement:

* User registration or login.
* Password recovery.
* Role-based authorization behavior.
* Contributor or NGO profiles.
* Project publication.
* Applications or assignments.
* Deliverable workflows.
* Notifications.
* Certificates.
* Admin moderation workflows.
* Production release hardening.

If any of these appear during Phase 0, they should be moved to the appropriate later phase.

---

## Acceptance Criteria

Phase 0 is complete when:

* Monorepo structure exists and matches ADR 0001.
* Backend and frontend workspaces exist or are explicitly deferred with reasons.
* Package manager and workspace configuration are documented.
* Basic TypeScript, lint, format, test, and build commands exist or are explicitly staged.
* Local setup instructions are documented.
* Environment examples exist without secrets.
* Testing foundation follows ADR 0005 and avoids generated test bloat.
* Frontend structure supports Ant Design wrappers and trilingual i18n.
* Backend structure supports modular monolith and Clean/Hexagonal boundaries.
* Docker/Coolify implications are not contradicted.
* No product workflow behavior has been implemented prematurely.

---

## Review Checklist

Before committing Phase 0 implementation, verify:

* Does the structure make frontend and backend separable?
* Are architecture boundaries visible in folder names and imports?
* Can a new contributor understand how to run checks?
* Are secrets protected from git?
* Are test commands useful but not bloated?
* Is the setup simple enough for an open-source contributor?
* Does any part accidentally implement Phase 1+ behavior?

---

## Next Step

After this document is accepted, implementation can begin with the smallest foundation slice:

1. Create workspace/package manager configuration.
2. Add backend and frontend skeletons.
3. Add shared tooling commands.
4. Add minimal tests and documentation.
5. Verify all baseline commands.
