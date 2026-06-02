# AGENTS.md

# SkillMatch Agent Guide

This file tells AI agents and human maintainers how to work in this repository.

SkillMatch follows Specification Driven Development (SDD): the specification is the source of truth, and implementation must follow the approved specs and ADRs.

---

## Quick Path For Every Agent

Before changing anything:

1. Check repository state:

   ```bash
   git status --short
   ```

2. Read the relevant specification before editing code or docs.
3. Read the relevant ADR before making technical choices.
4. Keep the change small, reviewable, and aligned with the current phase.
5. Save important decisions, discoveries, and bug fixes to Engram when available.
6. Commit only coherent work units using conventional commits.

If a request conflicts with the specs, raise the conflict instead of inventing behavior.

RTK note: use the project scripts as the source of truth. For linting, prefer `pnpm lint` or `rtk pnpm lint`; the repository uses ESLint through the root package script.

---

## Current Project State

The product and technical specification baseline is complete enough to start Phase 0 implementation.

Current phase:

```text
Phase 0: Project Foundation
```

Primary current document:

```text
specs/12-phase-0-project-foundation.md
```

Phase 0 goal:

```text
Create the repository, tooling, testing, environment, and app skeleton foundation before product workflows are implemented.
```

Phase 0 must not implement product features such as authentication, profiles, projects, applications, deliverables, notifications, certificates, or admin workflows.

---

## Source Of Truth

Specification documents live in:

```text
specs/
```

Start here:

```text
specs/README.md
```

Key technical planning documents:

```text
specs/09-architecture.md
specs/10-non-functional-requirements.md
specs/11-sdd-execution-plan.md
specs/12-phase-0-project-foundation.md
specs/adr/
```

Functional requirements are indexed in:

```text
specs/03-functional-requirements.md
specs/functional-requirements/
```

Rules:

* Specs beat implementation convenience.
* ADRs beat personal preference.
* If specs and code disagree, do not silently choose one; report the inconsistency.
* If a new decision materially affects architecture, maintenance, testing, security, deployment, or contributor workflow, create or update an ADR.

---

## Accepted Technical Baseline

| Area | Decision |
| ---- | -------- |
| Repository | Monorepo for MVP, separability by design. |
| Package manager | `pnpm` workspaces for Phase 0 unless explicitly changed by ADR. |
| Backend | Node.js + TypeScript + Fastify. |
| Backend architecture | Modular monolith guided by Clean/Hexagonal Architecture. |
| Frontend | React + TypeScript + Vite. |
| Database | PostgreSQL. |
| ORM | Prisma, isolated behind infrastructure adapters. |
| Testing | Risk-based, behavior-focused, Vitest-centered. |
| Auth/session | First-party email/password with opaque server-side cookie sessions. |
| UI library | Ant Design through app-owned wrappers and design tokens. |
| i18n | i18next + react-i18next, English/Spanish/French from day one. |
| Deployment | Axarnet VPS + Coolify for MVP. |

Do not re-open these decisions during implementation unless there is new evidence and an ADR review trigger applies.

---

## Product Principles

All work must respect the Product Brief and core principles:

* Impact First
* Skills Over Credentials
* Trust Over Restrictions
* Simplicity Over Complexity
* Guided Collaboration
* Micro-Projects First
* Inclusivity By Design
* Transparency And Accountability

---

## Scope Guardrails

SkillMatch is intentionally not:

* A social network
* A job marketplace
* A freelance marketplace
* A project management suite
* A messaging platform
* A file hosting platform
* A public contributor marketplace or talent search tool

Do not add features that move the product toward these categories without an explicit spec change.

---

## Human And AI Collaboration Rules

The human leads. The AI executes, verifies, and challenges assumptions.

Agents should:

* Verify before agreeing with claims.
* Challenge unclear or risky decisions.
* Ask at most one question at a time when blocked.
* Prefer short answers unless detail is necessary.
* Explain tradeoffs when there is a real fork.
* Avoid option menus when there is a clear recommended path.
* Keep specs, commits, code comments, and generated artifacts in English unless explicitly requested otherwise.

---

## Gentle-AI, SDD, And Engram Usage

Gentle-AI is appropriate for this project, but it should not become ceremony.

Use normal direct work for small, local changes.

Use SDD or explicit planning for:

* New product workflows.
* Architecture changes.
* Multi-file implementation slices.
* Authentication, authorization, persistence, testing, deployment, or i18n foundations.
* Any change where requirements are unclear.

Recommended setup when starting implementation work:

```bash
/sdd-init
gentle-ai skill-registry refresh
```

Engram rules:

* Save important decisions, bug fixes, discoveries, conventions, and configuration changes.
* Search memory when the user asks what was done previously or when past context matters.
* Before ending a substantial session, save a concise session summary.

OpenSpec rules:

* Do not create or rely on OpenSpec artifacts unless the user explicitly chooses OpenSpec or hybrid artifact storage.
* The repository `specs/` directory remains the project source of truth.

---

## Implementation Rules

When implementation begins:

* Follow `specs/12-phase-0-project-foundation.md` first.
* Keep frontend and backend separable.
* Do not import backend internals from frontend code.
* Do not import frontend internals from backend code.
* Do not put business logic into shared packages just to avoid duplication.
* Do not let Fastify, Prisma, React, Ant Design, or i18next own the domain architecture.
* Keep framework-specific code at the appropriate boundary.

Backend rules:

* Fastify belongs at the API/composition boundary.
* Domain and application logic must remain framework-independent.
* Prisma must stay inside infrastructure adapters.
* Cross-module access should happen through explicit application-level interfaces, not direct database shortcuts.

Frontend rules:

* Product areas should map to public, contributor, NGO, admin, and shared areas.
* Ant Design components used broadly must be wrapped behind application UI primitives.
* Shared UI must remain genuinely reusable and must not become a dumping ground.
* Product copy must be internationalized through the approved i18n structure.

---

## Testing Rules

Testing must follow ADR 0005 and the non-functional requirements.

Core rules:

* Test behavior, not implementation details.
* Use the smallest useful test layer.
* Test count is a review signal, not a goal.
* Do not generate large test suites without a behavior-group plan.
* Every fixed bug should include a regression test at the lowest useful layer unless explicitly justified.
* Authorization-sensitive changes require allowed and forbidden cases.
* Workflow state changes require valid and invalid transition coverage.

For Phase 0, tests should prove the foundation works; they should not pretend product behavior exists.

---

## Documentation Rules

Documentation must be:

* Written in English by default.
* Explicit and implementation-ready.
* Consistent with prior specs and ADRs.
* Clear about scope, non-goals, and tradeoffs.
* Structured for human reviewers and AI agents.

When adding or changing behavior:

* Update the relevant spec or ADR if the change affects source-of-truth decisions.
* Update README or developer docs if local setup, commands, or workflows change.

---

## Git And Commit Rules

Use conventional commits only.

Examples:

```text
docs: add phase 0 foundation plan
feat(api): add account registration use case
test(api): cover disabled account authorization
chore: configure pnpm workspaces
```

Rules:

* Never add `Co-Authored-By` or AI attribution.
* Commit coherent work units, not random file groups.
* Keep tests with the code they verify.
* Keep docs with the change they explain.
* Do not commit unrelated generated or local agent files.
* Before committing, review:

  ```bash
  git status --short
  git diff --stat
  git diff --cached --stat
  ```

---

## Local Agent Artifacts

Some agent tools may create local metadata directories such as:

```text
.atl/
openspec/
```

Do not add these to git unless the project explicitly decides to track them.

If such directories appear unexpectedly, mention them before committing.

---

## Phase 0 Completion Checklist

Phase 0 is not complete until the repository has:

* Monorepo structure aligned with ADR 0001.
* `pnpm` workspace configuration or a documented ADR-level change.
* Backend and frontend skeletons.
* Baseline TypeScript configuration.
* Documented format, lint, typecheck, test, and build commands.
* Environment examples without secrets.
* Minimal useful tests without test bloat.
* Local setup documentation.
* Docker/Coolify-compatible assumptions.
* No premature product workflow implementation.

---

## If Unsure

Stop and check the specs.

If the specs are unclear, say what is unclear and propose the smallest useful clarification.

Do not guess business rules.
