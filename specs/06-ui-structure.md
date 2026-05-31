# 06-ui-structure.md

# UI Structure

## Purpose

This document defines the high-level user interface structure for SkillMatch.

The UI structure translates approved roles, functional requirements, domain model, and user flows into navigable product areas, page groups, and role-specific surfaces.

This is not a visual design system, wireframe set, component library, API contract, or implementation plan. Those decisions come later.

---

## UI Principles

SkillMatch UI should prioritize:

* Clear workflow progression over dense dashboards
* Role-specific navigation over generic feature menus
* Human decision support over automation theatre
* Simple state visibility over complex project-management views
* Contextual collaboration over chat-like communication
* Trust, traceability, and accountability without exposing private records

The UI must not make SkillMatch feel like a social network, job board, freelance marketplace, messaging app, file hosting platform, or full project-management tool.

---

## Top-Level Structure

| Area | Audience | Purpose |
| ---- | -------- | ------- |
| Public Site | Guests and all users | Explain SkillMatch and expose public projects, verified NGOs, and impact information. |
| Contributor Area | Contributors | Manage profile, discover projects, apply, collaborate, submit deliverables, and access certificates. |
| NGO Area | NGOs | Manage NGO profile, verification, projects, applications, collaboration, deliverables, and completed records. |
| Admin Area | Administrators | Perform governance, verification, catalog management, moderation, and operational review. |
| Shared Notification Area | Authenticated users | Review relevant workflow and governance notifications. |

---

## Public Site

### Purpose

The Public Site helps guests understand SkillMatch and decide whether to participate.

### Primary Surfaces

| Surface | Purpose |
| ------- | ------- |
| Home | Communicate mission, value proposition, and core call to action. |
| Project Discovery | Show public active projects open for applications. |
| Project Detail | Show public project information without private collaboration records. |
| Verified NGO Profile | Show public information for verified NGOs. |
| Impact Overview | Show public platform impact information when available. |
| Register / Login | Route users into Contributor or NGO account creation and authentication. |

### Rules

* Guests may browse public project discovery and public project details.
* Guests must register or log in before applying.
* Public project views must not expose applications, comments, deliverable submissions, internal reviews, administrative notes, or private contributor data.
* Completed projects may appear in public impact or completed-project contexts, but not in default active discovery.
* Archived projects must not appear in active public discovery.

---

## Contributor Area

### Purpose

The Contributor Area helps contributors find suitable projects, apply, collaborate, submit work, and access completion evidence.

### Primary Surfaces

| Surface | Purpose |
| ------- | ------- |
| Contributor Dashboard | Summarize active applications, assigned projects, deliverables needing attention, notifications, and certificates. |
| Contributor Profile | Manage display name, biography, optional website or portfolio URL, availability, selected skills, and proficiency levels. |
| Project Discovery | Browse, search, filter, and open public projects. |
| Project Detail | Understand project scope, NGO, deliverables, effort, target date, required skills when defined, and fit label when available. |
| Application Form | Submit an application message for a published project. |
| My Applications | Track submitted, withdrawn, accepted, and not-selected applications. |
| Assigned Project Workspace | View assigned project context, project comments, deliverables, and collaboration history. |
| Deliverable Detail | Submit work metadata through comments and optional external URLs. |
| Certificates | View and download own issued certificates. |
| Notifications | Review and archive relevant notifications. |

### Rules

* Contributor skills are optional for applying.
* Compatibility labels may guide contributors but must not block applications.
* Contributors cannot see other contributors' applications.
* Contributors cannot submit deliverables unless assigned to the project.
* Contributor collaboration stays contextual to assigned projects and deliverables.
* Certificate download belongs to the contributor.

---

## NGO Area

### Purpose

The NGO Area helps NGOs become verified, publish micro-projects, choose one contributor, review deliverables, and complete projects.

### Primary Surfaces

| Surface | Purpose |
| ------- | ------- |
| NGO Dashboard | Summarize verification state, project drafts, active projects, applications needing review, deliverables needing review, notifications, and completed projects. |
| NGO Profile | Manage NGO name, description, website or public reference URL, contact information, mission or cause area, and public profile information. |
| Verification Submission | Submit NGO information for administrator review and view verification status or feedback. |
| Project List | View own drafts, published projects, in-progress projects, completed projects, and archived projects. |
| Project Editor | Create and edit project title, description, deliverables, optional skills, estimated effort, and target completion date. |
| Project Detail / Owner View | Review project state, applications, assigned contributor, deliverables, comments, and history. |
| Application Review | Review submitted applications with messages, visible contributor profile data, availability, history when available, and compatibility labels. |
| Assigned Project Workspace | Collaborate with assigned contributor through project and deliverable comments. |
| Deliverable Review | Approve submitted deliverables or reject them with required feedback. |
| Completed Project Records | View completed projects and certificate records generated for those projects. |
| Notifications | Review and archive relevant notifications. |

### Rules

* Unverified NGOs may create drafts but must not publish projects.
* Restricted NGOs must not publish new projects.
* A project cannot be published without at least one mandatory deliverable.
* Manual individual application rejection is not supported in the MVP.
* NGOs assign exactly one contributor from submitted applications.
* Compatibility Assessment supports review but must not decide assignment.
* NGOs may view certificate records for their completed projects but cannot download contributor certificates in the MVP.

---

## Admin Area

### Purpose

The Admin Area supports exceptional governance and platform operation without replacing normal NGO/contributor workflows.

### Primary Surfaces

| Surface | Purpose |
| ------- | ------- |
| Admin Dashboard | Surface governance items needing attention, such as verification requests and moderation concerns. |
| NGO Verification Review | Approve or reject NGO verification requests with feedback. |
| NGO Governance | Restrict or restore NGOs and review relevant NGO/project context. |
| Account Governance | Disable or restore accounts for clear administrative reasons. |
| Contributor Governance | List and inspect contributor accounts and profiles for governance, moderation, support, or operational integrity. |
| Project Moderation | Hide, archive, or correct projects for governance reasons. |
| Comment Moderation | Hide or flag comments while preserving accountability. |
| Skills Catalog Management | Create, update, disable, restore, or archive skills and categories. |
| Certificate Administration | Review, revoke, or correct certificate records for clear administrative reasons. |
| Activity Records | Review important workflow and governance events. |
| Basic Metrics | Review minimal operational and impact indicators. |

### Rules

* Administrators are governance operators, not normal workflow participants.
* Admin UI must require reasons for actions that affect access, publication, discovery, moderation, certificates, or historical records.
* Admin contributor lists must not become a public contributor directory, talent search, or CRM.
* Admin UI must not encourage administrators to assign contributors, approve deliverables, complete projects, or generate certificates during normal operation.
* Administrative visibility should follow least privilege where possible.
* Administrative actions must preserve history.

---

## Shared Navigation Model

### Public Navigation

Public navigation should emphasize:

* Mission and impact
* Browse projects
* Verified NGOs or public organizations when available
* Register as Contributor
* Register as NGO
* Login

### Contributor Navigation

Contributor navigation should emphasize:

* Dashboard
* Discover Projects
* My Applications
* Assigned Projects
* Profile
* Certificates
* Notifications

### NGO Navigation

NGO navigation should emphasize:

* Dashboard
* NGO Profile / Verification
* Projects
* Applications
* Deliverables To Review
* Completed Projects
* Notifications

### Admin Navigation

Admin navigation should emphasize:

* Dashboard
* Verification Requests
* Users / Accounts
* Contributors
* NGOs
* Projects
* Skills Catalog
* Certificates
* Activity / Moderation

---

## Key Page Behaviors

### Project Discovery

Project Discovery should show active published projects by default.

It may support:

* Search by project text
* Filtering by skills when defined
* Filtering by cause or NGO-related metadata when available
* Sorting by recent, deadline, or relevance
* Clear indication that completed or archived projects are not open for applications

Discovery must not expose private applications, comments, deliverable submissions, or administrative records.

### Project Detail

Project Detail should adapt by viewer role and relationship.

| Viewer | Additional Access |
| ------ | ----------------- |
| Guest | Public project information and registration prompt to apply. |
| Contributor | Apply action when eligible, own fit label when available, own application state when applicable. |
| Assigned Contributor | Collaboration workspace, deliverables, submissions, and project comments. |
| Owning NGO | Owner controls, applications, deliverables, comments, and history. |
| Administrator | Governance visibility and moderation actions when needed. |

### Application Review

Application Review should help NGOs compare submitted applications without turning the platform into a ranking or hiring system.

It may show:

* Application message
* Contributor identity and visible profile information
* Availability
* Selected skills and proficiency levels when available
* Compatibility label and simple reasons when available
* Collaboration history when available

It must not:

* Automatically assign contributors
* Hide low-fit contributors
* Mark applications as not selected automatically
* Present compatibility as proof of ability
* Create bidding or negotiation behavior

### Deliverable Workspace

Deliverable Workspace should focus on expected work, submission metadata, review decision, and history.

It may show:

* Deliverable title, description, and requirement type
* Current deliverable state
* Submission comment and optional external URL
* Review outcome and feedback when rejected
* Deliverable-specific comments
* Submission and review history

It must not become a file hosting system or detailed task-management tool.

### Notifications

Notifications should be accessible from authenticated role areas.

Notification views should support:

* Unread and recent notifications
* Mark as read
* Archive or clear from active notification view
* Link to relevant context when authorized

Notification actions must not change underlying workflow state or delete activity records.

---

## State Visibility Guidelines

UI should make important states visible where users need to act.

| Domain Object | States To Surface |
| ------------- | ----------------- |
| NGO Verification | Unsubmitted, Pending Review, Verified, Rejected, Restricted |
| Project | Draft, Published, In Progress, Completed, Archived |
| Application | Submitted, Withdrawn, Accepted, Not Selected |
| Deliverable | Pending, Submitted, Approved, Rejected |
| Notification | Unread, Read, Archived |
| Certificate | Issued, Revoked |
| Skill | Active, Disabled, Archived in admin contexts |
| Account | Active, Disabled in admin contexts |

State labels should be clear and role-appropriate. They should explain what the user can do next, not only name the state.

---

## MVP UI Exclusions

The MVP UI must not include:

* Direct messaging inboxes
* Real-time chat rooms
* Follower or social graph features
* Public contributor directory
* Bidding, proposal pricing, or negotiation interfaces
* Multi-contributor team management views
* File upload libraries for project deliverables
* Kanban boards or full project-management workflows
* Reviews, ratings, endorsements, or reputation scores
* Public certificate verification pages
* Email notification preference management

---

## Review Checklist

Before this document is considered complete, verify that:

* Every primary user flow has a corresponding UI surface.
* Role-specific areas do not expose unauthorized private information.
* Contributor and NGO dashboards remain workflow-focused, not analytics-heavy.
* Compatibility Assessment is visible as assistive context, not a decision engine.
* Admin UI is governance-focused and exceptional, not a normal workflow shortcut.
* UI exclusions prevent scope creep into social, hiring, freelance, messaging, file hosting, or project-management territory.

---

## Open Questions

The following decisions must be resolved before this document is considered complete:

None.
