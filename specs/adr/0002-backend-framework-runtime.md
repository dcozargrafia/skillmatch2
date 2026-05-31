# ADR 0002: Backend Framework And Runtime

## Status

Accepted

## Context

SkillMatch needs a backend framework/runtime decision before Phase 1 backend implementation.

The backend must support:

* Modular monolith architecture.
* Clean/Hexagonal Architecture principles.
* Domain and application logic independent from framework and infrastructure details.
* Resource-oriented API endpoints.
* Authentication, authorization, validation, and error handling.
* Workflow orchestration across accounts, profiles, projects, applications, assignments, deliverables, certificates, notifications, activity, and administration.
* Testability at domain, application/use-case, and API layers.
* Monorepo-friendly TypeScript development.

The main options considered were:

* Node.js + TypeScript + Fastify with explicit architecture conventions.
* Node.js + TypeScript + NestJS.
* Node.js + TypeScript + Express with custom architecture conventions.
* Other non-TypeScript frameworks such as Laravel, Django, Rails, or Spring.

---

## Decision

SkillMatch will use Node.js + TypeScript + Fastify for the backend MVP.

Fastify will be used as the HTTP/API framework and composition layer for routes, plugins, hooks, request/response schemas, validation integration, and server lifecycle.

Fastify must not define the domain architecture.

Domain rules, application use cases, business invariants, and workflow orchestration must remain independent from Fastify-specific route handlers, plugins, hooks, and infrastructure details.

Recommended dependency direction:

```text
Fastify Routes / Hooks / Schemas
        ↓
Application Use Cases
        ↓
Domain Model / Business Rules
        ↑
Infrastructure Adapters
```

---

## Architectural Constraints

Fastify usage must follow these constraints:

* Route handlers should translate HTTP requests into use-case calls.
* Route handlers must not contain business rules.
* Application use cases should be explicit and named.
* Domain logic should not depend on Fastify request, reply, plugin, hook, or schema types.
* Fastify plugins may be used for HTTP composition, shared infrastructure registration, authentication hooks, validation setup, logging setup, and route grouping.
* Plugins must not become hidden service containers that bypass module boundaries.
* Request/response schemas may validate and serialize API boundaries, but backend business validation remains part of application/domain logic.
* Authentication hooks may identify the actor, but domain-sensitive authorization must still be validated in use cases where relevant.
* Module route registration may map to logical backend modules, but folders and plugins are not enough to prove architectural boundaries.
* Dependency wiring should be explicit through a composition root or equivalent module setup.

---

## Expected Backend Shape

The backend should keep Fastify near the HTTP boundary.

Conceptual structure:

```text
apps/api/src/
  modules/
    projects/
      domain/
      application/
      infrastructure/
      http/
        projects.routes.ts
        projects.handlers.ts
        projects.schemas.ts

  shared/
    http/
    auth/
    errors/
    config/
    validation/
```

The exact structure may be refined during Phase 0, but the core rule remains: handlers call use cases; use cases protect business rules.

---

## Consequences

### Benefits

* Less framework ceremony than NestJS.
* Clearer separation between HTTP framework and application architecture.
* Strong fit for explicit Clean/Hexagonal boundaries.
* Good TypeScript support for modern API development.
* Strong plugin, hook, schema, validation, and serialization model.
* Lower risk of framework-specific domain leakage than heavier frameworks.
* Better learning value for understanding architecture fundamentals.
* Good fit for a Nest-free backend while still avoiding Express-level minimalism.

### Tradeoffs

* The project must define more conventions itself than with NestJS.
* Dependency wiring, module composition, authorization policies, error mapping, and transaction boundaries need explicit project patterns.
* Contributor onboarding may require stronger project documentation because the architecture is not fully dictated by the framework.
* AI-generated code may tend toward oversized route handlers unless use-case boundaries are enforced.
* The team must be disciplined about keeping Fastify code at the HTTP boundary.

### Risks

The main risk is under-specifying internal backend conventions and ending up with route-handler spaghetti.

This risk should be mitigated through explicit module structure, named use cases, dependency rules, architecture-focused code review, and tests focused on business rules outside the HTTP layer.

---

## Rejected Alternatives

### Node.js + TypeScript + NestJS

NestJS was a strong alternative.

It provides conventions for modules, dependency injection, controllers, providers, guards, pipes, and testing structure.

It was rejected for the MVP because SkillMatch already requires strong custom architectural discipline around Clean/Hexagonal boundaries, and adding a heavy opinionated framework increases the risk of framework-driven development. The project should make architecture explicit instead of relying on NestJS structure to imply boundaries.

NestJS may be reconsidered if Fastify conventions become too costly to maintain or contributor onboarding suffers significantly.

### Node.js + TypeScript + Express

Express was rejected for the MVP.

It is widely known and flexible, but it provides too little structure for SkillMatch's workflow-heavy backend. The project would need to define and enforce most HTTP/API conventions manually, increasing the risk of route-handler or service-layer spaghetti.

Fastify provides a better middle ground: less ceremony than NestJS, but stronger API primitives and plugin/schema conventions than Express.

### Non-TypeScript backend frameworks

Frameworks such as Laravel, Django, Rails, or Spring were rejected for the MVP backend.

They are valid technologies, but they reduce the benefit of a TypeScript-first monorepo, shared contracts, and unified frontend/backend contributor experience.

---

## Review Triggers

This decision should be revisited if:

* Fastify conventions become too costly to define or maintain.
* Backend code repeatedly accumulates oversized route handlers despite review.
* Module boundaries remain unclear without a heavier framework.
* Contributor onboarding becomes harder because of custom backend conventions.
* TypeScript monorepo benefits prove less valuable than expected.
* Runtime or deployment requirements strongly favor a different backend approach.
* Testing domain and use cases independently becomes unnecessarily difficult.
