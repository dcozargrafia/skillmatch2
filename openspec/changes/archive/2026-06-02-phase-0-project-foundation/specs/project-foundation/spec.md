# Project Foundation Specification

## Purpose

Define the mandatory Phase 0 foundation so contributors can run, verify, and extend SkillMatch without re-deciding architecture, tooling, or boundaries.

## Traceability

| Source | Relevance |
|---|---|
| `specs/12-phase-0-project-foundation.md` | Phase 0 scope and exclusions |
| `specs/adr/0001`–`0010` | Baseline architecture and platform decisions |
| `specs/09-architecture.md` | Clean/Hexagonal and separability boundaries |
| `specs/10-non-functional-requirements.md` | Quality and operational expectations |

## Requirements

### Requirement: Monorepo Foundation And Workspace Contracts

The system MUST provide a monorepo foundation with explicit frontend/backend separation, shared package boundaries, and documented workspace commands for format, lint, typecheck, test, and build.

#### Scenario: Contributor validates repository foundation

- GIVEN a fresh clone of the repository
- WHEN the contributor follows documented setup and runs baseline workspace checks
- THEN the checks execute through documented commands
- AND the repository structure reflects separable `apps` and `packages` boundaries

#### Scenario: Boundary violation is introduced

- GIVEN frontend and backend code are intentionally separable by design
- WHEN a change introduces direct cross-import of backend internals into frontend (or inverse)
- THEN quality checks or review policy SHALL flag the violation

### Requirement: Application Skeletons Without Product Workflow Behavior

The system MUST provide backend and frontend skeletons aligned with accepted architecture, and MUST NOT implement product workflows during Phase 0.

#### Scenario: Skeletons are present and architecture-aligned

- GIVEN Phase 0 foundation is created
- WHEN a reviewer inspects backend and frontend structure
- THEN HTTP/framework concerns remain at boundaries and reusable UI/i18n areas are present
- AND no product workflow behavior is implemented

#### Scenario: Product workflow implementation is attempted in Phase 0

- GIVEN Phase 0 scope is foundation-only
- WHEN a change adds authentication behavior, profiles, projects, applications, deliverables, notifications, certificates, or admin workflows
- THEN the change MUST be rejected or deferred to a later phase

### Requirement: Testing And Quality Gate Readiness

The system MUST establish a behavior-focused testing baseline and actionable quality gates consistent with ADR 0005, without generating broad workflow test suites in Phase 0.

#### Scenario: Foundation quality gates are executed

- GIVEN the repository includes baseline quality gates
- WHEN maintainers run typecheck, test, and build gates
- THEN results are actionable and suitable for foundation verification

#### Scenario: Overscoped tests are proposed in Phase 0

- GIVEN Phase 0 only prepares test capability
- WHEN a change introduces extensive product workflow tests
- THEN review MUST require reduction to minimal smoke/foundation coverage

### Requirement: Environment Safety And Deployment Compatibility

The system MUST provide environment examples without secrets and SHOULD preserve Docker/Coolify-compatible assumptions for separated frontend/backend deployment.

#### Scenario: Environment files are reviewed

- GIVEN environment examples are added for local development
- WHEN a reviewer checks tracked configuration files
- THEN no secrets are committed
- AND variable intent is clear for local versus production configuration

#### Scenario: Local-only assumptions conflict with deployment model

- GIVEN deployment targets Axarnet VPS with Coolify-managed services
- WHEN a change introduces assumptions incompatible with containerized/separated app deployment
- THEN the change SHALL be revised before acceptance
