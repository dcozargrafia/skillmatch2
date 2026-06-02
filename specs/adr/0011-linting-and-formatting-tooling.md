# ADR 0011: Linting And Formatting Tooling

## Status

Accepted

## Context

SkillMatch needs contributor-friendly quality gates for linting and formatting.

Phase 0 originally used Biome for both linting and formatting because it is fast, simple, and easy to configure. During foundation review, the team reconsidered that choice because ESLint is more common in TypeScript and React projects, has a broader ecosystem, and aligns better with tooling that expects ESLint-style linting.

The project still needs to avoid excessive configuration and rule churn while it remains in the foundation stage.

---

## Decision

SkillMatch will use:

| Concern       | Tool               |
| ------------- | ------------------ |
| Linting       | ESLint flat config |
| Formatting    | Prettier           |
| Type checking | TypeScript `tsc`   |

The root commands are the canonical quality gates:

```bash
pnpm format
pnpm lint
pnpm typecheck
```

The ESLint configuration should remain non-type-aware during Phase 0 unless a future implementation slice identifies a rule that justifies type-aware linting. TypeScript remains the authoritative type gate through `pnpm typecheck`.

---

## Rationale

ESLint and Prettier are more familiar to contributors and have stronger ecosystem support for React, TypeScript, editor integrations, and future custom rules.

Keeping linting and formatting as separate tools also keeps responsibilities clear:

- ESLint flags code-quality and framework-rule issues.
- Prettier normalizes formatting.
- TypeScript validates type correctness.

This avoids relying on a less common all-in-one tool while preserving simple commands for contributors and agents.

---

## Consequences

Positive:

- Contributors are more likely to recognize and understand the tooling.
- React and TypeScript linting can grow through the ESLint ecosystem as the product matures.
- RTK and other wrappers that expect ESLint-style linting are less surprising.

Negative:

- The project now has separate tools for linting and formatting.
- Dependency count increases compared with Biome.
- ESLint rule selection needs discipline to avoid noisy or low-value checks.

---

## Guardrails

- Do not enable broad type-aware ESLint rules without a documented reason.
- Do not add stylistic ESLint rules that duplicate Prettier.
- Prefer small rule additions tied to real project risks, framework constraints, or previously observed bugs.
- Keep `pnpm lint`, `pnpm format`, and `pnpm typecheck` documented as the canonical commands.
