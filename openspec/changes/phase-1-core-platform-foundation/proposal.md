# Proposal: Phase 1 Core Platform Foundation

## Intent

Implement identity, account state, roles, sessions, and authorization foundations before protected workflows begin.

## Scope

### In Scope
- Contributor/NGO registration, login, logout, current account, and password recovery foundation.
- Single-role accounts, Active/Disabled states, and backend role/account-state authorization.
- Env-driven admin seed/setup script; no public admin registration.
- Role-aware frontend routes, layouts, forms, and auth API/query boundary.
- Required Phase 1 dependency installation.

### Out of Scope
- Profiles, NGO verification, projects, applications, deliverables, matching, comments, certificates, real notifications, and broad admin workflows.
- Email delivery; recovery may use only a stub `NotificationDelivery` port.

## Capabilities

### New Capabilities
- `account-identity`: account registration, credential storage, role/state model, admin provisioning.
- `session-authentication`: opaque cookie sessions, logout, current-account lookup, password recovery foundation.
- `platform-authorization`: backend-enforced authn/authz checks for role and account state.
- `role-aware-frontend-foundation`: frontend route shell, API/query boundary, and protected-route UX.

### Modified Capabilities
- None.

## Approach

Use Fastify at HTTP boundaries, Prisma adapters, TypeBox contracts, and ADR 0006 opaque cookie sessions. Prefer `@fastify/session` with a thin Prisma-backed store, `bcrypt`, and an env-driven admin seed. Keep recovery delivery behind a stub port.

## Proposal-Level Slices

1. Persistence and account domain foundation.
2. Backend registration/login/session setup.
3. Logout, current account, password recovery stub.
4. Frontend router/query/API boundary.
5. Auth forms and role-aware shells.
6. Authorization enforcement, verification, and progress/archive docs.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/api` | Modified | Accounts module, Prisma schema, session/auth/error/OpenAPI setup. |
| `apps/web` | Modified | Router, query client, auth forms, protected shells. |
| `docs/implementation-progress.md` | Modified later | Track slice completion. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Review size exceeds 400 lines | High | Use chained PRs; ask before apply per session strategy. |
| Session/cookie/CSRF mistakes | Medium | Test auth flows; document deployment assumptions. |
| Prisma/plugin leakage into domain | Medium | Enforce adapters and architecture review. |
| Recovery stub mistaken for production email | Medium | Document as non-production adapter. |

## Rollback Plan

Revert chained PR slices in reverse order. Roll back migrations before dependent auth/frontend slices deploy.

## Dependencies

- API: Prisma, `@prisma/client`, TypeBox, Fastify cookie/session plugins, `bcrypt`, OpenAPI/Scalar support.
- Web: React Router, TanStack Query, React Hook Form, Zod, resolvers.

## Success Criteria

- [ ] Guests cannot access protected areas or self-register as administrators.
- [ ] Disabled accounts cannot log in or perform authenticated workflows.
- [ ] Backend authorization, not frontend routing, enforces role/account-state access.
- [ ] Current-account/session behavior and password recovery foundation are tested.
- [ ] Phase 1 implementation plan is split into reviewable chained PRs.
