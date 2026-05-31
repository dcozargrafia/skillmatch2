# 03-functional-requirements.md

# Functional Requirements

## Purpose

This document is the entry point for SkillMatch functional requirements.

Functional requirements are split into module documents to keep each section readable, reviewable, and maintainable.

This specification describes product behavior and business rules. It does not define technical architecture, database structure, API endpoints, UI layout, or implementation details.

---

## Scope

These requirements apply to the SkillMatch MVP unless explicitly marked as Post-MVP or out of scope.

The functional specification must remain consistent with:

* `00-product-brief.md`
* `01-scope-and-mvp.md`
* `02-roles-and-permissions.md`

The specification prioritizes:

* Impact First
* Skills Over Credentials
* Trust Over Restrictions
* Simplicity Over Complexity
* Guided Collaboration
* Micro-Projects First
* Inclusivity By Design
* Transparency And Accountability

---

## Global Business Rules

The following rules apply across the platform:

* Each account has exactly one operational role: Contributor, NGO, or Administrator.
* Guests may view public content but cannot perform actions that require identity, ownership, or accountability.
* NGOs must be verified before they can publish projects.
* Each project may be assigned to only one contributor.
* Projects must define at least one mandatory deliverable and may define optional deliverables.
* Project completion depends on approval of all mandatory deliverables.
* Contributors may apply to and participate in multiple projects at the same time.
* The platform should provide visibility into workload and activity rather than impose artificial participation limits.
* Skills must come from the centralized skills catalog managed by administrators.
* Communication must remain contextual to projects, applications, deliverables, notifications, and platform events.
* SkillMatch stores collaboration metadata, not project files.
* Deliverable submissions may include comments and optional external URLs.
* Critical workflow decisions require human action and must not be fully automated.
* Administrators are governance operators, not normal workflow participants.
* Reviews and ratings are Post-MVP.
* MVP public impact information may be basic and static; dashboard-style impact analytics are Post-MVP.


---

## Notifications And Activity History

Notifications and activity history are related but distinct concepts.

Notifications are for users who need to be informed about relevant events, especially events caused by another actor.

Activity history records that an event occurred and should include the actor who performed the action when relevant.

By default, the actor who performs an action does not need to receive a notification for that same action. The action must still be recorded in the relevant history or activity timeline.

This rule helps keep notifications useful while preserving accountability and traceability.

---

## Module Index

| Module | Status | Document |
| ------ | ------ | -------- |
| Project Lifecycle | Drafted, no open questions | `functional-requirements/01-project-lifecycle.md` |
| Deliverables | Drafted, no open questions | `functional-requirements/02-deliverables.md` |
| Applications And Assignment | Drafted, no open questions | `functional-requirements/03-applications-and-assignment.md` |
| NGO Verification | Drafted, no open questions | `functional-requirements/04-ngo-verification.md` |
| Authentication And Accounts | Drafted, no open questions | `functional-requirements/05-authentication-and-accounts.md` |
| Contributor Profiles | Pending | TBD |
| NGO Profiles | Pending | TBD |
| Skills Catalog | Pending | TBD |
| Project Discovery | Pending | TBD |
| Skill Matching | Pending | TBD |
| Collaboration Comments | Pending | TBD |
| Notifications | Pending | TBD |
| Certificates | Pending | TBD |
| Administration And Moderation | Pending | TBD |

---

## Working Rule

Each functional module should define:

* Purpose
* Ownership and permissions
* Business rules
* States and transitions, when relevant
* Visibility rules
* Notifications, when relevant
* Constraints
* Open questions

Module documents are part of the functional specification and have the same authority as this index document.
