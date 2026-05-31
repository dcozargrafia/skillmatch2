# 11-sdd-execution-plan.md

# SDD Execution Plan

## Purpose

This document defines how SkillMatch should move from approved specification into implementation.

The execution plan translates the product specification, architecture, data model, API contract, and non-functional requirements into implementation phases, dependency order, acceptance expectations, testing responsibilities, ADR checkpoints, and AI-agent execution rules.

This is not a sprint plan, final project-management board, staffing plan, framework selection document, or deployment runbook. Those decisions come later or belong in ADRs and implementation tasks.

---

## Execution Principles

SkillMatch implementation should follow these principles:

* Specification is the source of truth.
* Build foundations before workflows.
* Build workflows before administrative convenience.
* Keep changes small, reviewable, and testable.
* Preserve product scope boundaries.
* Validate domain rules before optimizing UI polish.
* Use ADRs for meaningful technical decisions.
* Do not let framework convenience override architecture.

Implementation should not introduce behavior absent from the approved specification.

---

## Stack Decision Timing

Technology stack decisions should happen after the architecture and non-functional requirements are stable.

Before choosing stack, the project should have:

* Approved architecture.
* Approved non-functional requirements.
* Initial execution plan.
* ADR process available.
* Clear criteria for security, i18n, accessibility, testing, deployment, and contributor maintainability.

Stack choices should be captured as ADRs, not hidden in implementation commits.

Stack decisions should be evaluated against:

* Fit with the approved full-stack architecture.
* Ability to preserve backend Clean/Hexagonal boundaries.
* Ability to support product-area frontend organization.
* Internationalization support.
* Accessibility-friendly UI implementation.
* Testing support at domain, API, component, workflow, and e2e levels.
* Security and session-management requirements.
* Open-source contributor approachability.
* Deployment and operational simplicity.
* Long-term maintainability over short-term familiarity.

Likely early ADRs:

| ADR | Decision Area |
| --- | ------------- |
| Repository strategy | Whether SkillMatch implementation lives in one repository, separate frontend/backend repositories, or another structure. |
| Backend framework/runtime | How to implement the modular monolith and Clean/Hexagonal boundaries. |
| Frontend framework/runtime | How to implement product-area frontend, routing, i18n, and reusable components. |
| Database and persistence approach | How to persist the logical data model and enforce integrity. |
| Authentication/session approach | How accounts, login, password recovery, and secure sessions work. |
| UI component library/design system approach | Whether to use a UI library and how to wrap it. |
| Internationalization implementation approach | How translation resources, fallback language, and localized error handling are implemented. |
| Testing strategy/tooling | How domain, API, component, workflow, and e2e tests are implemented. |
| Deployment/hosting approach | How the MVP will be deployed and operated. |

---

## Implementation Phase Overview

Recommended implementation order:

| Phase | Focus | Purpose |
| ----- | ----- | ------- |
| 0 | Project foundation | Repository setup, tooling, quality gates, ADR baseline. |
| 1 | Core platform foundation | Authentication, accounts, roles, authorization, base layouts/API foundations. |
| 2 | Profile and catalog foundation | Contributor profiles, NGO profiles, NGO verification, skills catalog. |
| 3 | Project publication foundation | Project drafts, deliverables, required skills, publication constraints. |
| 4 | Discovery and applications | Public discovery, application submission, withdrawal, compatibility labels. |
| 5 | Assignment and collaboration | One-contributor assignment, project workspace, contextual comments. |
| 6 | Deliverable workflow | Submissions, reviews, approval/rejection, resubmission. |
| 7 | Completion and certificates | Completion rules, certificate issuance, certificate snapshot, contributor download. |
| 8 | Notifications and activity | In-platform notifications, read/archive, activity records, traceability. |
| 9 | Administration and governance | NGO verification review, skills governance, moderation, account/contributor governance. |
| 10 | Hardening and release readiness | Accessibility, i18n, security review, reliability, production readiness. |

Phases may be split further into small implementation tasks or PRs.

---

## Phase Dependency Rules

Implementation phases are ordered by dependency, but some work can be prepared earlier when it does not violate business workflow dependencies.

Rules:

* Phase 0 must happen before implementation structure is finalized.
* Phase 1 must happen before protected product workflows.
* Phase 2 must happen before project publication, because projects depend on verified NGOs and catalog skills.
* Phase 3 must happen before discovery and applications, because only published projects can be discovered and applied to.
* Phase 4 must happen before assignment, because assignment depends on submitted applications.
* Phase 5 must happen before deliverable submission, because only assigned contributors can submit deliverables.
* Phase 6 must happen before completion and certificates, because completion depends on approved mandatory deliverables.
* Phase 7 must happen before full certificate administration, because administration should manage real certificate records.
* Phase 8 can be introduced incrementally after the first workflow events exist, but notification state must never drive workflow state.
* Phase 9 may start with NGO verification review earlier because Phase 2 needs it, but broader admin governance should not bypass normal workflows.
* Phase 10 is continuous hardening but should become a formal release gate before production launch.

---

## Phase 0: Project Foundation

### Goal

Create the technical foundation needed to implement SkillMatch safely and consistently.

### Includes

* Repository strategy ADR.
* Repository structure aligned with architecture.
* Basic development tooling.
* Formatting and linting.
* Test runner setup.
* ADR directory and template.
* Environment configuration approach.
* Initial CI quality checks when appropriate.
* Documentation for local setup.

### Acceptance Criteria

* Repository strategy is explicitly decided before implementation structure is finalized.
* New contributors can run the project locally from documented steps.
* Tests can be executed with one documented command.
* Formatting/linting rules are automated or documented.
* ADR process exists before major stack decisions are finalized.
* Required early ADRs are created or explicitly deferred with reasons.

---

## Phase 1: Core Platform Foundation

### Goal

Implement identity, account state, roles, and authorization foundations before product workflows depend on them.

### Includes

* Account registration for Contributor and NGO.
* Login/logout.
* Password recovery foundation.
* Account states: Active, Disabled.
* Single-role account model.
* Administrator account provisioning approach.
* Backend-enforced authorization checks.
* Current account/session endpoint or equivalent.
* Initial role-aware frontend layouts.

### Acceptance Criteria

* Guests cannot access protected areas.
* Disabled accounts cannot perform normal authenticated workflows.
* Guests cannot self-register as administrators.
* Role-specific areas are protected by backend authorization, not only frontend routing.
* Authorization tests cover role and account state failures.

---

## Phase 2: Profile And Catalog Foundation

### Goal

Implement the profile and skill data needed before projects and matching can work.

### Includes

* Contributor Profile.
* Optional contributor skills and proficiency levels.
* Optional contributor website/portfolio URL.
* NGO Profile.
* NGO Verification submission and state.
* Admin review for NGO Verification.
* Minimal admin surface for NGO verification review.
* Skills Catalog management.

### Acceptance Criteria

* Contributors can have no skills and still remain valid accounts.
* Contributor skills must reference active catalog skills.
* NGOs cannot publish projects until verified.
* Rejected NGOs can resubmit verification.
* Restricted NGOs cannot publish new projects.
* Profile edits do not rewrite historical records.

---

## Phase 3: Project Publication Foundation

### Goal

Implement NGO project creation and publication constraints.

### Includes

* Project drafts.
* Project editor foundation.
* Mandatory and optional deliverable definitions.
* Required project skills.
* Estimated effort and target completion date.
* Publish project transition.
* Archive project transition.

### Acceptance Criteria

* Only verified NGOs can publish projects.
* A project cannot be published without at least one mandatory deliverable.
* Project assets are represented by metadata and external URLs only when submitted later.
* Draft projects are not publicly discoverable.
* Archived projects are excluded from active discovery.

---

## Phase 4: Discovery And Applications

### Goal

Allow contributors to find projects and apply without introducing marketplace or job-board behavior.

### Includes

* Public project discovery.
* Project detail views.
* Contributor project discovery.
* Application submission.
* Application withdrawal.
* My Applications.
* NGO application review list.
* Compatibility Assessment labels.

### Acceptance Criteria

* Guests can browse public published projects but cannot apply.
* Contributors can apply even without selected skills.
* Compatibility labels guide but do not block applications.
* Compatibility does not automatically accept, reject, hide, block, or assign contributors.
* Applications use Submitted, Withdrawn, Accepted, and Not Selected states only.
* Manual individual application rejection is not implemented.

---

## Phase 5: Assignment And Collaboration

### Goal

Support one-contributor assignment and contextual collaboration.

### Includes

* NGO assignment from submitted applications.
* Accepted Application state.
* Not Selected outcome for other submitted applications.
* Assignment record.
* Project transition to In Progress.
* Assigned project workspace.
* Project and deliverable comments.

### Acceptance Criteria

* Each project can have only one assigned contributor.
* Assignment is a human NGO decision, not an automated compatibility decision.
* Other submitted applications become Not Selected after assignment.
* Contributors cannot see other contributors' applications.
* Comments remain contextual and do not become direct messaging or real-time chat.

---

## Phase 6: Deliverable Workflow

### Goal

Implement delivery and review of project outcomes.

### Includes

* Deliverable detail.
* Deliverable submission comments.
* Optional external URLs.
* NGO review.
* Deliverable approval.
* Deliverable rejection with feedback.
* Deliverable resubmission.

### Acceptance Criteria

* Only assigned contributors can submit deliverables.
* SkillMatch does not host uploaded project files.
* NGOs can approve or reject submitted deliverables with feedback.
* Rejected deliverables may be resubmitted while the project remains In Progress.
* Optional deliverables do not block project completion.

---

## Phase 7: Completion And Certificates

### Goal

Complete projects and generate contributor-owned completion evidence.

### Includes

* Completion eligibility checks.
* Project completion transition.
* Certificate issuance.
* Certificate Snapshot.
* Contributor certificate list.
* Contributor certificate download.
* NGO certificate record visibility.
* Certificate revocation through administration when needed.

### Acceptance Criteria

* Project completion requires all mandatory deliverables to be approved.
* Certificates are generated only from valid project completion.
* Certificate snapshots preserve issue-time display data.
* Contributors can download their own certificates.
* NGOs can view certificate records for their completed projects but cannot download contributor certificates in the MVP.
* Public certificate verification is not implemented in the MVP.

---

## Phase 8: Notifications And Activity

### Goal

Add awareness and traceability around important workflow events.

### Includes

* In-platform notifications.
* Notification read/archive state.
* Notification context navigation.
* Activity Records for important workflow events.
* Activity hooks added to previously implemented workflow transitions.
* Activity Records for governance events.

### Acceptance Criteria

* Notifications are recipient-specific.
* Notification state does not affect workflow state.
* Reading or archiving notifications does not delete Activity Records.
* Notifications do not expose unauthorized private information.
* Email notifications are not required for the MVP.
* Activity Records remain distinct from Notifications.

---

## Phase 9: Administration And Governance

### Goal

Implement administrative capabilities needed for trust, safety, and operational integrity.

### Includes

* Admin dashboard.
* NGO verification review.
* NGO restriction/restoration.
* Skills catalog governance.
* Account governance.
* Contributor governance list and detail.
* Project moderation.
* Comment moderation.
* Certificate administration.
* Administrative Actions.

### Acceptance Criteria

* Administrators are governance operators, not normal workflow participants.
* Admin contributor lists do not become public contributor discovery, talent search, CRM, or assignment assistance.
* Administrative actions affecting access, publication, visibility, comments, certificates, or history require preserved reasons.
* Admin interventions preserve history.
* Admins do not assign contributors, approve deliverables, complete projects, or generate certificates during normal operation.

---

## Phase 10: Hardening And Release Readiness

### Goal

Prepare the MVP for safe release.

### Includes

* Accessibility review.
* Internationalization review.
* Security review.
* Authorization review.
* Privacy/data exposure review.
* Reliability and idempotency review.
* Performance review of core workflows.
* Backup and recovery plan.
* Deployment and rollback plan.
* Production configuration review.

### Acceptance Criteria

* Core workflows meet agreed accessibility target.
* User-facing text follows i18n architecture.
* Critical workflow tests pass.
* Authorization tests cover sensitive operations.
* No MVP scope exclusions are violated.
* Backup, restore, deployment, rollback, and admin provisioning are documented before production launch.
* Phase 10 is treated as a release gate before production launch.

---

## Cross-Phase Testing Expectations

Testing should follow the non-functional requirements.

Minimum expectations:

* Domain rules tested near the domain/application layer.
* Use cases tested for valid and invalid transitions.
* API endpoints tested for authorization and visibility.
* Frontend workflows tested for critical user journeys.
* Reusable components tested for important accessibility and state behavior.
* End-to-end tests reserved for high-value complete flows.

Critical flows should not rely only on manual testing.

### Testing Gate Rules

Every implementation slice should define its verification path before it is considered complete.

Rules:

* Behavior changes require tests at the smallest useful layer.
* Authorization-sensitive changes require explicit allowed and forbidden case coverage.
* Workflow state changes require valid and invalid transition coverage.
* Frontend workflow changes require at least component, workflow, or equivalent user-facing verification.
* Accessibility-impacting shared component changes require accessibility-oriented verification where tooling allows.
* If an automated test is not practical yet, the implementation note must explain why and describe manual verification.
* No phase should be considered complete if critical flows rely only on manual testing.

---

## ADR Checkpoints

ADRs should be created before or during implementation when decisions materially affect architecture, maintainability, or operation.

Required ADR areas:

* Repository strategy.
* Backend framework/runtime.
* Frontend framework/runtime.
* Database and persistence approach.
* Authentication/session strategy.
* UI component library and design system wrapper strategy.
* Internationalization implementation approach.
* Testing tooling and strategy.
* Deployment/hosting approach.

ADRs should state context, decision, consequences, rejected alternatives, and review triggers.

### ADR Timing

Not every ADR blocks the same phase.

| ADR Area | Timing | Blocks |
| -------- | ------ | ------ |
| Repository strategy | Before Phase 0 structure is finalized. | Repository layout, CI shape, local development structure. |
| Backend framework/runtime | Before Phase 1 backend implementation. | Accounts, authorization, API, backend module layout. |
| Frontend framework/runtime | Before Phase 1 frontend implementation. | Routing, layouts, i18n integration, component architecture. |
| Database and persistence approach | Before persistent domain entities are implemented. | Accounts, profiles, projects, workflow records. |
| Authentication/session strategy | Before Phase 1 authentication implementation. | Login, logout, password recovery, protected endpoints. |
| UI component library/design system wrapper strategy | Before broad frontend UI implementation. | Shared UI primitives and reusable components. |
| Internationalization implementation approach | Before broad frontend copy is implemented. | Translation resource structure and localized messages. |
| Testing tooling and strategy | During Phase 0, before workflow-heavy implementation. | Quality gates and implementation acceptance. |
| Deployment/hosting approach | Before production readiness work. | Release, configuration, backup, rollback, operations. |

### ADR Quality Criteria

Each ADR should include:

* Context and problem.
* Decision.
* Consequences and tradeoffs.
* Rejected alternatives.
* How the decision supports architecture and NFRs.
* Review triggers that would justify revisiting the decision.

ADR decisions should not be made only because a tool is familiar or popular.

---

## AI Agent Execution Rules

AI agents working on SkillMatch must follow the specification.

### Required Context Before Implementation

Before changing code, an agent should identify and read the relevant source-of-truth documents for the task.

Minimum context rules:

* Product or scope-sensitive work requires `00-product-brief.md` and `01-scope-and-mvp.md`.
* Permission-sensitive work requires `02-roles-and-permissions.md`.
* Workflow work requires the relevant functional requirement module, `04-domain-model.md`, and `05-user-flows.md`.
* UI work requires `06-ui-structure.md`, `09-architecture.md`, and relevant NFR sections.
* API work requires `07-api-spec.md`, `08-data-model.md`, and relevant NFR sections.
* Architecture or tooling work requires `09-architecture.md`, `10-non-functional-requirements.md`, and relevant ADRs.

Rules:

* Read relevant specs before implementation.
* Do not invent behavior missing from the specification.
* Keep changes small and reviewable.
* Update specs or ADRs when implementation reveals a real decision gap.
* Preserve approved terminology.
* Do not introduce post-MVP features as implementation shortcuts.
* Do not bypass architecture boundaries for framework convenience.
* Include tests with behavior changes where relevant.
* Use conventional commits.
* Never add AI attribution or co-author metadata to commits.

### Agent Stop Conditions

Agents should stop and request a human decision when:

* The implementation requires behavior not defined in the specification.
* Existing specs conflict.
* A required ADR has not been decided.
* A stack, framework, persistence, authentication, deployment, or repository decision is needed.
* The simplest implementation would violate architecture boundaries.
* The task appears to introduce post-MVP behavior.
* Security, privacy, certificate, administrative action, or data retention behavior is ambiguous.

### Agent Output Expectations

Implementation agents should report:

* Specs and ADRs consulted.
* Files changed.
* Behavior implemented.
* Tests or verification performed.
* Any unresolved decisions or risks.
* Whether specs or ADRs were updated.

---

## Execution Review Checklist

Before implementation begins, confirm:

* Stack decisions are captured through ADRs.
* Foundation phase can be implemented before business workflows.
* Workflow phases follow domain dependencies.
* Testing expectations are clear for each phase.
* MVP exclusions remain explicit.
* Admin/governance work is not used to bypass normal workflows.
* Release readiness includes security, accessibility, i18n, reliability, and operations.
* Phase 10 is treated as a release gate, not optional polish.
