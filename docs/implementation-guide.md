# SkillMatch Implementation Guide

This guide tells human contributors and AI agents how to implement changes in SkillMatch without drifting from the accepted specifications and ADRs.

Use it as the practical implementation companion to the source-of-truth documents. If this guide conflicts with `specs/` or an accepted ADR, the spec or ADR wins and this guide must be corrected.

## Purpose

- Keep implementation aligned with SDD.
- Make architectural boundaries explicit before code grows.
- Give contributors and agents a shared, implementation-ready rule set.
- Reduce framework-driven decisions that bypass product or domain rules.

## Quick Path Before Coding

1. Run `git status --short`.
2. Read `docs/implementation-progress.md` to confirm the active phase.
3. Read the relevant product spec before changing behavior.
4. Read the relevant ADR before making technical choices.
5. Keep the change inside the current phase scope.
6. Implement the smallest correct change.
7. Add or update focused tests at the smallest useful layer.
8. Update docs when behavior, conventions, or workflows change.

Current phase: `Phase 1: Core Platform Foundation`.

Phase 1 scope is limited to identity, account state, roles, and authorization foundations. Do not implement later-phase product workflows just because the code path is nearby.

## Source Of Truth Order

Use this order when making decisions:

1. `specs/` functional and architectural documents
2. Accepted ADRs in `specs/adr/`
3. This implementation guide
4. `docs/implementation-progress.md` for current phase and sequencing
5. Existing code, only when it matches the documents above

Rules:

- Specs beat implementation convenience.
- ADRs beat personal preference.
- Existing code does not override accepted specs or ADRs.
- If docs and code disagree, raise the inconsistency instead of silently following the code.

## Architecture Boundaries

SkillMatch is a modular monolith with separate frontend and backend structures.

Core rules:

- The backend owns business correctness, authorization, workflow transitions, and persisted state.
- The frontend owns interaction quality, guidance, layout, local form behavior, and localized presentation.
- Frontend and backend stay separable.
- Infrastructure details stay behind adapters.
- Reuse comes from understood repetition, not premature abstraction.

Backend dependency direction:

```text
Fastify Routes / Hooks / Schemas
        ↓
Application Use Cases
        ↓
Domain Model / Business Rules
        ↑
Infrastructure Adapters
```

Frontend dependency direction:

```text
Pages / Routes
        ↓
Workflow Components
        ↓
Shared Product Components
        ↓
Application UI Wrappers
        ↓
Ant Design Components
```

Do not let Fastify, Prisma, TypeBox, OpenAPI, React Router, TanStack Query, React Hook Form, Zod, Ant Design, or i18next become the product architecture.

## Backend Coding Conventions

Backend code must keep Fastify at the API and composition boundary.

Required rules:

- Route handlers translate HTTP requests into use-case calls.
- Route handlers must not contain business rules.
- Application use cases coordinate workflow actions and policy decisions.
- Domain logic must remain independent from Fastify, Prisma, TypeBox, OpenAPI, and logging implementation details.
- Prisma remains an infrastructure adapter only.
- Cross-module access must happen through explicit application interfaces or ports, not direct database shortcuts.
- Database constraints help integrity, but they do not replace application or domain rules.
- Transactions belong at application and infrastructure boundaries for critical state changes.

Preferred module shape:

```text
module/
  domain/
  application/
  infrastructure/
  http/
```

Keep module boundaries aligned to domain responsibilities, not framework folder habits.

## API Route, Schema, Error, And Docs Conventions

The API is the contract between frontend and backend.

### Route Conventions

- Keep routes resource-oriented.
- Use explicit action endpoints for meaningful business transitions.
- Do not hide business transitions behind ambiguous generic updates when the action matters.
- Protected responses must expose only data visible to the requester.

### Schema Conventions

- Use Fastify JSON Schema with TypeBox at the HTTP boundary.
- TypeBox and JSON Schema are for request validation, response contracts, serialization, and OpenAPI generation.
- TypeBox and JSON Schema must not become domain entities, domain value objects, or application command models.
- HTTP validation does not replace domain validation, authorization, or workflow checks.

### API Documentation Conventions

- OpenAPI is the formal HTTP contract.
- Scalar is the human-facing API documentation UI.
- Prefer deriving endpoint documentation from route schemas.
- Do not maintain parallel hand-written endpoint docs when the information is derivable from OpenAPI.
- Keep auth requirements and common error codes documented in the API contract.

### Error Conventions

API errors must use a stable envelope:

```json
{
  "code": "SOME_STABLE_ERROR_CODE",
  "message": "Developer-facing default message.",
  "details": {},
  "requestId": "optional-request-id"
}
```

Rules:

- `code` is stable and machine-readable.
- `message` is developer-facing, not the final localized UX copy.
- `details` is optional and must contain only safe, useful structured information.
- `requestId` should be included when available.
- Never leak passwords, tokens, session secrets, stack traces, private personal data, or internal infrastructure details.

## Frontend Coding Conventions

The frontend is organized by product area:

- `public`
- `contributor`
- `ngo`
- `admin`
- `shared`

Rules:

- Product-specific workflows stay inside the owning product area.
- Shared code must be genuinely reusable.
- Shared code must not become a dumping ground for whatever does not fit elsewhere.
- Ant Design stays behind app-owned wrappers for broad usage.
- Shared components receive translated content or translation keys instead of owning product-specific copy.

Component layering rules:

- Broadly used vendor components must be wrapped.
- Shared product components may express SkillMatch concepts such as statuses or compatibility labels.
- Workflow components own feature-specific interaction logic.
- Extract shared abstractions only after real repetition or a clearly cross-cutting concept appears.

## Forms, Validation, Server State, Routing, And i18n

### Forms And Validation

- Use React Hook Form for form state and submission handling.
- Use Zod for frontend validation schemas.
- Frontend validation is for UX only.
- Backend validation remains authoritative for security, permissions, business rules, and persisted state.
- Keep localized validation messaging compatible with the i18n layer.
- Do not put unsaved form state into TanStack Query.

### Server State

- Use TanStack Query for frontend server state.
- Local React state is for UI state such as dialogs, tabs, current step, and local filters.
- Do not call raw `fetch` from product components.
- Keep URL construction, HTTP concerns, and error mapping inside shared API boundaries.
- Mutations must invalidate or update affected queries deliberately.
- Avoid optimistic updates for authorization-sensitive or workflow-state-changing operations unless the behavior is explicitly justified and safe to roll back.

### Routing

- Use React Router for route architecture and nested layouts.
- Route structure should follow product areas.
- Protected routes are a UX boundary only.
- Backend authorization remains the real security boundary.
- Current-account loading should go through the shared query and API boundary.
- Do not use route loaders by default in the MVP unless there is a concrete need.

### Internationalization

- User-facing copy must go through `i18next` and `react-i18next`.
- English is the canonical fallback language.
- Support English, Spanish, and French from the start.
- Translation keys should describe product meaning, not screen position.
- Keep translation ownership aligned with frontend ownership: global, navigation, validation, and product-area or workflow scopes.
- Backend error `code` values must be stable enough for localized frontend mapping.

## Testing Conventions

Testing follows a risk-based, behavior-focused strategy.

Core rules:

- Test behavior, not implementation details.
- Use the smallest useful test layer.
- Test count is a review signal, not a goal.
- Avoid large AI-generated suites without behavior-group planning.
- Every bug fix should add a regression test at the lowest useful layer unless there is a clear reason not to.
- Authorization-sensitive changes must cover both allowed and forbidden cases.
- Workflow state changes must cover valid and invalid transitions.
- Do not duplicate the same scenario across many layers without a real risk reason.

Preferred test layers:

- Domain tests for business invariants.
- Use-case tests for orchestration, authorization, and transitions.
- API tests for request/response, validation, and visibility.
- Persistence tests when database behavior or transactions matter.
- Component and workflow tests for meaningful UI behavior.
- A small number of high-value end-to-end tests.

## Logging And Security Guardrails

### Logging

- Use Fastify and Pino structured logging.
- Include request IDs or correlation IDs when available.
- Prefer structured fields over concatenated log strings.
- Log enough to debug auth, validation, and authorization flows.
- Do not log passwords, session identifiers, secrets, tokens, or sensitive PII.

### Security

- Backend authorization is mandatory for protected behavior.
- Frontend conditional rendering is not a security boundary.
- Disabled accounts must be checked by the backend, not trusted from client state.
- Sensitive endpoints must consider abuse prevention and rate limiting.
- Password recovery must avoid unnecessary account enumeration.
- Cookie-based sessions require explicit CSRF consideration.
- Safe methods must not change server state.
- API responses and logs must minimize private data exposure.

## Documentation And Update Rules

When changing behavior or conventions:

- Update the relevant spec or ADR if source-of-truth behavior changes.
- Update this guide when accepted implementation conventions change.
- Update `docs/implementation-progress.md` when a phase, PR, or meaningful implementation slice completes.
- Keep `README.md` and setup docs current when contributor workflows change.
- Do not add implementation behavior that conflicts with the current phase.

Agents and contributors must read the relevant spec and ADR before changing behavior in that area.

## Do / Don't Examples

### Backend

Do:

- Parse HTTP input in the route layer and call a named use case.
- Keep Prisma calls inside infrastructure adapters.
- Validate HTTP shapes with TypeBox at the route boundary.
- Return stable error codes for frontend localization.

Don't:

- Put business rules in Fastify handlers.
- Import Prisma Client into domain or application code.
- Use TypeBox types as domain models.
- Return free-form ad hoc error shapes per route.

### Frontend

Do:

- Fetch server state through query hooks and shared API modules.
- Use React Hook Form and Zod for forms.
- Keep product-area boundaries explicit.
- Wrap Ant Design primitives before broad reuse.
- Localize user-facing copy.

Don't:

- Call raw `fetch` directly from product components.
- Treat protected routes as real authorization.
- Put unsaved form state into TanStack Query.
- Hardcode user-facing product copy in reusable components.
- Spread Ant Design-specific props across feature code by default.

## Reference ADR Table

| ADR | Topic | Implementation rule to remember |
| --- | ----- | -------------------------------- |
| `0001` | Repository strategy | Keep frontend and backend separable inside the monorepo. |
| `0002` | Backend framework/runtime | Fastify at the HTTP boundary; domain and use cases stay framework-independent. |
| `0003` | Frontend framework/runtime | React + Vite with clear product-area and API-boundary conventions. |
| `0004` | Database and persistence | PostgreSQL + Prisma, with Prisma isolated to infrastructure adapters. |
| `0005` | Testing strategy | Behavior-focused tests at the smallest useful layer. |
| `0006` | Authentication and sessions | Opaque server-side cookie sessions; backend-owned authorization. |
| `0007` | UI wrapper strategy | Broadly used vendor components must be wrapped. |
| `0008` | UI library | Ant Design is the base library, not the app architecture. |
| `0009` | Internationalization | `i18next` + `react-i18next`; no hardcoded user-facing copy. |
| `0010` | Deployment and hosting | Keep the MVP Docker/Coolify-friendly and deployment assumptions explicit. |
| `0011` | Linting and formatting | Canonical quality gates are `pnpm format`, `pnpm lint`, and `pnpm typecheck`. |
| `0012` | Frontend server state | TanStack Query owns server-state concerns. |
| `0013` | API contract and docs | OpenAPI is the contract; Scalar is the docs UI. |
| `0014` | Frontend forms and validation | React Hook Form + Zod; frontend validation is UX only. |
| `0015` | Backend schemas and validation | TypeBox and JSON Schema stay at the HTTP boundary. |
| `0016` | API error model | Stable error envelope with `code`, `message`, optional `details`, and `requestId`. |
| `0017` | Frontend routing | React Router; no route loaders by default initially. |
| `0018` | Logging and observability | Fastify/Pino structured logs with request correlation and redaction discipline. |

## When In Doubt

- Stop and read the relevant spec.
- Read the relevant ADR.
- Prefer the smaller change.
- Keep the boundary clean.
- Ask for clarification before inventing business behavior.
