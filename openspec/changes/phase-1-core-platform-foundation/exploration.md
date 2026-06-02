# Exploration: Phase 1 Core Platform Foundation

## Current State

Phase 0 delivered the monorepo skeleton with pnpm workspaces, strict TypeScript (`NodeNext`), a minimal Fastify backend (`apps/api`) with a health route and Vitest, and a React + Vite frontend (`apps/web`) with Ant Design, i18next placeholders, and Vitest + React Testing Library. The Prisma persistence boundary exists only as an empty placeholder (`apps/api/prisma/README.md`). None of the Phase 1 runtime dependencies are installed yet (Prisma, TypeBox, Fastify session plugins, password hashing, React Router, TanStack Query, React Hook Form, Zod).

Phase 1 must now implement identity, account state, roles, and authorization foundations before any protected product workflows can depend on them.

## Affected Areas

- `apps/api/package.json` — add Prisma, `@prisma/client`, `@sinclair/typebox`, `@fastify/cookie`, `@fastify/session`, password-hashing library, `@scalar/fastify-api-reference`, logging plugins.
- `apps/api/prisma/schema.prisma` — define `Account`, `Session`, `PasswordRecoveryToken` tables; align with `specs/08-data-model.md` Account entity.
- `apps/api/src/modules/accounts/` — new domain-aligned module: `domain/`, `application/`, `infrastructure/`, `http/`.
- `apps/api/src/shared/auth/`, `errors/`, `http/` — shared authorization hook, stable error envelope (ADR 0016), and request-ID logging baseline (ADR 0018).
- `apps/web/package.json` — add `react-router-dom`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`.
- `apps/web/src/app/` — introduce React Router route tree, product-area layouts, and protected-route wrappers.
- `apps/web/src/shared/api/` — TanStack Query `QueryClient`, query-key conventions, shared API mutation modules, current-account query.
- `apps/web/src/areas/public/`, `contributor/`, `ngo/`, `admin/` — initial placeholder routes and role-aware navigation boundaries.

## Approaches

### 1. Administrator Provisioning

- **Option A — Environment-based seed script**: A one-time Node.js/Prisma seed script that reads admin credentials from environment variables and creates the first admin account.
  - Pros: Simple, no public endpoint, credentials never in source code.
  - Cons: Requires manual operator step during first deployment.
  - Effort: Low.
- **Option B — CLI tool**: A small CLI inside `apps/api/src/cli/` that reuses the account application use cases.
  - Pros: Reuses architecture layers, testable, explicit.
  - Cons: Extra boilerplate for a one-off task.
  - Effort: Low-Medium.
- **Option C — Migration-based insertion**: Raw SQL or Prisma calls inside a migration.
  - Pros: Automatic on deploy.
  - Cons: Migrations should not contain operational secrets or data; hard to rotate credentials safely.
  - Effort: Low (discouraged).

**Recommendation**: Option A. A documented `prisma db seed` script is the smallest secure path. It satisfies ADR 0006 (administrators are provisioned through a controlled internal process) without adding a public surface area.

### 2. Session Persistence

- **Option A — `@fastify/session` + custom Prisma store adapter**: Use the standard Fastify session plugin with a thin custom store implementation that delegates to a Prisma `Session` table through an infrastructure adapter.
  - Pros: Standard plugin gives secure cookie defaults; adapter keeps Prisma isolated.
  - Cons: Custom store code to maintain.
  - Effort: Medium.
- **Option B — `@fastify/session` + `connect-pg-simple`**: Use a PostgreSQL-specific session store.
  - Pros: Less custom code.
  - Cons: Bypasses Prisma, leaks PostgreSQL detail into the session layer, harder to align with Clean Architecture.
  - Effort: Low-Medium.
- **Option C — Custom cookie + token table managed by application layer**: Implement a Fastify `onRequest` hook that reads an opaque token from a cookie, validates it via a repository port, and attaches actor context.
  - Pros: Pure Clean/Hexagonal alignment; session is just another domain/port concern.
  - Cons: More initial code; must manually handle cookie security attributes (`HttpOnly`, `Secure`, `SameSite`).
  - Effort: Medium.

**Recommendation**: Option A. It balances architectural discipline with practical security defaults from `@fastify/session`. The custom store adapter must live strictly in `infrastructure/` and depend on repository ports, not leak Prisma into the plugin configuration.

### 3. Password Recovery Delivery (MVP Stub)

- **Option A — Console/log stub adapter**: The recovery use case generates a token and logs a fake recovery URL to server stdout (or a structured log field).
  - Pros: Zero external dependency; easy for local development.
  - Cons: No real delivery; unusable in production without replacement.
  - Effort: Low.
- **Option B — In-platform admin-only reset**: Skip self-service recovery and require an admin to trigger a reset.
  - Cons: Violates `specs/functional-requirements/05-authentication-and-accounts.md` which requires users to regain access without administrative intervention in normal cases.
  - Effort: N/A (rejected).

**Recommendation**: Option A, implemented behind a `NotificationDelivery` port/adapter. This satisfies the spec and ADR 0006 (recovery foundation) while keeping the boundary clean for a real email adapter in a later phase.

### 4. Password Hashing Library

- **bcrypt** vs **argon2**. `argon2` is the modern recommendation, but `bcrypt` has broader cross-platform/Docker build support in the Node.js ecosystem and is still considered secure.

**Recommendation**: `bcrypt` for the MVP to reduce build toolchain friction, with an explicit ADR review trigger if `argon2` becomes necessary later.

## Suggested Implementation Slices

These are the recommended PR/work-unit boundaries. Given the 400-line review budget, Phase 1 will require **chained PRs**.

1. **Slice A — Persistence & Account Domain Foundation**
   - Add Prisma, `@prisma/client`, and define `schema.prisma` (`Account`, `Session`, `PasswordRecoveryToken`).
   - Create the `accounts` module skeleton (`domain/`, `application/`, `infrastructure/`, `http/`).
   - Implement `Account` domain entity and repository port with Prisma adapter.
   - Add migration and seed script placeholder.
   - *Estimated review size*: ~250–350 lines.

2. **Slice B — Backend Auth API (Part 1): Registration & Login**
   - Add `@fastify/cookie`, `@fastify/session`, TypeBox, password hashing, error envelope.
   - Implement registration use case (Contributor, NGO) with domain validation.
   - Implement login use case with session creation.
   - Implement Fastify routes with JSON schemas and OpenAPI annotations.
   - Add API tests for registration and login (valid, invalid, enumeration guard).
   - *Estimated review size*: ~350–450 lines (borderline; may need splitting into registration vs login if too large).

3. **Slice C — Backend Auth API (Part 2): Logout, Current Account, Password Recovery**
   - Implement logout (server-side session invalidation + cookie clearing).
   - Implement `GET /me` or equivalent current-account endpoint.
   - Implement password recovery token generation and reset use cases.
   - Add stub notification adapter.
   - Add API tests for logout, current account, recovery, disabled-account denial.
   - *Estimated review size*: ~300–400 lines.

4. **Slice D — Frontend Shell & API Boundary**
   - Add React Router, TanStack Query, React Hook Form, Zod to `apps/web`.
   - Set up `QueryClient`, shared API client with fetch wrapper, and query-key conventions.
   - Create top-level route tree with public and protected boundaries.
   - Implement current-account query hook and auth context.
   - *Estimated review size*: ~300–400 lines.

5. **Slice E — Frontend Auth Forms & Role-Aware Layouts**
   - Build login and registration forms with React Hook Form + Zod.
   - Build public layout and role-aware dashboard shells (Contributor, NGO, Admin).
   - Implement protected-route wrappers and navigation placeholders.
   - Add component/workflow tests for critical auth UX paths.
   - *Estimated review size*: ~350–450 lines.

6. **Slice F — Authorization Enforcement & Verification**
   - Add backend authorization hook/middleware (role + account state checks).
   - Apply authorization to existing endpoints.
   - Add frontend error mapping for stable error codes.
   - Add authorization tests (allowed and forbidden cases per ADR 0005).
   - Update `docs/implementation-progress.md` and archive.
   - *Estimated review size*: ~250–350 lines.

## Risks

1. **Library integration friction in `NodeNext` monorepo** — Adding Prisma, React Router, TanStack Query, and TypeBox with strict `NodeNext` resolution can cause `TS2307` or ESM/CJS interop errors. Budget time for `tsconfig.json` and `package.json` adjustments.
2. **Prisma boundary leakage** — High risk that Prisma Client types leak into application or domain code. Enforce import linting or explicit architecture review.
3. **Review size explosion** — Even sliced, Phase 1 is large. Chained PRs are **strongly recommended** and should not be treated as optional.
4. **Session misconfiguration** — Cookie `HttpOnly`, `Secure`, `SameSite`, and random token generation must be correct. A mistake here is a critical security vulnerability.
5. **Missing runtime dependencies** — The current `apps/api/package.json` has only `fastify`; `apps/web/package.json` lacks React Router, TanStack Query, React Hook Form, and Zod. These must be installed before implementation begins.
6. **Admin provisioning safety** — The first-admin seed script must read from environment variables and must not be exposed through any API endpoint or committed to the repo.
7. **Password recovery without email** — The stub adapter must be clearly documented as non-production. If testers confuse the stub for a real flow, it creates a false sense of security.
8. **No OpenAPI/Scalar setup yet** — ADR 0013 requires OpenAPI contract + Scalar docs UI. The Phase 0 backend has no schema plugin installed. This must be set up in Slice B or C.

## Ready for Proposal

**Yes**, with the following clarifications recommended before moving to `sdd-propose`:

- Confirm the admin provisioning path: **environment-based seed script**.
- Confirm the session strategy: **`@fastify/session` with a thin custom Prisma adapter**.
- Confirm the password hashing library: **`bcrypt`**.
- Confirm the password recovery delivery stub: **console/log stub adapter behind a `NotificationDelivery` port**.
- Confirm chained PR strategy for all implementation slices.
