# ADR 0012: Frontend Server State Management

## Status

Accepted

## Context

SkillMatch uses React + TypeScript + Vite for the frontend MVP.

ADR 0003 requires a clear separation between server state and UI state, and the architecture specification requires server state to be fetched and synchronized through API-facing data access patterns.

Phase 1 will introduce authentication, current-account state, protected routes, role-aware UI, and authorization feedback. Those workflows need a consistent frontend server-state approach before broader product workflows depend on ad hoc data fetching.

The frontend needs to support:

- Fetching backend API data through an explicit frontend API boundary.
- Caching and invalidating server state without duplicating backend business rules.
- Representing loading, error, and stale states consistently.
- Mutating backend state while allowing the backend response to remain authoritative.
- Keeping UI-only state separate from persisted product state.

The main options considered were:

- TanStack Query.
- Hand-written React hooks with `fetch` and local component state.
- A global client-state store for both UI state and server state.

---

## Decision

SkillMatch will use TanStack Query for frontend server state in `apps/web`.

TanStack Query owns client-side concerns for backend data:

- Query caching.
- Loading, error, success, and stale states.
- Refetching and cache invalidation.
- Mutations that call backend API endpoints.
- Optimistic updates only when explicitly justified by a workflow.

TanStack Query must be used behind SkillMatch-owned frontend boundaries. Components should not scatter raw `fetch` calls or backend URL construction across product areas.

The expected frontend data-access shape is:

```text
Product Area / Workflow UI
        ↓
Workflow-specific query hooks
        ↓
Shared API client and API modules
        ↓
Backend HTTP API
```

UI state remains separate from server state. Local UI concerns such as open dialogs, selected tabs, active form steps, unsaved form fields, and transient filters should stay in local component state or narrowly scoped UI helpers unless a later ADR chooses a dedicated UI-state library.

The backend remains authoritative for business rules, permissions, validation, workflow transitions, and persisted state.

---

## Rationale

TanStack Query directly supports the distinction already required by the architecture: server state is not the same as UI state.

It gives the frontend a standard way to model remote data lifecycle without turning React components into manual cache managers. This matters for SkillMatch because authentication, role-aware routing, project workflows, applications, deliverables, notifications, and certificates will all depend on backend data that can change outside a single component.

Using TanStack Query also keeps the MVP simpler than introducing a broad global state store. A global store can be useful for UI state, but using it as a generic server-state cache would force the project to manually rebuild concerns that TanStack Query already handles.

---

## Consequences

Positive:

- Server-state handling is consistent across frontend product areas.
- Components can consume query hooks instead of managing raw request lifecycle state.
- Cache invalidation and refetching become explicit implementation decisions.
- Current-account and protected-route data can use the same server-state model as later workflows.
- Contributors get a common, well-documented library instead of bespoke data-fetching patterns.

Negative:

- The frontend gains another runtime dependency.
- Query key naming and invalidation rules need discipline.
- Incorrect optimistic updates could misrepresent backend-authoritative workflow state.
- Poorly placed query hooks could still create product-area coupling if boundaries are ignored.

---

## Guardrails

- Do not call raw `fetch` from product UI components.
- Keep backend URL construction and HTTP details inside shared API/client modules.
- Keep query hooks close to the workflow or product area that owns the data, unless they are genuinely shared.
- Query keys must be stable, intentional, and named by domain meaning rather than component location.
- Mutations must invalidate or update affected queries deliberately.
- Do not use TanStack Query to encode backend authorization, workflow transitions, or domain invariants.
- Do not use optimistic updates for authorization-sensitive or workflow-state-changing operations unless the behavior is explicitly documented and safe to roll back.
- Do not put UI-only state into TanStack Query just because it is convenient.

---

## Implementation Notes

Phase 1 should introduce TanStack Query when frontend server state first becomes necessary, likely around current-account loading and protected route behavior.

The implementation should include:

- A single `QueryClient` setup at the web application composition boundary.
- Shared query-key conventions before multiple workflows depend on them.
- Current-account query and auth mutations using the shared API boundary.
- Tests at the smallest useful layer for authorization-sensitive and session-sensitive behavior.

The future implementation guide should reference this ADR when documenting frontend data-fetching and state conventions.

---

## Rejected Alternatives

### Hand-written hooks with `fetch` and local state

This is acceptable for very small applications but would make caching, request status, stale data, invalidation, and repeated loading/error handling inconsistent as SkillMatch grows.

It was rejected because the project already knows it will have multiple product workflows depending on backend state.

### Global client-state store for server state

A client-state store can be valuable for UI state, but using it as the main server-state cache would blur the architecture's server-state/UI-state distinction.

It was rejected for server state because SkillMatch should not manually reimplement query caching, invalidation, and refetch semantics.

---

## Review Triggers

This decision should be revisited if:

- The frontend runtime changes away from React + Vite.
- SkillMatch adopts a framework with a fundamentally different server-data model.
- TanStack Query introduces operational complexity that outweighs its benefits for the MVP.
- A future offline-first or real-time architecture requires different server-state synchronization primitives.
