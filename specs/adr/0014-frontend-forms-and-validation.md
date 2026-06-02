# ADR 0014: Frontend Forms And Validation

## Status

Accepted

## Context

SkillMatch uses React for the frontend and ADR 0012 already separates server state from UI state through TanStack Query.

Phase 1 and later workflows will require forms for authentication, account management, and guided product interactions. The frontend needs a consistent approach for managing form state, validating user input early for UX, and keeping validation messages compatible with the project's i18n requirements.

The form approach must support:

- Local form state and submission handling without turning form fields into ad hoc state management.
- Client-side validation for immediate feedback and better UX.
- Clear separation between frontend UX validation and backend-authoritative business validation.
- User-facing validation messages that can be localized.
- Compatibility with React component boundaries and existing frontend architecture.

The main options considered were:

- React Hook Form with Zod.
- Hand-written form state and validation in React components.
- A broader form library that mixes form state with heavier abstractions not yet needed for the MVP.

---

## Decision

SkillMatch will use React Hook Form for frontend form state and submission handling, and Zod for frontend validation schemas.

Frontend validation exists to improve UX, not to replace backend validation. The backend remains authoritative for security, business rules, permissions, and persisted state validity.

User-facing validation messages must go through the approved i18n layer rather than being hard-coded directly into shared form behavior.

Form state is UI state. It must not be treated as server state, and TanStack Query remains the server-state solution for backend data fetching and mutation lifecycle concerns.

The expected frontend form shape is:

```text
Form UI
        ↓
React Hook Form state and handlers
        ↓
Zod client-side validation
        ↓
Shared API mutation boundary
        ↓
Backend-authoritative validation and persistence
```

---

## Rationale

React Hook Form keeps form state close to the UI while avoiding repetitive controlled-input boilerplate across product workflows.

Zod provides a clear and maintainable way to express frontend validation rules for input shape and UX constraints. Using it with React Hook Form gives the project a repeatable pattern for forms without confusing frontend validation with backend enforcement.

This decision also preserves the architecture already established in ADR 0012: forms are local UI concerns, while persisted backend state and mutation outcomes remain separate concerns.

---

## Consequences

Positive:

- Form handling becomes consistent across frontend workflows.
- Client-side validation feedback is easier to implement and maintain.
- Form state stays separate from server-state caching and invalidation.
- Validation message rendering can align with the project's localization approach.

Negative:

- The frontend gains additional library concepts and dependency surface.
- Frontend and backend validation rules can drift if contributors assume one replaces the other.
- Teams need discipline about where translated messages are resolved.

---

## Guardrails

- Do not treat frontend validation as a security boundary.
- Do not assume a successful Zod validation means the backend must accept the request.
- Keep user-facing validation messages compatible with i18n instead of scattering hard-coded copy across forms.
- Do not put unsaved form state into TanStack Query.
- Keep form schemas focused on frontend UX and input shape, not domain invariants that belong to backend application logic.

---

## Implementation Notes

Phase 1 should introduce this pattern when the first account-oriented forms are implemented.

The implementation should include:

- A repeatable pattern for connecting React Hook Form and Zod.
- Shared guidance for mapping validation failures to localized UI messages.
- Clear boundaries between form submission handlers and API mutation hooks.
- Regression tests at the smallest useful layer for critical form validation and submission behavior.

---

## Rejected Alternatives

### Hand-written form state and validation

This keeps dependencies lower but becomes repetitive and inconsistent across multiple workflows.

It was rejected because SkillMatch already knows it will need many forms with shared validation and submission patterns.

### Heavier form abstractions from the start

Some form solutions provide broader abstractions, but they add complexity that the MVP does not yet need.

This was rejected because the project needs a focused, low-friction form pattern rather than a framework inside the frontend.

---

## Review Triggers

This decision should be revisited if:

- React Hook Form creates maintenance or accessibility issues the team cannot address cleanly.
- The frontend adopts a different runtime or rendering model that changes form-handling needs.
- The project needs a shared schema strategy that materially changes how frontend validation is authored.
- Form workflows become complex enough to justify a different abstraction.
