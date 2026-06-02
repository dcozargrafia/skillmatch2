# ADR 0013: API Documentation And Contract

## Status

Accepted

## Context

SkillMatch uses a dedicated Fastify backend API and a React frontend that communicates with it through explicit API boundaries.

The functional API specification defines product-level API expectations, but it is not a final OpenAPI document. The project needs an implementation-level API documentation and contract approach before broad endpoint implementation begins.

The API documentation approach must support:

- Human-readable API documentation for contributors, reviewers, and maintainers.
- A machine-readable contract for frontend integration and future tooling.
- Request and response schema documentation at the HTTP boundary.
- Clear separation between API schemas and backend domain logic.
- A contributor-friendly developer experience during local development.

The main options considered were:

- OpenAPI with Scalar as the human-facing documentation UI.
- Hand-written Markdown API documentation only.
- Framework route definitions without a generated or machine-readable API contract.

---

## Decision

SkillMatch will use OpenAPI as the formal HTTP API contract and Scalar as the human-facing API documentation UI.

Fastify route schemas should feed the OpenAPI contract where practical, but API schema concerns must remain at the HTTP/API boundary.

The expected API documentation shape is:

```text
Fastify routes and HTTP schemas
        ↓
OpenAPI contract
        ↓
Scalar API documentation UI
        ↓
Frontend and contributor consumption
```

The backend domain and application layers must not depend on OpenAPI, Scalar, Fastify request/reply types, or HTTP schema implementation details.

---

## Rationale

OpenAPI gives SkillMatch a standard, machine-readable API contract that can support documentation, review, frontend integration, and future tooling.

Scalar provides a polished documentation UI without making the documentation format proprietary. It improves contributor experience while keeping OpenAPI as the source contract.

This approach fits the existing architecture because Fastify already belongs at the API/composition boundary, where request and response schemas are appropriate. It also avoids maintaining a separate hand-written API documentation source that can drift from implemented routes.

---

## Consequences

Positive:

- API behavior is easier to review and consume.
- Frontend integration has a clearer contract.
- Contributors can inspect endpoints locally without reconstructing route behavior from source files.
- Future code generation or contract checks remain possible because OpenAPI is standard.

Negative:

- Route schemas need discipline and maintenance.
- OpenAPI generation can become noisy if schemas are not organized well.
- The API contract can give false confidence if it drifts from actual authorization or domain behavior.

---

## Guardrails

- OpenAPI describes the HTTP contract; it is not the domain model.
- Scalar presents documentation; it is not the source of truth.
- Do not duplicate API documentation manually in Markdown when it can be derived from the OpenAPI contract.
- Keep Fastify route schemas at the API/composition boundary.
- Do not leak internal domain, Prisma, session, or infrastructure implementation details into public API schemas.
- Stable backend error codes should be documented so the frontend can map them to localized messages.
- Authorization-sensitive endpoints must document expected authentication and role requirements, but backend authorization logic remains authoritative.

---

## Implementation Notes

Phase 1 should introduce OpenAPI and Scalar when the first non-health API endpoints are implemented.

The implementation should include:

- A local API documentation route or clearly documented local documentation command.
- OpenAPI generation wired through Fastify-compatible plugins or schema integration.
- A convention for request, response, and error schemas.
- Documentation for authentication/session behavior once auth endpoints exist.

The future implementation guide should reference this ADR when documenting backend route, schema, and API documentation conventions.

---

## Rejected Alternatives

### Hand-written Markdown API documentation only

Markdown remains useful for product specs and high-level API explanations, but it is too easy for implementation-level endpoint documentation to drift from code.

It was rejected as the primary API documentation contract.

### Framework route definitions without a generated contract

Route definitions alone are not enough for frontend integration, contributor onboarding, or future contract tooling.

This was rejected because SkillMatch needs a visible and standard API contract as the backend grows.

---

## Review Triggers

This decision should be revisited if:

- Fastify schema integration cannot produce maintainable OpenAPI output.
- Scalar no longer fits the project's local development or documentation needs.
- The project adopts a different API style that requires a different contract format.
- Contract generation creates more maintenance burden than value for the MVP.
