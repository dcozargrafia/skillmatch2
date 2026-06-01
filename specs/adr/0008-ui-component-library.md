# ADR 0008: UI Component Library

## Status

Accepted

## Context

SkillMatch needs a concrete UI component library before broad frontend implementation begins.

Previous decisions established:

* React + TypeScript + Vite as the frontend runtime.
* Product-area frontend architecture.
* Workflow-based UI.
* Layered component architecture.
* A design-system wrapper strategy that prevents direct vendor coupling across the app.

The UI library should accelerate MVP delivery while supporting future theming from the user interface.

A future version of SkillMatch may allow users to choose visual themes or theme presets. For example, a contributor may choose a theme based on a predefined color palette such as Geek Blue.

The selected library should therefore support design tokens, theme presets, runtime theme switching, and application-owned wrappers.

---

## Decision

SkillMatch will use Ant Design as the base React UI component library for the MVP.

Ant Design must be consumed through the design-system wrapper strategy defined in ADR 0007.

Product pages and workflow components should not broadly import Ant Design components directly.

The application should expose SkillMatch-owned components such as:

* `AppButton`.
* `AppTextField`.
* `AppSelect`.
* `AppModal`.
* `AppTable`.
* `AppAlert`.
* `AppTag`.
* `AppCard`.
* `StatusBadge`.
* `CompatibilityLabel`.
* `SkillTagList`.

Ant Design is the implementation detail underneath those components, not the product architecture.

---

## Why Ant Design

Ant Design is appropriate for SkillMatch because it provides:

* A broad React component set for forms, tables, modals, cards, alerts, tags, layouts, and feedback patterns.
* Strong fit for workflow-heavy application screens.
* TypeScript support.
* Vite compatibility.
* Internationalization support.
* Theme customization through design tokens.
* Preset theme algorithms such as default, dark, and compact.
* Component-level tokens for targeted customization.
* A documented color system with palettes such as Geek Blue.

This fits SkillMatch's need for fast MVP delivery while keeping a path toward user-selectable visual themes.

---

## Design Token Policy

SkillMatch should use design tokens as the main theming boundary.

Components should express visual intent through semantic app-level tokens or wrapper props, not raw colors scattered across product code.

Examples of app-level theme concepts:

* Primary action color.
* Success state color.
* Warning state color.
* Error state color.
* Info state color.
* Border radius.
* Spacing scale.
* Control height.
* Text size scale.
* Surface background.
* Focus outline.

These app-level concepts may be mapped to Ant Design global tokens and component tokens.

Example conceptual mapping:

```text
SkillMatch Theme Preset
        ↓
App Theme Tokens
        ↓
Ant Design ConfigProvider Theme
        ↓
Application UI Wrappers
        ↓
Product Components
```

The product should avoid hardcoding visual values such as specific hex colors in feature components.

---

## Runtime Theming Policy

SkillMatch should be designed so a future user-facing theme preference can be added without rewriting the UI component layer.

The MVP does not need to implement theme selection from the UI immediately.

However, the frontend should not block future support for:

* Light and dark theme variants.
* Preset color themes.
* Contributor-selected visual preferences.
* Accessibility-oriented themes such as higher contrast.

A future theme preference should work by selecting an application theme preset and applying it through the top-level theme provider.

Example future flow:

```text
User selects theme preference
        ↓
Preference is persisted
        ↓
Frontend loads selected theme preset
        ↓
Ant Design ConfigProvider receives mapped tokens
        ↓
Wrapped components update consistently
```

Theme selection must remain visual preference only. It must not affect permissions, workflow state, matching logic, certificate data, or business rules.

---

## Wrapper Requirement

Ant Design components should be wrapped before broad application use.

Rules:

* Common Ant Design primitives must be exposed through application-owned wrappers.
* Feature code should depend on wrapper APIs, not Ant Design-specific props by default.
* Ant Design static APIs or globally mounted feedback APIs must be wrapped if used.
* Shared product components should consume app wrappers and app theme semantics.
* Direct Ant Design imports are allowed only for narrow, local, or experimental cases.
* Repeated direct usage should trigger extraction into a wrapper.

This protects SkillMatch from vendor lock-in and keeps product code aligned with ADR 0007.

---

## Accessibility And Internationalization

Ant Design does not remove SkillMatch's responsibility for accessibility or internationalization.

Requirements:

* Wrappers must preserve accessible names, focus behavior, validation states, and keyboard behavior.
* Status and compatibility indicators must not rely on color alone.
* User-facing text must still flow through the SkillMatch i18n strategy.
* Ant Design locale support may be used, but product copy remains owned by SkillMatch translation resources.
* Theme presets must preserve readable contrast, especially for state labels and workflow actions.

---

## Consequences

Benefits:

* Fast MVP delivery with a mature component set.
* Strong support for workflow-heavy screens.
* Clear path toward token-based theme presets.
* Good fit for forms, tables, modals, alerts, tags, and admin surfaces.
* Reduced need to assemble many independent UI packages.
* Theme customization can be centralized through Ant Design tokens and SkillMatch wrappers.

Costs:

* Ant Design has a recognizable enterprise visual style that SkillMatch must intentionally soften where needed.
* Wrappers are required to prevent vendor APIs from spreading through the product.
* Runtime theming requires disciplined token mapping and contrast review.
* Some Ant Design APIs may need careful wrapping to preserve React context and theme behavior.
* The public and contributor experiences may need extra visual care to avoid feeling like an admin dashboard.

---

## Rejected Alternative: Mantine

Mantine is a strong React component library with good theming, color schemes, hooks, forms, and accessibility-oriented documentation.

It remains a good alternative.

It is not selected because SkillMatch's current preference gives extra weight to design-token-driven theming, predefined palette concepts, and enterprise workflow components.

Mantine may be reconsidered if Ant Design's visual style or wrapper cost becomes too heavy.

---

## Rejected Alternative: Material UI

Material UI is mature, widely used, well documented, and has strong theming support including CSS variables and color schemes.

It is not selected because Material Design has a strong visual identity that may be harder to separate from the SkillMatch product experience.

Material UI may be reconsidered if SkillMatch later prioritizes the largest React ecosystem, deeper Material Design alignment, or MUI-specific tooling.

---

## Rejected Alternative: Custom UI System Without Vendor Library

Building a custom UI component system from scratch is not appropriate for the MVP.

This is rejected because it would:

* Slow delivery.
* Increase accessibility and interaction maintenance burden.
* Require rebuilding common form, modal, table, and feedback behavior.
* Distract from validating SkillMatch's core collaboration workflows.

A custom visual identity can still evolve through SkillMatch wrappers and theme tokens.

---

## Review Triggers

This decision should be revisited if:

* Ant Design makes public or contributor experiences feel too enterprise/admin-oriented.
* Wrappers become too complex or leak too many vendor-specific props.
* Theme switching becomes difficult to implement cleanly.
* Accessibility review finds significant issues in required components.
* Runtime bundle size or styling behavior becomes a meaningful problem.
* Mantine, Material UI, or another library proves materially better for SkillMatch's implementation needs.
