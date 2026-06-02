# ADR 0015: Backend Schemas And API Validation

## Status

Accepted

## Context

SkillMatch uses Fastify for the backend API, and ADR 0013 establishes OpenAPI plus Scalar as the HTTP contract and documentation approach.

Before Phase 1 endpoint implementation expands, the backend needs a consistent way to define request and response schemas at the HTTP boundary so validation, serialization, and OpenAPI generation stay aligned.

The backend schema approach must support:

- Request validation at the Fastify HTTP boundary.
- Response schema definition for contract clarity and documentation.
- OpenAPI integration without maintaining a separate schema source.
- Clear separation between HTTP contract schemas and domain or application validation.
- Backend architecture boundaries that keep framework-specific concerns out of domain logic.

The main options considered were:

- Fastify JSON Schema with TypeBox.
- Hand-written JSON Schema objects without a schema helper library.
- Using domain types or application models directly as HTTP schemas.

---

## Decision

SkillMatch will use Fastify JSON Schema with TypeBox for request and response schemas at the HTTP/API boundary.

These schemas are responsible for HTTP contract validation, serialization expectations, and OpenAPI integration. Domain and application validation remain separate concerns and must not be replaced by HTTP schema definitions.

TypeBox and JSON Schema must not become the domain model. They belong at the Fastify boundary, not inside core business logic.

The expected backend schema shape is:

```text
Fastify route boundary
        ↓
TypeBox / JSON Schema request and response definitions
        ↓
HTTP validation and OpenAPI generation
        ↓
Application use cases and domain rules
```

---

## Rationale

Fastify already has strong support for schema-driven validation and serialization at the HTTP boundary. TypeBox gives the project a maintainable and typed way to define those schemas while still producing JSON Schema compatible with Fastify and OpenAPI workflows.

This approach fits the existing architecture because it keeps HTTP concerns where they belong and avoids leaking framework schema definitions into domain and application layers.

It also supports the API-contract direction from ADR 0013 without creating a separate translation layer for basic route schemas.

---

## Consequences

Positive:

- HTTP request and response contracts become explicit and reviewable.
- OpenAPI generation can align more closely with implemented route schemas.
- Fastify validation behavior becomes more consistent across endpoints.
- Contributors get a repeatable boundary pattern before broader API growth.

Negative:

- Contributors must understand the difference between HTTP schemas and domain rules.
- TypeBox introduces another library and conventions to learn.
- Poor schema organization could still create noisy route modules or contract drift.

---

## Guardrails

- Keep TypeBox and JSON Schema definitions at the API/composition boundary.
- Do not use HTTP schemas as domain entities, domain value objects, or application command models.
- Do not assume HTTP validation replaces application-level authorization or business-rule validation.
- Avoid leaking Prisma persistence shapes or infrastructure details into public API schemas.
- Keep request and response schemas deliberate rather than inferring public contracts from internal implementation convenience.

---

## Implementation Notes

Phase 1 should introduce this pattern when the first account and session endpoints are implemented.

The implementation should include:

- A clear convention for colocating route handlers with their request and response schemas.
- Shared helpers only where they reduce repetition without hiding contract details.
- A documented distinction between HTTP validation failures and application/domain validation failures.
- Tests at the smallest useful layer for accepted and rejected HTTP input cases.

---

## Rejected Alternatives

### Hand-written JSON Schema without a helper library

This keeps dependencies lower, but it is more verbose and easier to make inconsistent as the route surface grows.

It was rejected because the project wants a maintainable typed schema authoring pattern at the Fastify boundary.

### Reusing domain or application models as HTTP schemas

This looks convenient at first, but it blurs architecture boundaries and makes public contracts depend on internal modeling choices.

It was rejected because SkillMatch explicitly wants domain and application validation to remain separate from HTTP concerns.

---

## Review Triggers

This decision should be revisited if:

- Fastify schema integration with TypeBox becomes difficult to maintain.
- The backend adopts a different transport or contract approach that changes boundary schema needs.
- The project needs a different schema-authoring model for code generation or stronger type guarantees.
- HTTP-schema maintenance burden starts outweighing the contract and validation value for the MVP.
