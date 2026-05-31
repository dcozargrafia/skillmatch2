# ADR 0003: Frontend Framework And Runtime

## Status

Accepted

## Context

SkillMatch needs a frontend framework/runtime decision before broad Phase 1 frontend implementation.

The frontend must support:

* Product-area organization: public, contributor, NGO, admin, and shared.
* Workflow-based UI for applications, assignment, deliverables, certificates, notifications, and administration.
* Reusable component layers and design system wrappers.
* Internationalization from the beginning.
* Accessibility-focused implementation.
* Clear separation between server state and UI state.
* API/data-access boundary to the backend.
* Monorepo-friendly TypeScript development.

The backend is planned as Node.js + TypeScript + Fastify and remains the source of truth for business rules, authorization, workflow state transitions, and persistence.

The main frontend options considered were:

* React + TypeScript + Vite + React Router.
* React + TypeScript + Next.js App Router.
* Other frontend frameworks such as Vue, Svelte, Angular, or Remix.

---

## Decision

SkillMatch will use React + TypeScript + Vite for the frontend MVP.

React Router, or an equivalent explicit client-side routing solution, will be used for product-area routing unless a later ADR replaces it.

Vite will be used as frontend build tooling and development runtime.

Vite must not define the frontend architecture.

React components, routing, data access, i18n, and shared UI layers must follow the approved frontend architecture:

```text
Product Areas / Routes
        ↓
Workflow Components
        ↓
Shared Application Components
        ↓
Application UI Wrappers
        ↓
Third-Party UI Library Components
```

The backend API remains the source of truth for business rules, permissions, workflow transitions, and persisted state.

---

## Architectural Constraints

Frontend implementation must follow these constraints:

* Product areas should remain clear: public, contributor, NGO, admin, and shared.
* Feature/workflow components should live near the product area that owns them.
* Shared components should represent common visual language or repeated interaction patterns, not hidden business workflows.
* User-facing text must use the i18n architecture rather than hardcoded strings.
* Frontend data access must go through an API-facing boundary.
* Frontend code must not duplicate backend business rules.
* Frontend authorization may guide navigation and rendering but must not be treated as a security boundary.
* Server state and UI state should remain conceptually separate.
* Public pages may be client-rendered for the MVP unless a later requirement justifies SSR/SSG.

---

## Expected Frontend Shape

Conceptual structure:

```text
apps/web/src/
  public/
  contributor/
  ngo/
  admin/
  shared/
    ui/
    forms/
    layout/
    api/
    i18n/
    feedback/
```

The exact structure may be refined during Phase 0, but the core rule remains: product workflows own product-specific UI; shared layers own reusable primitives and repeated patterns.

---

## Consequences

### Benefits

* Lower framework complexity than Next.js.
* Clearer frontend/backend separation.
* Strong fit with a dedicated Fastify backend API.
* Simpler mental model for contributors learning the project.
* Good TypeScript and monorepo fit.
* Strong development experience and fast feedback loops.
* Avoids accidental duplication of backend behavior through server actions or framework-specific backend features.
* Gives the project more control over product-area frontend architecture.

### Tradeoffs

* The project must define routing, data-fetching, i18n, metadata, and layout conventions explicitly.
* Public SEO capabilities are weaker than a server-rendered framework by default.
* More architectural discipline is required to avoid SPA spaghetti.
* The project may need additional libraries for routing, server state, forms, validation, i18n, and document metadata.
* SSR/SSG would require later reconsideration if public discovery or NGO/project pages require stronger SEO.

### Risks

The main risk is under-specifying frontend conventions and ending up with route/page-level spaghetti.

This risk should be mitigated through product-area structure, workflow components, shared component ownership rules, API/data-access boundaries, i18n ownership rules, and frontend testing.

---

## Rejected Alternatives

### React + TypeScript + Next.js App Router

Next.js was a strong alternative.

It provides routing, layouts, rendering strategies, and a powerful React framework model.

It was rejected for the MVP because SkillMatch already has a dedicated backend API and the project should avoid adding another heavy opinionated framework unless SSR, SSG, or framework-integrated full-stack behavior becomes clearly necessary.

Next.js may be reconsidered if public SEO, server rendering, or content-heavy public pages become a strong requirement.

### Other frontend frameworks

Vue, Svelte, Angular, Remix, and similar frameworks were not selected for the MVP.

They are valid technologies, but React + Vite provides a strong balance of ecosystem maturity, TypeScript support, contributor familiarity, frontend control, and monorepo compatibility.

---

## Review Triggers

This decision should be revisited if:

* Public project or NGO pages require strong SEO or server rendering.
* Client-only rendering creates unacceptable performance or accessibility problems.
* Frontend routing, metadata, or data-loading conventions become too fragmented.
* Contributor onboarding becomes harder because too many frontend conventions are custom.
* The project needs server-rendered public pages or static generation.
* React + Vite tooling no longer fits deployment requirements.
