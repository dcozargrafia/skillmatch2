# 09-architecture.md

# Architecture

## Purpose

This document defines the high-level architecture for SkillMatch.

The architecture translates the approved product scope, roles, functional requirements, domain model, user flows, UI structure, API specification, and data model into system boundaries, architectural patterns, module responsibilities, dependency rules, and cross-cutting technical principles.

This is not a framework decision, hosting plan, physical database design, deployment pipeline, implementation task list, or final code structure. Those decisions come later.

The architecture should remain framework-agnostic at this stage. Later technology choices may implement these boundaries, but they must not redefine the approved product and domain architecture.

---

## Architectural Decision Summary

SkillMatch MVP should use a full-stack logical architecture with:

* A separately structured frontend and backend/API.
* A backend implemented as a modular monolith.
* Backend internals guided by Clean Architecture and Hexagonal Architecture principles.
* A frontend organized by product areas, workflows, and reusable component layers.
* A resource-oriented API as the contract between frontend and backend.
* Infrastructure integrations hidden behind adapters.

This approach keeps the MVP simple to operate while preserving clear boundaries for future growth.

---

## Architecture Principles

SkillMatch architecture should be guided by these principles:

* Product and domain rules come before framework convenience.
* Business workflows should be explicit, traceable, and testable.
* The backend enforces correctness; the frontend improves understanding and interaction.
* Infrastructure details should be replaceable behind clear boundaries.
* Simplicity should be preferred over distributed-system complexity for the MVP.
* Reuse should come from understood repetition, not premature abstraction.
* Architecture decisions should remain accessible to future open-source contributors.

These principles should be used when evaluating future implementation choices.

---

## Pattern Map

| Decision | Pattern Type | Pattern Name | SkillMatch Use |
| -------- | ------------ | ------------ | -------------- |
| Single backend deployment with internal modules | Architectural style / deployment pattern | Modular Monolith | Keeps operations simple while avoiding an unstructured codebase. |
| Domain and use cases independent from framework and infrastructure | Architectural pattern | Clean Architecture | Protects business rules such as assignment, deliverable approval, and certificate generation. |
| External systems connected through interfaces and adapters | Architectural pattern | Hexagonal Architecture | Allows database, notification, authentication, or certificate implementations to change without rewriting domain logic. |
| Frontend organized around user-facing areas | Frontend architectural pattern | Product-Area Architecture | Keeps public, contributor, NGO, and admin experiences understandable. |
| User processes modeled as guided flows | UI/application pattern | Workflow-Based UI | Supports project creation, applications, deliverable submission, verification, and review flows. |
| Shared reusable UI layers | Frontend design system pattern | Layered Component Architecture | Enables reusable components without mixing product workflows into generic UI primitives. |
| Third-party UI components wrapped before app-wide use | Frontend boundary pattern | Design System Wrapper | Avoids coupling product code directly to a UI library. |
| Frontend translation resources separated by scope | Frontend cross-cutting architecture | Internationalization Boundary | Keeps user-facing text maintainable and ready for multiple languages from the beginning. |
| Backend remains source of truth for permissions and transitions | Security architecture principle | Backend-Enforced Authorization | Prevents UI visibility rules from becoming real security rules. |
| Frontend/backend communication through stable resource operations | Integration pattern | API as Contract | Keeps UI behavior aligned with the approved API specification. |

---

## Framework Boundaries

This architecture is intentionally framework-agnostic.

Frameworks may provide useful structure for routing, dependency injection, validation, controllers, modules, rendering, forms, or persistence integration. They must not become the source of product or domain truth.

Examples:

* Backend frameworks may implement API controllers, dependency injection, guards, modules, and adapters.
* Frontend frameworks may implement routing, rendering, layouts, forms, and data-fetching integration.
* ORM or database tools may implement persistence, but must not bypass domain invariants.
* UI libraries may provide visual primitives, but should be wrapped before app-wide use.

Rules:

* Framework-specific code should stay near delivery, composition, or infrastructure boundaries.
* Domain and application logic should remain understandable without knowing the chosen framework.
* A technology choice is acceptable only if it can implement the approved architectural boundaries without forcing product compromises.

---

## System Boundary

SkillMatch should be understood as a full-stack system with these main parts:

| Part | Responsibility |
| ---- | -------------- |
| Frontend Application | Presents public, contributor, NGO, and admin workflows. |
| Backend API | Enforces business rules, authorization, state transitions, and workflow orchestration. |
| Database | Persists accounts, profiles, projects, applications, deliverables, notifications, certificates, activity, and governance records. |
| External Services | Provide implementation-specific capabilities such as email delivery or authentication support only when introduced by later requirements. |
| Background/Internal Workflows | Execute internal platform effects such as notification creation, certificate generation, and activity recording. |

The backend owns business correctness. The frontend owns interaction quality.

---

## Backend Architecture

### Decision

The backend should be implemented as a modular monolith using Clean/Hexagonal Architecture principles.

### Why Modular Monolith

A modular monolith is appropriate for the MVP because SkillMatch has meaningful business workflows but does not yet have the operational scale, team size, or independent deployment needs that justify microservices.

Benefits:

* One backend to deploy and operate.
* Clear internal module boundaries.
* Easier local development and testing.
* Lower infrastructure complexity.
* Future extraction path if a module later needs independent scaling.

Risks:

* Without discipline, it can degrade into an unstructured monolith.
* Module boundaries must be enforced through code organization and dependency rules.
* Shared database access must not become a shortcut around domain rules.

### Rejected Alternative: Simple Monolith

A simple monolith would be faster initially but too easy to turn into a tightly coupled codebase where controllers, database logic, and business rules mix together.

This is not recommended because SkillMatch has many stateful workflows that need clear rules and traceability.

### Rejected Alternative: Microservices

Microservices are not recommended for the MVP.

They would add distributed-system complexity before SkillMatch has a proven need for independent service deployment, separate scaling, or team ownership per service.

The MVP should avoid premature complexity around network contracts, distributed tracing, eventual consistency, service discovery, and multi-service deployments.

---

## Backend Module Boundaries

The backend should be divided into domain-aligned modules.

Recommended logical modules:

| Module | Responsibility |
| ------ | -------------- |
| Accounts | Authentication identity, roles, account state, disabled accounts. |
| Profiles | Contributor profiles, NGO profiles, editable role-specific data. |
| NGO Verification | NGO verification lifecycle, approval, rejection, restriction, restoration. |
| Skills | Central skill catalog, categories, contributor skills, project skills. |
| Projects | Project lifecycle, publication, ownership, archiving, completion rules. |
| Applications | Contributor applications, withdrawal, acceptance, not-selected state. |
| Compatibility | Compatibility assessment calculation inputs, labels, and explanations. |
| Assignments | One-contributor project assignment and assignment history. |
| Deliverables | Deliverable definitions, submissions, reviews, approval/rejection rules. |
| Collaboration | Contextual project and deliverable comments. |
| Notifications | Recipient-specific in-platform notifications and read/archive state. |
| Certificates | Certificate issuance, snapshots, revocation, and contributor download ownership. |
| Administration | Governance actions, moderation, audit-oriented administrative operations. |
| Activity | Append-only records for important workflow and governance events. |

Modules should expose use cases or application services, not raw database access.

### Module Categories

Backend modules should be understood in three categories:

| Category | Modules | Purpose |
| -------- | ------- | ------- |
| Core workflow modules | Projects, Applications, Assignments, Deliverables, Compatibility, Certificates | Own the main collaboration lifecycle. |
| Supporting product modules | Accounts, Profiles, NGO Verification, Skills, Collaboration, Notifications | Enable identity, eligibility, communication context, and awareness. |
| Governance and traceability modules | Administration, Activity | Preserve accountability and support exceptional platform operation. |

This categorization is conceptual. It should guide boundaries without forcing separate deployments.

### Module Interaction Rules

Modules may collaborate, but they should not freely reach into each other's internal data or persistence details.

Rules:

* A module owns its business invariants and state transitions.
* Other modules should request behavior through explicit use cases, services, or ports.
* Cross-module workflows should be coordinated by application use cases, not by controllers or persistence models.
* Shared concepts should not automatically become shared mutable code.
* Duplication of small value objects or read models may be acceptable when it avoids inappropriate coupling.

Examples:

* Assigning a contributor belongs to the assignment/application workflow and should not be implemented as a direct project table update from a controller.
* Completing a project may need deliverable state, certificate issuance, notifications, and activity records, but the completion use case should coordinate those effects explicitly.
* Compatibility assessment may read contributor skills and project skills, but it should not own either catalog data or profile data.

### Transaction And Consistency Boundaries

State-changing use cases should define their consistency boundary explicitly.

Rules:

* A business transition should either complete fully or fail without partial workflow state when strong consistency is required.
* Critical transitions should record activity in the same logical operation whenever possible.
* Notification creation may be synchronous or internally deferred, but missing notifications must not corrupt core workflow state.
* Certificate issuance must preserve the certificate snapshot at the time of project completion.
* Internal event-like patterns may separate side effects, but they must remain observable and traceable in the MVP.

---

## Backend Dependency Rules

Backend dependencies should point inward.

Recommended layers:

```text
API / Controllers
        ↓
Application Use Cases
        ↓
Domain Model / Business Rules
        ↑
Infrastructure Adapters
```

Rules:

* API controllers must not contain business rules.
* Application use cases coordinate workflow actions.
* Domain logic defines valid states, invariants, and business decisions.
* Infrastructure implements persistence, external notifications, authentication integrations, and other technical details.
* Domain and application layers must not depend directly on framework, database, or external-service code.
* Cross-module access should happen through explicit application-level interfaces, not direct table/model access.

---

## Frontend Architecture

### Decision

The frontend should be organized by product areas and user workflows, supported by shared reusable component layers.

### Product Areas

Recommended top-level frontend areas:

| Area | Responsibility |
| ---- | -------------- |
| Public | Guest-facing pages, project discovery, login, registration, public NGO/project information. |
| Contributor | Contributor dashboard, profile, applications, assigned projects, deliverables, certificates, notifications. |
| NGO | NGO dashboard, profile, verification, projects, application review, deliverable review, completed records. |
| Admin | Verification, governance, moderation, skills catalog, activity, account and contributor review. |
| Shared | Cross-cutting UI primitives, layouts, API client, form primitives, feedback patterns, permission helpers. |

Product areas should own feature-specific screens and workflows.

Shared code should remain genuinely reusable and must not become a dumping ground for unrelated product logic.

### Workflow-Based UI

Frontend flows should model complete user processes rather than isolated pages.

Examples:

* Create project workflow.
* Submit application workflow.
* Review applications workflow.
* Submit deliverable workflow.
* Review deliverable workflow.
* NGO verification workflow.
* Certificate review/download workflow.

The UI may render a workflow as one page or multiple steps, but the product process should remain explicit.

### Routing And Layout Boundaries

Routing and layout should follow product areas and role-specific experiences.

Rules:

* Public, contributor, NGO, and admin areas should have clear route and layout boundaries.
* Shared layouts should provide structure, not product-specific decisions.
* Role-specific navigation should be derived from authenticated account context and backend permissions where needed.
* Unauthorized or unavailable actions should be explained through state-aware UI, not hidden without context when the user needs guidance.
* Admin routes should remain operational and governance-focused, not normal workflow shortcuts.

### Frontend Data Access Boundaries

Frontend data access should go through an API-facing boundary instead of spreading raw request logic across pages and components.

Rules:

* Pages and workflow components should consume product-specific data hooks, services, or query functions rather than constructing low-level API requests inline.
* API response handling, error mapping, loading states, and cache invalidation should be standardized.
* Server state should be invalidated or refreshed after successful workflow transitions.
* Frontend code should not infer hidden business rules from unrelated response fields when the API can expose explicit state or next-action information.
* Backend error codes should be mapped to localized, user-facing messages at the frontend boundary.

---

## Frontend Component Layers

The frontend should support reuse through layered components.

Recommended conceptual layers:

```text
Third-Party UI Library Components
        ↓
Application UI Wrappers
        ↓
Shared Application Components
        ↓
Feature / Workflow Components
        ↓
Pages / Routes
```

Examples:

| Layer | Example |
| ----- | ------- |
| Third-party UI component | Vendor button, modal, table, form input. |
| Application UI wrapper | `AppButton`, `AppModal`, `AppTable`, `AppTextField`. |
| Shared application component | `StatusBadge`, `CompatibilityLabel`, `ExternalUrlField`, `DashboardShell`. |
| Feature/workflow component | `SubmitApplicationForm`, `DeliverableReviewPanel`, `ProjectEditorWorkflow`. |
| Page/route | Contributor application page, NGO project editor page, admin skills page. |

Rules:

* Product code should avoid using third-party UI components directly across the app.
* Third-party UI components should be wrapped behind app-level components when used widely.
* Shared components should represent common visual language or common interaction patterns.
* Business-specific components should stay inside their product area or workflow.
* Reuse should be extracted after real repetition is understood, not guessed too early.

### Component Ownership Rules

Component ownership should remain clear so reuse does not damage product clarity.

Rules:

* Shared UI primitives are owned by the shared design system layer.
* Shared application components are allowed only when they represent repeated product language or interaction patterns.
* Feature components are owned by the product area or workflow that uses them.
* A component should move to shared only after at least two real use cases prove the same abstraction is needed.
* Shared components should avoid accepting excessive configuration that turns them into hidden workflow engines.
* Product-specific copy should stay out of generic components and should be passed through translation keys or explicit content slots.

---

## Frontend Internationalization

The frontend should support internationalization from the beginning.

This is an architectural boundary, not a library decision. The final i18n library or framework-specific implementation can be decided later.

Recommended translation resource scopes:

| Scope | Purpose | Examples |
| ----- | ------- | -------- |
| Global translations | Shared UI language used across the application. | Save, Cancel, Loading, Required field, Dashboard, Notifications. |
| Navigation translations | Role-aware menus, route labels, and layout text. | Discover Projects, My Applications, Skills Catalog. |
| Validation and error translations | Common validation and API error feedback. | Invalid URL, Forbidden, Invalid state transition. |
| Product-area translations | Text specific to public, contributor, NGO, or admin areas. | Verification status explanations, certificate download copy. |
| Workflow/view translations | Text specific to a single user flow or screen. | Submit application guidance, deliverable rejection feedback. |

Rules:

* User-facing frontend text should not be hardcoded inside components, except temporary development-only text.
* Global translation files should not become a dumping ground for feature-specific copy.
* Product-area and workflow translations should live close to the UI that owns their context.
* Translation keys should describe meaning, not visual placement.
* Backend error codes should be stable enough for the frontend to map them to localized messages.

---

## Frontend State Rules

Frontend state should distinguish server state from UI state.

| State Type | Examples | Source of Truth |
| ---------- | -------- | --------------- |
| Server State | Projects, applications, profiles, deliverables, notifications, certificates, compatibility assessments. | Backend API |
| UI State | Open modals, current step, local filters, unsaved form fields, selected tabs. | Frontend |

Rules:

* Server state should be fetched and synchronized through API-facing data access patterns.
* UI state should remain local unless it represents persisted product state.
* The frontend may provide immediate feedback, but backend responses determine final workflow state.
* Form validation may exist in the frontend for usability, but backend validation remains authoritative.

### Form And Validation Boundaries

Forms should support guided workflows without becoming business-rule owners.

Rules:

* Frontend validation should improve usability by catching obvious missing or malformed input early.
* Backend validation remains authoritative for permissions, ownership, state transitions, and domain invariants.
* Form schemas or validation helpers should be reusable when they represent common input rules.
* Workflow-specific validation messages should live with the workflow translation resources.
* The frontend should present backend validation errors in context whenever possible.

---

## Authorization Architecture

Authorization must be enforced by the backend.

The frontend may use role-aware navigation and conditional rendering to improve the user experience, but it must not be treated as a security boundary.

Backend authorization must consider:

* Account role.
* Account state.
* Resource ownership.
* NGO verification status.
* Project state.
* Application state.
* Assignment relationship.
* Administrative permission and reason requirements.

Frontend authorization should focus on:

* Showing relevant navigation.
* Hiding unavailable actions.
* Displaying state-specific explanations.
* Handling forbidden responses gracefully.

### Policy Placement

Authorization policy should be centralized enough to stay consistent, but close enough to workflows to understand context.

Rules:

* Authentication answers who the actor is.
* Authorization answers whether that actor may perform a specific action on a specific resource in its current state.
* Role checks alone are insufficient for most protected operations.
* Ownership, assignment, verification status, and workflow state must be part of authorization decisions where relevant.
* Administrative actions that affect access, visibility, moderation, certificates, or history should require preserved reasons.

---

## API Boundary

The API is the contract between the frontend and backend.

The API should remain resource-oriented, with explicit action endpoints for meaningful business transitions.

Examples of explicit transitions:

* Submit application.
* Withdraw application.
* Assign contributor.
* Submit deliverable.
* Approve deliverable.
* Reject deliverable.
* Complete project.
* Issue certificate through project completion or an internal certificate process.
* Revoke certificate through administrative governance.
* Approve or reject NGO verification.
* Restrict or restore NGO.

The frontend should not reconstruct workflow state from unrelated low-level data when the API can provide explicit state and next-action information.

### API Response Responsibilities

API responses should help the frontend present workflows clearly without moving business decisions into the UI.

Rules:

* Protected responses should expose only data visible to the requester.
* Workflow resources should expose clear state and relevant next-action information when useful.
* Error responses should include stable machine-readable codes and human-safe messages or message keys.
* Pagination, filtering, and sorting should be standardized across list endpoints.
* API contracts should avoid leaking persistence implementation details.

---

## Internal Events And Workflow Side Effects

Some workflow actions create internal side effects.

Examples:

* Assigning a contributor may mark other applications as Not Selected.
* Approving mandatory deliverables may enable project completion.
* Completing a project may issue a certificate and certificate snapshot.
* Workflow transitions may create notifications.
* Governance actions may create administrative actions and activity records.

These effects should be coordinated inside backend application use cases.

For the MVP, these do not require a distributed event-driven architecture. Internal event-like patterns may be used inside the modular monolith when they improve separation, but they must remain simple and traceable.

### Side Effect Reliability

Side effects should be classified by their importance to the core workflow.

| Side Effect | Reliability Expectation |
| ----------- | ---------------------- |
| Activity record for critical state transition | Should be recorded with the transition whenever possible. |
| Certificate snapshot generation | Must succeed for certificate issuance to be valid. |
| Notification creation | Should be reliable, but notification failure should not corrupt the main workflow state. |
| Administrative action record | Must preserve actor, reason, target, and timestamp for governance actions. |

Rules:

* Critical side effects should be part of the same logical operation as the workflow transition.
* Non-critical awareness side effects may be retried or repaired later if implementation supports it.
* Side effects must be idempotent where retry is possible.
* Side effects should not silently create duplicate certificates, duplicate administrative actions, or conflicting activity records.

---

## Infrastructure Boundaries

Infrastructure concerns should be accessed through adapters.

Potential infrastructure adapters include:

* Persistence adapter.
* Authentication/session adapter.
* Notification delivery adapter.
* Certificate rendering or generation adapter.
* External URL validation adapter, if introduced.
* Clock/time adapter for deterministic workflow testing.

Domain and application logic should depend on interfaces or ports, not concrete infrastructure details.

### Observability And Operational Traceability

The MVP architecture should support enough operational visibility to understand important failures and governance actions without introducing heavy observability infrastructure too early.

Rules:

* Important workflow failures should be logged with enough context to investigate safely.
* Logs must not expose sensitive private content unnecessarily.
* Administrative and workflow state changes should be traceable through Activity Records or Administrative Actions.
* Technical logs are not a substitute for product-level activity history.
* Metrics can remain minimal in the MVP, focused on operational health and basic platform activity.

---

## Explicit Non-Goals

The architecture must not introduce:

* Microservices for the MVP.
* Email notification infrastructure as an MVP requirement.
* Distributed event sourcing.
* Full CQRS architecture.
* A general-purpose messaging system.
* A platform file-storage service.
* A public contributor marketplace or talent search architecture.
* A full project-management architecture.
* Complex analytics infrastructure.

These patterns may be reconsidered only if future requirements justify their cost.

---

## Architecture Review Checklist

Before implementation begins, the architecture should confirm:

* Backend module boundaries are clear.
* Business rules are not placed in API controllers or frontend components.
* Frontend areas match the approved UI structure.
* Shared frontend components do not become a dumping ground.
* Authorization is enforced by the backend.
* API responses support frontend workflows without leaking persistence details.
* Infrastructure dependencies are isolated behind adapters.
* Critical side effects are reliable, idempotent where needed, and traceable.
* Technical logs do not replace product-level activity history.
* MVP complexity remains appropriate for the product stage.
