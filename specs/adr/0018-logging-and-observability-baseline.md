# ADR 0018: Logging And Observability Baseline

## Status

Accepted

## Context

SkillMatch needs a practical observability baseline before Phase 1 introduces authentication, account state transitions, protected endpoints, and authorization-sensitive behavior.

The MVP does not need a full production observability platform yet, but it does need structured logging and request traceability so backend behavior can be debugged and operated safely as implementation grows.

The baseline observability approach must support:

- Structured backend logs suitable for local development and early operations.
- Request identifiers or correlation identifiers for tracing request flow.
- Safe logging practices that avoid secrets and sensitive personal data.
- A minimal default that fits MVP scope.
- The ability to add deeper observability later without replacing the entire baseline.

The main options considered were:

- Fastify with Pino structured logging and request identifiers.
- Ad hoc console logging.
- Adopting a full external observability vendor stack immediately.

---

## Decision

SkillMatch will use a Fastify and Pino structured logging baseline with request IDs or correlation IDs where available.

The project will keep observability minimal for the MVP. Logs should support debugging, operational visibility, and request tracing without committing early to advanced external observability vendors or platforms.

Logs must not include secrets or sensitive personal data. When request correlation is available, API behavior and error handling should surface or record request identifiers consistently.

---

## Rationale

Fastify already integrates well with Pino, making structured logging a natural fit for the approved backend stack. This gives the project a useful baseline without inventing custom logging conventions or paying the complexity cost of a full observability platform too early.

Request IDs improve traceability for debugging auth, session, validation, and authorization issues. Keeping the baseline minimal respects MVP scope while still building a foundation that can expand later.

---

## Consequences

Positive:

- Backend logs become more consistent and easier to filter.
- Request correlation improves debugging and operational traceability.
- The project avoids premature lock-in to a vendor-specific observability stack.
- Safe logging rules can be established before sensitive workflows expand.

Negative:

- The MVP will not have deep tracing, metrics, or advanced dashboards by default.
- Contributors must be disciplined about redaction and sensitive fields.
- Some production observability needs will remain manual until future phases justify more tooling.

---

## Guardrails

- Do not log passwords, session secrets, tokens, or sensitive personal data.
- Prefer structured fields over ad hoc concatenated log strings.
- Keep correlation IDs consistent across request lifecycle logging when available.
- Do not adopt external observability vendors or heavyweight telemetry stacks without a documented production need.
- Logging must aid debugging without leaking internal security-sensitive context to clients.

---

## Implementation Notes

Phase 1 should establish the logging baseline alongside the first real account and session flows.

The implementation should include:

- A default Fastify logger configuration appropriate for local development and early deployment.
- Request identifier conventions shared by request logging and error handling.
- Redaction or omission rules for sensitive request and response data.
- Documentation of what kinds of events should be logged during MVP-sensitive workflows.

---

## Rejected Alternatives

### Ad hoc console logging

This is simple at first, but it produces inconsistent and low-signal operational output as the backend grows.

It was rejected because SkillMatch needs structured debugging support before auth and authorization flows expand.

### Full observability platform from the start

Advanced tools can be valuable later, but they would add setup, cost, and operational complexity before the MVP proves the need.

It was rejected for now in favor of a minimal structured baseline that can evolve.

---

## Review Triggers

This decision should be revisited if:

- Production support needs require metrics, tracing, or alerting beyond structured logs.
- Compliance or security requirements change what must be logged or redacted.
- Request correlation needs to span additional services beyond the MVP backend.
- The chosen logging baseline creates too much operational noise or too little useful visibility.
