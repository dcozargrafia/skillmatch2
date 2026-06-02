# Implementation Progress

This document tracks where SkillMatch implementation is now and what should happen next.

It is a progress tracker, not a source of product truth. If this document conflicts with `specs/` or an ADR, the specification or ADR wins and this tracker must be corrected.

## Quick Path For Agents

Before implementation work:

1. Check `git status --short`.
2. Read this progress tracker.
3. Read the relevant spec and ADR documents listed for the active phase.
4. Keep the work aligned with the current phase and avoid future-phase behavior.
5. Update this tracker when a phase, PR, or important implementation slice is completed.

## Current Phase

| Field                   | Value                                                                   |
| ----------------------- | ----------------------------------------------------------------------- |
| Active phase            | Phase 1: Core Platform Foundation                                       |
| Status                  | Ready to plan                                                           |
| Previous phase          | Phase 0: Project Foundation — completed, verified, archived, and merged |
| Next recommended action | Start SDD planning for Phase 1 before implementation                    |

## Completed Work

| Phase                       | Status    | Evidence                                                                                                                                                                |
| --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 0: Project Foundation | Completed | PR #2 workspace/tooling foundation; PR #4 API skeleton; PR #6 web/docs/docker skeleton; PR #8 verification guards; PR #10 SDD archive; PR #12 ESLint + Prettier tooling |

## Next Phase: Phase 1 Core Platform Foundation

### Goal

Implement identity, account state, roles, and authorization foundations before protected product workflows depend on them.

### Source Documents

Read these before Phase 1 planning or implementation:

| Document                                                          | Why it matters                                                                          |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `specs/11-sdd-execution-plan.md`                                  | Phase order, dependency rules, and Phase 1 acceptance criteria                          |
| `specs/02-roles-and-permissions.md`                               | Role boundaries and protected access expectations                                       |
| `specs/functional-requirements/05-authentication-and-accounts.md` | Account, registration, login, logout, password recovery, and account-state requirements |
| `specs/09-architecture.md`                                        | Backend/frontend architecture boundaries                                                |
| `specs/10-non-functional-requirements.md`                         | Security, privacy, accessibility, and reliability expectations                          |
| `specs/adr/0002-backend-framework-runtime.md`                     | Fastify/backend runtime decision                                                        |
| `specs/adr/0003-frontend-framework-runtime.md`                    | React/Vite frontend runtime decision                                                    |
| `specs/adr/0004-database-and-persistence.md`                      | PostgreSQL/Prisma persistence boundary decision                                         |
| `specs/adr/0005-testing-strategy-and-tooling.md`                  | Behavior-focused test policy                                                            |
| `specs/adr/0006-authentication-and-session-strategy.md`           | Authentication/session decision                                                         |

### Candidate Slices

These are planning candidates, not approved implementation tasks yet:

1. Persistence and account data foundation.
2. Registration, login, logout, and session lifecycle.
3. Authorization middleware and current-account API foundation.
4. Role-aware frontend shell and protected-route behavior.
5. Phase 1 verification, archive, and progress update.

### Open Decisions To Confirm During Planning

| Decision                    | Notes                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Admin provisioning details  | ADR 0006 defines the direction, but implementation needs the first safe provisioning path.            |
| Password recovery depth     | Confirm the smallest MVP-safe recovery foundation for Phase 1.                                        |
| Session persistence details | Confirm how opaque server-side sessions are stored and invalidated in the first implementation slice. |
| PR slicing                  | Forecast review size before implementation and split if needed.                                       |

## Update Rules

Update this file when:

- a phase starts, completes, or is archived;
- a PR completes a meaningful implementation slice;
- the next recommended action changes;
- an open decision is resolved or moved into an ADR;
- implementation discovers that the tracker conflicts with source-of-truth specs.

Do not update this file to invent requirements. Use specs or ADRs for source-of-truth changes.
