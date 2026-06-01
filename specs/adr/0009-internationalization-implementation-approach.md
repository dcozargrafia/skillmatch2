# ADR 0009: Internationalization Implementation Approach

## Status

Accepted

## Context

SkillMatch needs an internationalization implementation approach before broad frontend copy and reusable UI components are implemented.

The approved specifications require:

* Multiple languages from the beginning.
* No hardcoded user-facing frontend text except temporary development-only text.
* Translation resources separated by ownership and scope.
* Stable backend error codes for localized frontend messages.
* Locale-aware formatting for dates, times, numbers, and status labels.
* Shared components receiving translated content or translation keys from consumers.

The product should be trilingual from the start, with English, Spanish, and French as initial supported languages.

Technical artifacts such as source code identifiers, documentation, ADRs, commit messages, and developer-facing comments remain in English unless explicitly stated otherwise.

---

## Decision

SkillMatch will use `i18next` with `react-i18next` for frontend internationalization.

Initial supported languages:

| Language | Code | Role |
| -------- | ---- | ---- |
| English | `en` | Base/reference language and fallback language. |
| Spanish | `es` | Supported product language from day one. |
| French | `fr` | Supported product language from day one. |

English is the canonical reference language for translation keys and fallback behavior.

Spanish and French must be treated as first-class supported languages, not post-launch additions.

---

## Why i18next And react-i18next

`i18next` and `react-i18next` fit SkillMatch because they support:

* React integration through hooks and providers.
* Namespaces for splitting translation files by ownership.
* Runtime language switching.
* Fallback language behavior.
* TypeScript integration.
* Incremental loading of translation namespaces.
* A mature ecosystem and documentation.

This matches SkillMatch's product-area architecture and prevents a single large translation file from becoming an unmaintainable global dependency.

Reference guidance:

* [react-i18next multiple translation files](https://react.i18next.com/guides/multiple-translation-files).
* [i18next fallback](https://www.i18next.com/principles/fallback).
* [i18next TypeScript](https://www.i18next.com/overview/typescript).

---

## Translation Resource Ownership

Translation files should follow frontend ownership boundaries.

Recommended conceptual structure:

```text
locales/
  en/
    global.json
    navigation.json
    validation.json
    public.json
    contributor.json
    ngo.json
    admin.json
  es/
    global.json
    navigation.json
    validation.json
    public.json
    contributor.json
    ngo.json
    admin.json
  fr/
    global.json
    navigation.json
    validation.json
    public.json
    contributor.json
    ngo.json
    admin.json
```

Additional workflow-specific namespaces may be introduced when product areas become too large.

Examples:

```text
contributor-applications.json
ngo-project-editor.json
ngo-deliverable-review.json
admin-verification.json
```

Rules:

* `global` contains only truly shared product language.
* `navigation` contains route and layout navigation labels.
* `validation` contains reusable form and API error message mappings.
* Product-area namespaces belong to the owning area: `public`, `contributor`, `ngo`, and `admin`.
* Workflow/view namespaces should live close to the workflow or view that owns the copy when finer splitting becomes useful.
* Shared domain labels such as project states, application states, deliverable states, compatibility labels, notification states, and certificate states must remain consistent across languages.

---

## Translation Key Policy

Translation keys should describe product meaning, not visual placement.

Preferred:

```text
project.status.published
application.action.withdraw
certificate.download.action
ngoVerification.state.pendingReview
```

Avoid:

```text
blueButtonText
leftPanelTitle
modalText1
pageHeaderSubtitle2
```

Rules:

* Keys should be stable enough for reuse and review.
* Keys should not encode layout or styling decisions.
* User-facing text must not be hardcoded in reusable components or product views.
* Temporary development-only text must be removed before implementation is accepted.
* Shared components should receive translated content or translation keys from consumers rather than owning product-specific copy.

---

## Fallback Policy

English (`en`) is the fallback language.

If a Spanish or French translation is missing, the frontend may fall back to English during development and non-production use.

Production readiness should require translation completeness checks for supported languages where practical.

Rules:

* Missing translation keys should be visible during development.
* Supported languages should not silently ship with large untranslated areas.
* Fallback behavior is a safety net, not a substitute for translation completion.
* The application should avoid displaying raw keys to end users in production.

---

## Runtime Language Switching

SkillMatch should support runtime language switching.

The MVP may initially use a simple language selector and local browser persistence.

Future versions may persist language preference in the user account profile.

Rules:

* Language preference is a presentation preference only.
* Language selection must not affect authorization, workflow state, matching logic, certificates, or activity records.
* Backend business state should remain language-neutral.
* User-generated content is not automatically translated by the platform.

---

## Backend Error Localization

The backend should expose stable error codes or structured error identifiers for frontend localization.

The backend should not be responsible for returning fully localized UI copy in the MVP unless a later ADR changes this.

Example conceptual response:

```json
{
  "code": "PROJECT_PUBLISH_REQUIRES_VERIFIED_NGO",
  "message": "Project publication requires a verified NGO account."
}
```

Frontend behavior:

* Use the `code` to select localized UI copy.
* Treat backend `message` as developer/debug fallback, not final user-facing copy.
* Keep validation and API error mapping in translation-aware frontend boundaries.

This preserves stable API contracts while allowing the frontend to present localized guidance.

---

## Locale-Aware Formatting

SkillMatch should prepare for locale-aware formatting from the beginning.

This includes:

* Dates.
* Times.
* Relative dates when introduced.
* Numbers.
* Status labels.
* Validation messages.

Formatting should use platform internationalization APIs or compatible helpers through frontend boundaries, not ad hoc string concatenation in product components.

---

## Accessibility And Content Quality

Internationalization must preserve accessibility.

Rules:

* Accessible names, labels, descriptions, and validation messages must be translated.
* Status labels must remain understandable in all supported languages.
* Text expansion in Spanish and French must be considered in layouts.
* Icon-only actions must still have localized accessible labels.
* Theme or layout decisions must not depend on text existing only in English.

---

## Consequences

Benefits:

* Supports English, Spanish, and French from the beginning.
* Aligns translations with product-area ownership.
* Avoids a single global translation file becoming unmaintainable.
* Enables runtime language switching.
* Keeps backend API contracts language-neutral.
* Supports localized validation and error guidance.
* Reduces future retrofitting cost.

Costs:

* Every user-facing feature requires translation work in three languages.
* Implementation reviews must catch hardcoded copy.
* Translation key design requires discipline.
* Tests and QA must consider multiple languages where relevant.
* Some copy changes will require updating three locale files.

---

## Rejected Alternative: English-Only MVP With Later Localization

An English-only MVP is rejected because SkillMatch intends to support multiple languages from the beginning.

Adding localization later would likely require rewriting UI copy, validation messages, reusable components, and error handling boundaries.

---

## Rejected Alternative: One Large Translation File Per Language

One large file per language is rejected because it does not follow product-area ownership.

It would become harder to review, maintain, and split as the product grows.

Namespaces provide a better match for SkillMatch's product-area and workflow architecture.

---

## Rejected Alternative: Backend-Localized UI Copy For MVP

Returning fully localized UI copy from the backend is rejected for the MVP.

It would couple backend workflows to frontend presentation language and make UI copy ownership less clear.

The backend should expose stable codes and safe fallback messages. The frontend should own localized presentation.

---

## Rejected Alternative: FormatJS / React Intl

FormatJS and React Intl are powerful, especially for ICU message formatting, dates, numbers, and pluralization.

They are not selected because SkillMatch currently prioritizes namespace-based resource ownership, simple React integration, and incremental translation loading.

FormatJS may be reconsidered if future requirements demand more advanced ICU-first workflows or extraction tooling.

---

## Rejected Alternative: Lingui

Lingui is a strong i18n option with good developer experience and extraction workflows.

It is not selected because `i18next` and `react-i18next` provide a more direct fit for SkillMatch's namespace-based product-area architecture and fallback requirements.

Lingui may be reconsidered if extraction workflow or message catalog management becomes the dominant concern.

---

## Review Triggers

This decision should be revisited if:

* Translation files become difficult to maintain.
* Type-safe translation key support becomes too slow or too complex.
* Runtime language switching causes performance or loading issues.
* Backend error localization needs become more complex than frontend mapping can handle.
* Translation completeness cannot be checked reliably.
* ICU-heavy formatting requirements become central to the product.
