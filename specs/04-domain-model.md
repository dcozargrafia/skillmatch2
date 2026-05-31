# 04-domain-model.md

# Domain Model

## Purpose

This document defines the conceptual domain model for SkillMatch.

The domain model translates the functional requirements into business concepts, relationships, states, and invariants.

This is not a database model, API schema, UI structure, or implementation design. Those decisions come later.

---

## Domain Boundaries

SkillMatch is centered around structured collaboration between digital contributors and NGOs through technology micro-projects.

The core domain includes:

* Identity and roles
* Profiles
* NGO verification
* Skills catalog
* Projects
* Applications
* Assignment
* Deliverables
* Collaboration comments
* Notifications
* Certificates
* Administration and moderation

The domain intentionally excludes:

* General social networking
* Freelance marketplace behavior
* Job marketplace behavior
* General-purpose messaging
* Project file hosting
* Full project-management workflows
* Multi-contributor project execution

---

## Core Concepts

| Concept | Meaning |
| ------- | ------- |
| Account | A registered identity with exactly one operational role. |
| Contributor Profile | The contributor-facing profile containing skills, availability, and collaboration history. |
| NGO Profile | The organization profile used for verification, trust, publication, and public visibility. |
| Skill | A centrally managed digital skill used by profiles, projects, discovery, and matching. |
| Project | A micro-project owned by one NGO and structured around deliverables. |
| Application | A contributor's request to participate in a published project. |
| Assignment | The selection of one contributor for one project. |
| Deliverable | A required or optional unit of work used to determine project progress and completion. |
| Deliverable Submission | A contributor's submitted work metadata for a deliverable. |
| Collaboration Comment | A contextual, append-only communication record tied to a project or deliverable. |
| Notification | A recipient-specific awareness item tied to a relevant event or context. |
| Certificate | Evidence that a contributor completed a valid SkillMatch project workflow. |
| Activity Record | A traceability record that an important event occurred. |
| Administrative Action | A governance intervention performed by an administrator for a clear reason. |

---

## Account Model

An Account represents an authenticated user identity.

Each Account has exactly one operational role:

| Role | Meaning |
| ---- | ------- |
| Contributor | A person who applies to and contributes to projects. |
| NGO | An organization account that owns projects. |
| Administrator | A governance operator responsible for trust, safety, and platform operations. |

Guest is not an Account role. Guest represents an unauthenticated access state.

### Account States

| State | Meaning |
| ----- | ------- |
| Active | The account may log in and use allowed platform features. |
| Disabled | The account is blocked from normal platform use by administrative action. |

### Account Invariants

* An Account has exactly one operational role.
* Guests do not have persisted accounts.
* Guests may register as Contributor or NGO.
* Guests must not self-register as Administrator.
* Disabled accounts must preserve historical records.

---

## Profile Model

Profiles contain role-specific information.

| Profile | Owner | Purpose |
| ------- | ----- | ------- |
| Contributor Profile | Contributor Account | Supports project matching, NGO review, availability, and collaboration history. |
| NGO Profile | NGO Account | Supports NGO verification, public trust, and project publication. |

### Contributor Profile

A Contributor Profile may include:

* Display name
* Biography
* Optional website or portfolio URL
* Selected skills
* Skill proficiency levels for selected skills
* Availability information
* Collaboration history
* Certificates earned

Contributor skills are optional for application eligibility.

If contributor skills are selected, they must come from the Skills Catalog.

### NGO Profile

An NGO Profile may include:

* NGO name
* NGO description
* Website or public reference URL
* Contact information
* Mission or cause area
* Verification status
* Basic completed-project history when public and verified

NGO public visibility depends on verification status.

### Profile Invariants

* Contributor Profiles belong only to Contributor Accounts.
* NGO Profiles belong only to NGO Accounts.
* Profile edits must not rewrite historical workflow records.
* Public Contributor Profiles are Post-MVP unless explicitly introduced later.
* Public NGO Profiles are available only for verified NGOs by default.

---

## NGO Verification Model

NGO Verification determines whether an NGO may publish projects.

Verification is a human administrative decision.

### NGO Verification States

| State | Meaning |
| ----- | ------- |
| Unsubmitted | The NGO profile exists but has not been submitted for verification. |
| Pending Review | The NGO submitted its profile and awaits administrator review. |
| Verified | The NGO was approved and may publish projects. |
| Rejected | The NGO verification request was rejected with administrator feedback. |
| Restricted | The NGO was previously verified but has limited publishing ability due to administrative action. |

### NGO Verification Invariants

* Only verified NGOs may publish projects.
* Rejected NGOs may resubmit after addressing feedback.
* Restricted NGOs must not publish new projects.
* Published projects owned by restricted NGOs must be removed from applicant-facing discovery while restricted.
* Existing in-progress projects owned by restricted NGOs require administrative review before additional action.
* Verification history and administrative reasons must be preserved.

---

## Skills Catalog Model

The Skills Catalog is the controlled vocabulary for digital skills.

Skills support profiles, project requirements, discovery, and matching.

### Skill

A Skill may include:

* Name
* Category
* Status
* Optional description

### Skill States

| State | Meaning |
| ----- | ------- |
| Active | The skill can be selected for profiles and project requirements. |
| Disabled | The skill remains in history but cannot be newly selected. |
| Archived | The skill is hidden from normal selection but retained for history. |

### Skill Proficiency Levels

Contributor skill levels are self-declared in the MVP.

Recommended levels:

| Level | Meaning |
| ----- | ------- |
| Beginner | Can contribute with guidance on simple tasks. |
| Intermediate | Can work independently on common tasks. |
| Advanced | Can handle complex tasks and guide decisions. |

### Skills Catalog Invariants

* Only administrators manage the catalog.
* Contributors and NGOs cannot create arbitrary skills.
* Contributors are not required to select a skill before applying.
* NGOs are not required to define project skills before publishing.
* When selected, skills must come from active catalog skills.
* Disabled or archived skills must remain understandable in historical records.

---

## Project Model

A Project is the central unit of collaboration.

Each Project is a focused micro-project owned by exactly one NGO.

### Project Core Fields

A Project may include:

* Title
* Description
* Owning NGO
* Required skills, when defined
* Mandatory and optional deliverables
* Estimated effort
* Target completion date
* Publication state

### Project States

| State | Meaning |
| ----- | ------- |
| Draft | The project is being prepared and is not publicly visible. |
| Published | The project is publicly visible and open for applications. |
| In Progress | One contributor has been assigned and collaboration is active. |
| Completed | All mandatory deliverables were approved and the project was completed. |
| Archived | The project is removed from active workflows but retained for history. |

### Project Invariants

* A Project is owned by exactly one NGO.
* A Project may be assigned to only one Contributor.
* A Project cannot be published by an unverified NGO.
* A Project cannot be published without at least one mandatory deliverable.
* Required skills are optional.
* Draft projects cannot receive applications.
* In-progress projects cannot receive new applications.
* Completed projects cannot receive applications or normal deliverable submissions.
* Archived projects cannot receive applications or deliverable submissions.
* Completed projects may be public but must not appear in default active discovery.

---

## Application And Assignment Model

An Application represents a contributor's request to participate in a published project.

An Assignment is the result of the owning NGO selecting exactly one application for the project.

### Application States

| State | Meaning |
| ----- | ------- |
| Submitted | The contributor applied and awaits NGO decision. |
| Withdrawn | The contributor withdrew before assignment. |
| Accepted | The NGO selected this contributor and the project moved to in progress. |
| Rejected | The NGO rejected the application before assigning a contributor. |
| Not Selected | Another contributor was assigned to the project. |

### Application Invariants

* Only Contributors may apply to projects.
* Contributors may apply only to published projects open for applications.
* Application messages are required in the MVP.
* Contributors may withdraw before assignment.
* Contributors may reapply after withdrawal while the project remains published.
* NGOs may reject submitted applications before assignment.
* Application rejection messages are optional in the MVP.

### Assignment Invariants

* Each Project may have only one assigned Contributor.
* Assignment is a human decision made by the owning NGO.
* Assignment immediately moves the Project to In Progress.
* The selected Application becomes Accepted.
* Other submitted Applications become Not Selected.
* Assignment must not be automated by compatibility matching.

---

## Deliverable Model

A Deliverable defines expected work for a Project.

Deliverables may be mandatory or optional.

A Deliverable definition should include:

* Title
* Description
* Requirement type, either mandatory or optional

A Deliverable also has a review state that represents where it is in the delivery workflow.

The definition explains what must be produced. The state explains what has happened to it.

### Deliverable States

| State | Meaning |
| ----- | ------- |
| Pending | The deliverable exists but has not been submitted for review. |
| Submitted | The assigned contributor submitted work for NGO review. |
| Approved | The owning NGO approved the submitted work. |
| Rejected | The owning NGO rejected the submitted work with feedback. |

### Deliverable Submission

A Deliverable Submission is a concrete attempt by the assigned Contributor to satisfy a Deliverable.

A Deliverable Submission contains work metadata, not uploaded project files.

A submission may include:

* Submission comment
* Optional external URL
* Submission timestamp
* Submitted-by contributor

### Deliverable Review

A Deliverable Review is the owning NGO's decision on a submitted Deliverable.

A review may include:

* Review outcome, either approved or rejected
* Required rejection feedback when rejected
* Reviewer
* Review timestamp

The review outcome changes the Deliverable state.

### Deliverable Invariants

* A Project must have at least one mandatory Deliverable before publication.
* Optional Deliverables do not block Project completion.
* Only the assigned Contributor may submit deliverables.
* Deliverable definitions include title, description, and requirement type.
* Deliverable state is part of the workflow, not the definition itself.
* Deliverable submissions require a comment.
* External URLs are optional.
* SkillMatch stores submission metadata, not project files.
* Rejected deliverables may be resubmitted while the Project remains In Progress.
* All mandatory Deliverables must be Approved before Project completion.

---

## Collaboration Comment Model

A Collaboration Comment is contextual communication tied to a Project or Deliverable.

### Comment Contexts

MVP comments may exist in:

* Project context
* Deliverable context

### Comment Invariants

* Comments are append-only for normal users in the MVP.
* Corrections happen through new comments.
* Comment hiding or removal is administrative moderation only.
* Comments are private collaboration records.
* Comments must not appear in public project details, discovery, public NGO profiles, or public impact information.
* Comments must preserve author identity and context.
* Comments must not become direct messaging or real-time chat.

---

## Notification Model

A Notification is a recipient-specific awareness item.

Notifications are separate from Activity Records.

### Notification States

| State | Meaning |
| ----- | ------- |
| Unread | The recipient has not acknowledged or opened the notification. |
| Read | The recipient has opened or marked the notification as read. |
| Archived | The notification is hidden from active notification views but retained if needed. |

### Notification Invariants

* MVP notifications may be in-platform only.
* Email notifications are Post-MVP unless explicitly introduced later.
* Notifications belong to one recipient account.
* Notifications must not expose unauthorized private information.
* Notification state does not affect workflow state.
* Reading or archiving a notification must not delete Activity Records.
* The actor who performs an action usually does not need a notification for the same action.

---

## Certificate Model

A Certificate is evidence that a Contributor completed a valid SkillMatch project workflow.

A Certificate is not a professional credential or verified skill certification.

### Certificate States

| State | Meaning |
| ----- | ------- |
| Issued | The certificate was generated from valid project completion. |
| Revoked | The certificate was invalidated by administrative action. |

### Certificate Invariants

* A Certificate belongs to the assigned Contributor.
* A Certificate is associated with one completed Project and one owning NGO.
* Certificates are generated only from valid Project completion.
* Valid Project completion requires all mandatory Deliverables to be Approved.
* Contributors may download their own Certificates.
* NGOs may view Certificate records for their completed Projects but cannot download contributor Certificates in the MVP.
* Public Certificate verification is Post-MVP.
* Certificate revocation requires an administrative reason.

---

## Activity Record Model

An Activity Record captures that an important event occurred.

Activity Records support traceability, accountability, and governance.

### Activity Record May Include

* Actor
* Action
* Target context
* Timestamp
* Reason, when required
* Outcome or state change

### Activity Record Invariants

* Activity history is not the same as Notifications.
* Activity Records must preserve important workflow and governance events.
* Administrative actions requiring reasons must record those reasons.
* Activity history must not become a general file archive or project-management log.
* Deleting, reading, or archiving Notifications must not delete Activity Records.

---

## Administrative Action Model

An Administrative Action is an exceptional governance intervention.

Administrative Actions may affect accounts, NGOs, projects, comments, skills, certificates, or platform records.

### Administrative Action Invariants

* Administrators are governance operators, not normal workflow participants.
* Administrative intervention requires a clear reason.
* Administrators must not replace normal NGO/contributor workflow decisions during regular operation.
* Administrative actions must preserve history and reasons when relevant.
* Moderation must not delete historical collaboration records needed for accountability.
* Administrative visibility should follow least privilege where possible.

---

## Relationship Summary

| Source | Relationship | Target |
| ------ | ------------ | ------ |
| Account | has one role | Contributor, NGO, or Administrator |
| Contributor Account | owns | Contributor Profile |
| NGO Account | owns | NGO Profile |
| NGO Profile | has | Verification Status |
| NGO | owns many | Projects |
| Project | has many | Deliverables |
| Project | has many | Applications |
| Project | has at most one | Assigned Contributor |
| Contributor | submits many | Applications |
| Contributor | may be assigned to many | Projects |
| Assigned Contributor | submits | Deliverable Submissions |
| Deliverable | has many | Submissions over time |
| Project or Deliverable | has many | Collaboration Comments |
| Account | receives many | Notifications |
| Completed Project | generates | Certificate |
| Contributor | owns many | Certificates |
| Skill | may be referenced by | Profiles and Projects |
| Workflow event | may create | Activity Record |
| Workflow event | may create | Notification |
| Administrator | performs | Administrative Action |

---

## Global Domain Invariants

The following invariants apply across the domain:

* Each Account has exactly one operational role.
* Each Project is owned by exactly one NGO.
* Each Project may have only one assigned Contributor.
* NGOs must be verified before publishing Projects.
* Projects must have at least one mandatory Deliverable before publication.
* Project completion depends only on mandatory Deliverables.
* Skills are centrally managed by administrators.
* Contributor skills and project skills are optional but must come from the catalog when selected.
* Matching is assistive and must not automate assignment or block applications.
* Communication remains contextual to projects, deliverables, applications, notifications, and platform events.
* SkillMatch stores collaboration metadata, not project files.
* Critical workflow decisions require human action.
* Administrators are governance operators, not normal workflow participants.
* Reviews and ratings are Post-MVP.
* Public certificate verification is Post-MVP.
* Email notifications are Post-MVP unless explicitly introduced later.

---

## Open Questions

The following decisions must be resolved before this document is considered complete:

None.
