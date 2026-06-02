# ADR 0017: Frontend Routing Architecture

## Status

Accepted

## Context

Phase 1 will introduce current-account loading, protected routes, role-aware navigation, and product-area separation in the frontend.

SkillMatch needs a clear route architecture before those behaviors are implemented ad hoc across pages. The routing approach must work with the React frontend baseline, the server-state model from ADR 0012, and the authorization expectations defined in the product and architecture specifications.

The frontend routing approach must support:

- Product-area route grouping and shared layouts.
- Protected-route boundaries for auth-aware user experience.
- Role-aware navigation and rendering.
- Explicit integration with current-account server state.
- A simple MVP path that does not over-abstract route data loading too early.

The main options considered were:

- React Router with explicit component and query boundaries.
- A heavier routing/data-loading pattern centered on route loaders from the start.
- A custom in-house routing abstraction over React navigation.

---

## Decision

SkillMatch will use React Router for frontend route architecture, product-area layouts, protected-route boundaries, and role-aware navigation.

Auth-aware rendering should use current-account data obtained through TanStack Query and the shared frontend API boundary.

For the MVP, the frontend should prefer explicit component and query boundaries instead of introducing route loaders by default. Route loaders should not be the initial pattern unless a concrete need appears.

Frontend authorization is a UX concern only. It can hide, redirect, or shape navigation, but backend authorization remains the real security boundary.

The expected route shape is:

```text
React Router route tree
        ↓
Product-area layouts and protected boundaries
        ↓
Current-account query and auth-aware UI decisions
        ↓
Workflow components and API-backed data access
```

---

## Rationale

React Router is the standard routing solution for the current React stack and gives the project enough structure for nested layouts, route boundaries, and controlled navigation without adding unnecessary custom abstractions.

Avoiding route loaders as the default MVP pattern keeps server-state logic aligned with ADR 0012. It prevents the project from splitting data-fetching responsibility across two competing patterns before real complexity justifies that choice.

This approach also makes the frontend security posture clearer: route protection improves UX, but it must never be mistaken for real authorization enforcement.

---

## Consequences

Positive:

- Route organization can follow product areas and shared layouts cleanly.
- Current-account and protected-route behavior can use the same query model as other frontend server state.
- The project avoids premature loader-centric complexity during MVP implementation.
- Role-aware navigation remains explicit and reviewable.

Negative:

- Some contributors may expect loader-based patterns and need guidance on the chosen boundary style.
- Poorly structured route wrappers could still hide too much behavior if not kept simple.
- Frontend UX restrictions can still drift from backend authorization if teams get careless.

---

## Guardrails

- Do not treat frontend route protection as a security boundary.
- Keep current-account fetching behind shared query and API boundaries rather than scattering auth checks across route components.
- Use route loaders only when a concrete workflow need justifies them.
- Keep product-area layouts and protected-route wrappers readable and narrow in responsibility.
- Role-aware navigation must reflect backend-authoritative account and role data rather than hard-coded assumptions.

---

## Implementation Notes

Phase 1 should introduce this route architecture when current-account and protected frontend flows are first implemented.

The implementation should include:

- A top-level route tree organized by public and protected product areas.
- A current-account query used for auth-aware rendering and route decisions.
- Simple protected-route and layout patterns that remain easy to test.
- Tests for allowed, redirected, and forbidden UX paths where behavior matters.

---

## Rejected Alternatives

### Route loaders as the default initial data pattern

React Router loaders can be useful, but adopting them immediately would split frontend data concerns across loaders and TanStack Query before the MVP proves that complexity is necessary.

It was rejected as the default initial pattern in favor of explicit query boundaries.

### Custom routing abstraction

Building a project-specific routing layer would add indirection without solving a proven problem.

It was rejected because React Router already covers the MVP routing needs directly.

---

## Review Triggers

This decision should be revisited if:

- Route-level data loading becomes complex enough that loaders provide clear value.
- The frontend runtime or rendering strategy changes materially.
- Route composition or navigation behavior becomes difficult to maintain with the current pattern.
- New client platforms require a different navigation architecture.
