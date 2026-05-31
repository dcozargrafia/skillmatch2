# ADR 0001: Repository Strategy

## Status

Accepted

## Context

SkillMatch is moving from specification into implementation.

The project needs a repository strategy before Phase 0 can finalize implementation structure, tooling, CI, local development, and contribution workflow.

The main options are:

* A single repository / monorepo containing specifications, frontend, backend, shared packages, ADRs, and tooling.
* Separate repositories for frontend and backend.
* A specs-only repository plus separate implementation repositories.

SkillMatch MVP has strong reasons for keeping specification, frontend, backend, shared contracts, and implementation planning close together:

* The project follows Specification Driven Development.
* Frontend and backend contracts will evolve together during MVP implementation.
* Changes should be reviewable as coherent product/workflow units.
* The project should remain approachable for open-source contributors.
* AI agents should be able to consult specs, ADRs, frontend, backend, and tests in one place.

At the same time, the repository structure must not create unnecessary coupling between frontend and backend internals.

---

## Decision

SkillMatch will use a single repository / monorepo for the MVP.

The monorepo must be designed with separability in mind.

Frontend, backend, shared contracts, shared UI packages, configuration, specifications, and ADRs should have clear boundaries so they could be separated later if there is a justified need.

Conceptual structure:

```text
apps/
  web/
  api/

packages/
  shared-contracts/
  ui/
  config/

specs/
  adr/
```

The exact folder structure may be refined during Phase 0, but the dependency direction must remain clear.

---

## Dependency Rules

The monorepo must not become an excuse for uncontrolled coupling.

Rules:

* Frontend code must not depend on backend internals.
* Backend code must not depend on frontend internals.
* Shared packages must not depend on application packages.
* Shared contracts may be used by frontend and backend.
* Shared UI packages may be used by frontend but not backend.
* Specs and ADRs remain source-of-truth documentation, not runtime dependencies.
* Build and test tooling should support scoped execution where practical.

---

## Consequences

### Benefits

* Atomic product changes across specs, backend, frontend, and tests.
* Simpler SDD workflow.
* Easier onboarding for early contributors.
* Easier AI-agent execution because relevant context is colocated.
* Centralized ADRs and documentation.
* Shared contracts can evolve without cross-repository coordination overhead.
* CI and quality gates can start simple and become scoped later.

### Tradeoffs

* Repository boundaries must be actively enforced.
* CI may become slower if scoped execution is not introduced as the project grows.
* Deployment workflows may need careful configuration if frontend and backend deploy separately.
* Future extraction into separate repositories may require migration work.

### Risks

The main risk is allowing monorepo convenience to create hidden coupling.

This risk should be mitigated through clear app/package boundaries, dependency rules, review discipline, and tooling where practical.

---

## Rejected Alternatives

### Separate frontend and backend repositories

Rejected for the MVP.

This would provide clear separation, but it would increase coordination cost too early. It would make cross-cutting product changes, shared contracts, documentation updates, and AI-agent execution more cumbersome before the product has implementation maturity.

### Specs-only repository plus implementation repositories

Rejected for the MVP.

This would keep the specification isolated, but it would weaken the SDD workflow by separating implementation changes from the source-of-truth documents they must follow.

---

## Review Triggers

This decision should be revisited if:

* Frontend and backend need independent release ownership.
* Different teams own frontend and backend independently.
* CI becomes too slow or difficult to scope.
* Deployment workflows become significantly constrained by the monorepo.
* Shared packages create accidental coupling instead of controlled reuse.
* Open-source contribution experience becomes harder rather than easier.
