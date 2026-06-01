# ADR 0007: UI Component Library And Design System Wrapper Strategy

## Status

Accepted

## Context

SkillMatch needs a frontend component strategy before broad UI implementation begins.

The frontend architecture already defines:

* Product-area organization for Public, Contributor, NGO, Admin, and Shared areas.
* Workflow-based UI for guided product processes.
* Layered component architecture.
* A design system wrapper boundary between third-party UI components and application code.

The project also needs strong component reuse without coupling every screen directly to a third-party UI library.

This ADR defines the component layering strategy. It does not choose the concrete UI library yet.

---

## Decision

SkillMatch will use a layered component strategy with a design-system wrapper boundary.

A third-party UI component library may be used to accelerate MVP implementation, but widely used vendor components must be wrapped behind application-owned components before broad use.

Recommended conceptual layers:

```text
Third-Party UI Library Components
        ↓
Application UI Primitives
        ↓
Shared Product Components
        ↓
Feature / Workflow Components
        ↓
Pages / Routes
```

The goal is not to build a large custom design system before the product exists.

The goal is to create a stable boundary that supports reuse, consistency, accessibility, and future library changes.

---

## Component Layers

### Third-Party UI Library Components

These are components provided by the chosen UI library.

Examples:

* Button.
* Input.
* Select.
* Modal.
* Table.
* Alert.
* Tag.
* Card.

Rules:

* Product code should avoid importing vendor components directly for broadly used UI primitives.
* Vendor components may be used directly only in narrow, experimental, or one-off contexts.
* If a vendor component appears repeatedly across product areas, it should be wrapped.

---

### Application UI Primitives

Application UI primitives, also referred to as application UI wrappers, are thin wrappers over the selected UI library.

Examples:

* `AppButton`.
* `AppTextField`.
* `AppSelect`.
* `AppModal`.
* `AppTable`.
* `AppAlert`.
* `AppTag`.
* `AppCard`.
* `AppFormSection`.

Responsibilities:

* Normalize visual defaults.
* Centralize common accessibility behavior.
* Provide consistent loading, disabled, error, and empty states where appropriate.
* Integrate consistently with form and validation patterns.
* Hide vendor-specific APIs from most application code.

Rules:

* UI primitives must not know SkillMatch business concepts.
* UI primitives should remain small and composable.
* UI primitives should not become workflow components.
* UI primitives should expose only the API SkillMatch actually needs.

---

### Shared Product Components

Shared product components represent reusable SkillMatch concepts.

Examples:

* `StatusBadge`.
* `CompatibilityLabel`.
* `SkillTagList`.
* `ProjectSummaryCard`.
* `DeliverableStatusBadge`.
* `NotificationItem`.
* `ExternalUrlLink`.

Responsibilities:

* Represent product concepts consistently across areas.
* Centralize common labels, visual states, and display rules.
* Reuse application UI primitives.
* Avoid duplicating state presentation logic across pages.

Rules:

* Shared product components may know domain vocabulary.
* Shared product components should not own complete workflows.
* Shared product components should not directly enforce authorization.
* Shared product components should remain reusable across at least two product contexts or represent a truly cross-cutting concept.

---

### Feature / Workflow Components

Feature and workflow components live inside product areas.

Examples:

* `SubmitApplicationForm`.
* `ProjectEditorWorkflow`.
* `DeliverableReviewPanel`.
* `NgoVerificationReviewPanel`.
* `CertificateDownloadPanel`.

Responsibilities:

* Compose primitives and shared product components.
* Model feature-specific interactions.
* Connect UI to API-facing data access.
* Handle local UI state for forms, steps, filters, panels, and feedback.

Rules:

* Workflow-specific behavior belongs here, not in generic shared components.
* Feature components may depend on shared components and UI primitives.
* Shared components must not depend on feature components.
* Product areas should not leak internal workflow components into unrelated areas without deliberate extraction.

---

## Reuse Policy

SkillMatch should avoid speculative reuse.

Shared UI should be extracted from proven repetition or cross-product semantics, not from guesses about future needs.

Guidelines:

* Extract after the same pattern appears in multiple places or clearly represents a cross-cutting product concept.
* Prefer duplication of small, unstable UI fragments over premature generalization.
* Prefer shared components for stable concepts such as statuses, compatibility labels, skill tags, notifications, and external URL display.
* Avoid large configurable components that try to serve every product workflow.
* Components should become more generic only when real usage proves the abstraction.

---

## Vendor Coupling Policy

The selected UI library must not become the frontend architecture.

Rules:

* Pages and feature workflows should mostly consume application UI primitives and shared product components.
* Vendor-specific props should not spread throughout product code.
* Replacing the UI library should be expensive but possible, not a full product rewrite.
* Vendor styling conventions should be adapted through wrapper components and theme configuration where practical.
* The design-system wrapper layer should remain thin enough to maintain.

---

## Accessibility And Internationalization

The component strategy must support accessibility and internationalization from the beginning.

Requirements:

* Common interactive primitives should provide accessible defaults where possible.
* Status and compatibility components must not rely on color alone.
* Components that render user-facing text should receive translated text or translation keys through the established i18n approach.
* Shared components should make state meaning explicit and role-appropriate.
* Form components should support localized validation and help text.

---

## Consequences

Benefits:

* Improves UI consistency across product areas.
* Reduces accidental coupling to a third-party UI library.
* Supports future UI library changes better than direct vendor usage everywhere.
* Creates a clear path for reusable SkillMatch components.
* Helps centralize accessibility, loading, empty, disabled, and error states.
* Keeps product workflows separate from generic UI primitives.

Costs:

* Adds an extra layer of frontend code to maintain.
* Requires discipline to avoid wrapping everything too early.
* Requires review attention when deciding whether a component belongs in UI primitives, shared product components, or a feature area.
* Some vendor capabilities may need deliberate exposure through wrapper APIs.

---

## Rejected Alternative: Direct Vendor Components Everywhere

Using third-party components directly throughout the app would be faster at the beginning.

This is rejected for broad application use because it would:

* Couple product code to vendor APIs.
* Make future library changes much harder.
* Scatter visual and accessibility decisions across pages.
* Reduce consistency across product areas.
* Encourage each workflow to solve the same UI states differently.

Direct vendor usage is acceptable only for narrow, local, or experimental cases that do not establish app-wide patterns.

---

## Rejected Alternative: Full Custom Design System From Day One

Building a complete custom design system before implementation is not appropriate for the MVP.

This is rejected because it would:

* Delay product workflow implementation.
* Create abstractions before real UI needs are known.
* Increase maintenance cost without proven value.
* Risk producing generic components that do not fit actual product behavior.

SkillMatch should grow its design system incrementally from real product repetition.

---

## Rejected Alternative: Business-Aware UI Primitives

Putting SkillMatch-specific concepts into low-level UI primitives is rejected.

For example, `AppButton` should not know about project states, contributor roles, NGO verification, or deliverable actions.

Business concepts belong in shared product components or feature/workflow components.

This keeps primitive components stable, composable, and reusable.

---

## Review Triggers

This decision should be revisited if:

* Wrapper components become large and hard to maintain.
* Product teams repeatedly bypass wrappers to use vendor components directly.
* Shared components become a dumping ground for unrelated feature logic.
* UI implementation becomes slower because wrappers hide necessary vendor capabilities.
* The chosen UI library cannot support accessibility, theming, or workflow needs.
* A future design system requires stronger tokens, theming, documentation, or visual regression support.
