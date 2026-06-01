# ADR 0005: Testing Strategy And Tooling

## Status

Accepted

## Context

SkillMatch needs a testing strategy before Phase 0 finalizes tooling and before workflow-heavy implementation begins.

The system has important business rules around:

* Account roles and authorization.
* NGO verification.
* Project publication constraints.
* Contributor applications and assignment.
* Deliverable submission, review, rejection, and resubmission.
* Project completion and certificate snapshots.
* Notifications and Activity Records.
* Administrative Actions and preserved reasons.

The project also needs to avoid AI-generated test bloat.

Previous AI-generated testing attempts in similar contexts produced very large test suites with hundreds of tests that did not necessarily improve confidence. SkillMatch needs tests that protect behavior, not tests that merely increase count.

---

## Decision

SkillMatch will use a risk-based, behavior-focused testing strategy.

Tests should assert observable behavior, business outcomes, contracts, and boundaries.

Tests should not assert implementation details unless the implementation detail is itself an explicit boundary contract.

Recommended tooling:

| Area | Tooling Decision |
| ---- | ---------------- |
| Primary test runner | Vitest |
| Backend domain/use-case tests | Vitest |
| Backend API tests | Vitest + Fastify inject |
| Contract tests | Vitest-based checks for shared frontend/backend API expectations |
| Persistence/integration tests | Vitest + Prisma + PostgreSQL test database |
| Frontend component/workflow tests | Vitest + React Testing Library |
| Accessibility-oriented component checks | React Testing Library with accessibility-focused assertions and optional axe tooling during implementation |
| End-to-end tests | Playwright for a small number of high-value journeys |

Tooling details may be refined during Phase 0, but the behavior-first policy is mandatory.

---

## Realistic Testing Pyramid

Most confidence should come from domain, application/use-case, API, contract, and integration tests.

End-to-end tests should validate only the most critical happy paths and cross-boundary workflows.

The intended confidence distribution is:

```text
Many focused domain/use-case/API/contract/integration tests
Some component and frontend workflow tests
Few high-value end-to-end tests
```

This is not a decorative testing pyramid. It is a cost-control and confidence strategy.

---

## Testing Philosophy

The core rule is:

```text
Test behavior, not implementation.
```

Good tests should answer:

* What user-visible or business-relevant behavior is protected?
* What regression would this test catch?
* Which specification rule does this test support?
* Is this the smallest useful layer for this risk?

Poor tests usually:

* Assert internal method calls without business value.
* Duplicate the same case across many layers.
* Test framework behavior.
* Test trivial property assignment.
* Overuse snapshots.
* Mock everything and verify mocks instead of outcomes.
* Fail after harmless refactors that preserve behavior.

If a test fails after an internal refactor that preserves behavior, the test was probably coupled to implementation.

---

## Testing Layers

Testing should use the smallest useful layer for each risk.

| Layer | Purpose | Examples |
| ----- | ------- | -------- |
| Domain tests | Validate business invariants without framework/database coupling. | Project completion requires approved mandatory deliverables. |
| Application/use-case tests | Validate workflow orchestration, authorization, side effects, and invalid transitions. | Assigning one contributor marks others Not Selected. |
| API tests | Validate request/response behavior, authorization, validation, and visibility. | NGO cannot view applications for another NGO's project. |
| Contract tests | Validate shared API expectations between frontend and backend. | Project list response exposes status, required skills, and public visibility fields. |
| Persistence/integration tests | Validate mappings, constraints, transactions, and persistence behavior. | Assignment uniqueness and certificate snapshot persistence. |
| Component tests | Validate reusable UI behavior and states. | CompatibilityLabel renders text, not only color. |
| Frontend workflow tests | Validate important UI flows within product areas. | Contributor submits application and sees confirmation state. |
| End-to-end tests | Validate a small number of critical complete journeys. | NGO publishes project, contributor applies, NGO assigns contributor. |

End-to-end tests are valuable but must remain limited and intentional.

---

## Test Value Policy

Every test should protect at least one of:

* A business rule.
* A permission or visibility boundary.
* A workflow state transition.
* A data integrity constraint.
* A previously fixed bug.
* A bug regression.
* An accessibility or i18n requirement.
* A public API contract.
* A high-value user journey.

Tests should not be added only to increase test count or line coverage.

---

## Spec-First Test Planning

Before implementing a feature, the developer or agent should identify:

* Behavior groups involved.
* Risks worth testing.
* The layer where each risk is cheapest to test.
* The minimum useful test set.

This planning should happen before generating large test suites.

---

## Test Budget Policy

Implementation slices should keep test volume proportional to risk.

Test count is a review signal, not a goal. A slice with 2 excellent tests may be better than 12 weak tests.

Guidelines:

| Slice Size | Expected Test Count |
| ---------- | ------------------- |
| Small slice | 3-8 focused tests. |
| Medium slice | 8-20 focused tests. |
| Large workflow slice | 20-40 focused tests, with justification. |

These are not hard limits, but they are review alarms.

If an implementation proposes substantially more tests than the guideline, the author or agent must explain:

* Which behavior groups are being protected.
* Why the volume is necessary.
* Why lower-layer tests cannot cover the same risk more efficiently.
* Which tests would be removed if the suite became too slow or noisy.

Large AI-generated test suites must not be accepted without review.

---

## AI Test Generation Guardrails

AI agents must not generate large test suites without first identifying behavior groups and risks.

Rules:

* Propose test groups before generating many tests.
* Each test group should map to a specification rule, business risk, or regression risk.
* Prefer behavior assertions over internal call assertions.
* Avoid testing getters, setters, constructors, simple DTOs, or framework wiring unless real logic exists.
* Avoid snapshots unless the UI output is intentionally stable and the snapshot has review value.
* Avoid duplicating the same scenario across unit, integration, and e2e layers unless the flow is critical.
* Prefer domain-language factories/builders over large generic fixtures.
* Mock only when it isolates a real boundary or avoids slow/unreliable infrastructure.
* Do not test that Fastify, React, Prisma, or the test framework itself works.
* If a test cannot explain what regression it prevents, it should not be added.

---

## Mocking Policy

Mocks should be used carefully.

Allowed uses:

* Replacing external infrastructure such as email, file rendering, or third-party services.
* Isolating repository ports in use-case tests.
* Verifying boundary interactions when the interaction is the intended behavior.
* Avoiding slow or flaky infrastructure in unit-level tests.

Avoid:

* Mocking every collaborator by default.
* Asserting internal calls when final observable state can be asserted.
* Creating tests that only prove mocks were called.
* Mocking domain rules instead of testing them.

Prefer outcome assertions when possible.

Example preferred assertion:

```text
Certificate record exists with the expected snapshot.
```

Less preferred unless boundary-specific:

```text
CertificateIssuer.issue was called once.
```

---

## Database Testing Policy

Persistence tests should use PostgreSQL when database behavior matters.

Requirements:

* Critical constraints should be tested against a real PostgreSQL test database where practical.
* Prisma repository adapters should be tested for mapping and transaction behavior where risk exists.
* Domain and application tests should not require a database when persistence is not the risk under test.
* Test data should be isolated and repeatable.
* Tests should avoid relying on execution order.

---

## End-To-End Testing Policy

End-to-end tests should be few and high value.

E2E tests should cover complete journeys that cannot be trusted from lower-level tests alone.

Candidate MVP E2E journeys:

* Contributor registration and profile setup.
* NGO verification, project publication, and public discovery.
* Contributor application and NGO assignment.
* Deliverable submission, review, project completion, and certificate availability.
* Notification read/archive without deleting activity history.

E2E tests should not be used to exhaustively test every validation branch or state transition.

---

## Required Critical Coverage

Critical behavior requiring focused coverage:

* Guests cannot access protected workflows.
* Disabled accounts cannot perform normal workflow actions.
* Contributors can apply without selected skills.
* Unverified NGOs cannot publish projects.
* Projects cannot be published without mandatory deliverables.
* Manual individual application rejection is not implemented.
* Assignment accepts one application and marks other submitted applications Not Selected.
* Only assigned contributors can submit deliverables.
* Rejected deliverables can be resubmitted.
* Project completion requires all mandatory deliverables approved.
* Certificate snapshots preserve issue-time display data.
* Notifications do not affect workflow state.
* Notification archive does not delete Activity Records.
* Administrative actions requiring reasons preserve those reasons.

---

## Bug Regression Policy

Every fixed bug must include at least one regression test at the lowest useful layer.

If a regression test is not practical, the fix must explain why and document the manual verification performed.

Regression tests should protect the bug's observable failure mode, not the incidental implementation detail that caused it.

---

## Review Triggers

This decision should be revisited if:

* Test suites become slow, noisy, or difficult to maintain.
* AI-generated tests repeatedly add low-value coverage.
* Refactors frequently break tests without changing behavior.
* E2E tests become the main source of confidence.
* Database tests become too expensive or fragile.
* Tooling does not support the monorepo structure effectively.
* Accessibility or i18n testing needs stronger dedicated tooling.
