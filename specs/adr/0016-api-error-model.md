# ADR 0016: API Error Model

## Status

Accepted

## Context

SkillMatch needs a consistent API error shape before Phase 1 introduces authentication, authorization-sensitive routes, and frontend workflows that must react predictably to backend failures.

ADR 0013 already establishes a formal HTTP contract, and the frontend architecture needs stable error information it can map into user-facing behavior without depending on ad hoc message strings.

The API error approach must support:

- A stable error envelope for frontend and contributor consumption.
- Error codes that remain usable across localization and UI changes.
- Developer-facing default messages that help debugging and logs.
- Optional structured details when extra context is safe and useful.
- Request correlation when request identifiers are available.
- Protection against leaking secrets or sensitive internal data.

The main options considered were:

- A standard structured error envelope with stable codes.
- Returning free-form message strings only.
- Returning localized user-facing copy directly from the backend.

---

## Decision

SkillMatch will use a standard API error envelope with these fields:

- `code`: stable machine-readable error identifier.
- `message`: developer-facing default message.
- `details`: optional structured error details when safe and useful.
- `requestId`: request or correlation identifier when available.

The frontend should localize user-facing error presentation by `code`. For the MVP, the backend will not return localized UI copy as the primary contract.

The backend must avoid leaking secrets, private data, or sensitive internal implementation details through error messages or details payloads.

---

## Rationale

Stable error codes give the frontend a reliable integration point for UX behavior, localization, and workflow-specific handling. They also make logs, debugging, and future documentation more consistent than relying on free-form human-written strings.

Keeping backend `message` fields developer-facing avoids pretending the backend is the final UI copy system. That separation matters because SkillMatch already requires frontend i18n and role-aware user experience.

Adding `requestId` when available improves traceability without forcing a heavy observability platform into the MVP.

---

## Consequences

Positive:

- Frontend error handling can depend on stable codes instead of brittle string matching.
- API error behavior becomes easier to document and review.
- Debugging improves when responses and logs can share request identifiers.
- Localization remains a frontend responsibility.

Negative:

- The backend needs discipline around error-code naming and reuse.
- Contributors may be tempted to overload `details` with internal data.
- The frontend must maintain error-code-to-message mappings for user-facing copy.

---

## Guardrails

- Error `code` values must be stable and documented.
- Do not expose secrets, tokens, passwords, private personal data, stack traces, or internal infrastructure details in `message` or `details`.
- Keep `message` useful for developers without making it the localized UX contract.
- Use `details` only when it materially helps clients or debugging and is safe to expose.
- Do not rely on frontend route guards or UI state to enforce backend error semantics.

---

## Implementation Notes

Phase 1 should introduce the error envelope before or alongside the first account and session endpoints.

The implementation should include:

- A shared backend convention for translating known application failures into stable API error codes.
- Documentation of common auth, validation, and authorization-related error codes.
- Safe handling for unexpected errors so internal failures do not leak sensitive implementation data.
- Frontend conventions for mapping codes to localized messages and workflow feedback.

---

## Rejected Alternatives

### Free-form message strings only

This is simpler initially, but it creates brittle frontend integrations and inconsistent error handling across routes.

It was rejected because SkillMatch needs stable error semantics before auth and authorization workflows expand.

### Backend-localized user-facing messages

This can seem convenient, but it couples API contracts to UI language concerns and complicates frontend localization ownership.

It was rejected for MVP because the frontend already owns i18n and should localize user-facing copy by error code.

---

## Review Triggers

This decision should be revisited if:

- The project adopts a different client architecture that needs richer standardized error metadata.
- API consumers beyond the first-party frontend require a different contract shape.
- Error-code maintenance becomes inconsistent or too costly without stronger tooling.
- Observability or compliance requirements change what request correlation or error detail is needed.
