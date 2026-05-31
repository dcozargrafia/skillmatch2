# 05-user-flows.md

# User Flows

## Purpose

This document defines the primary SkillMatch user flows from the perspective of actors using the platform.

User flows translate the approved functional requirements and domain model into end-to-end journeys, decisions, state changes, notifications, and activity records.

This is not a UI structure, wireframe, API contract, database model, or implementation design. Those decisions come later.

---

## Flow Boundaries

The MVP user flows cover:

* Contributor registration and profile setup
* NGO registration, profile setup, and verification
* Project creation and publication
* Project discovery and application
* Application review and assignment
* Project collaboration through comments
* Deliverable submission and review
* Project completion and certificate issuance
* Notifications and activity history around workflow events
* Administrative governance flows

The MVP user flows intentionally exclude:

* Direct messaging
* Real-time chat
* Multi-contributor project execution
* Bidding or negotiation flows
* File upload and file hosting workflows
* Reviews, ratings, or social reputation flows
* Public contributor profile browsing
* Public certificate verification
* Email notification flows

---

## Primary Happy Path

The core SkillMatch journey is:

1. An NGO registers and completes its profile.
2. An administrator verifies the NGO.
3. The verified NGO creates and publishes a project.
4. A contributor discovers the project.
5. The contributor applies with an application message.
6. The NGO reviews applications with assistive compatibility labels.
7. The NGO assigns one contributor.
8. The project moves to in progress.
9. The assigned contributor submits mandatory deliverables.
10. The NGO reviews and approves mandatory deliverables.
11. The project is completed.
12. A certificate is issued to the contributor.

This flow is the central product loop. Other flows exist to support, correct, or govern it.

---

## Actors

| Actor | Flow Role |
| ----- | --------- |
| Guest | Discovers public project information and chooses whether to register. |
| Contributor | Builds a profile, applies to projects, collaborates, submits deliverables, and receives certificates. |
| NGO | Gets verified, publishes projects, reviews applications, assigns contributors, reviews deliverables, and completes projects. |
| Administrator | Verifies NGOs, governs catalog and platform safety, and performs exceptional moderation actions. |

---

## Flow 1: Contributor Registration And Profile Setup

### Goal

A guest becomes a contributor who can apply to projects.

### Main Flow

1. Guest chooses to register as a Contributor.
2. Platform creates an active Contributor Account.
3. Platform creates a Contributor Profile.
4. Contributor adds profile information such as display name, biography, optional website or portfolio URL, availability, and selected skills when available.
5. Contributor saves the profile.
6. Contributor may browse published projects and apply.

### Rules

* Contributor skills are optional.
* If selected, skills must come from active Skills Catalog entries.
* Profile completion guidance must not block applications unless a specific required field is missing.
* Public Contributor Profiles are Post-MVP unless explicitly introduced later.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Account | None | Active Contributor Account |
| Contributor Profile | None | Created or updated |

### Notifications And Activity

* Registration may create account activity history.
* Profile updates may create profile activity history when materially relevant.
* The actor does not need a notification for their own profile update.

---

## Flow 2: NGO Registration, Profile Setup, And Verification

### Goal

A guest becomes a verified NGO that can publish projects.

### Main Flow

1. Guest chooses to register as an NGO.
2. Platform creates an active NGO Account.
3. Platform creates an NGO Profile.
4. NGO completes required profile and verification information.
5. NGO submits the profile for verification.
6. Verification state changes to Pending Review.
7. Administrator reviews the verification request.
8. Administrator approves the request.
9. Verification state changes to Verified.
10. NGO may publish projects.

### Alternative: Verification Rejected

1. Administrator rejects the verification request with feedback.
2. Verification state changes to Rejected.
3. NGO receives the outcome and feedback.
4. NGO may update its profile and resubmit.

### Rules

* Only verified NGOs may publish projects.
* Verification is a human administrative decision.
* Rejected NGOs may resubmit after addressing feedback.
* Verification history and reasons must be preserved.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Account | None | Active NGO Account |
| NGO Profile | None | Created or updated |
| NGO Verification | Unsubmitted | Pending Review |
| NGO Verification | Pending Review | Verified or Rejected |

### Notifications And Activity

* Administrator may be notified when an NGO submits verification.
* NGO should be notified when verification is approved or rejected.
* Verification submission, approval, rejection, and resubmission must be recorded in activity history.

---

## Flow 3: Project Creation And Publication

### Goal

A verified NGO publishes a project that contributors can discover and apply to.

### Main Flow

1. Verified NGO creates a draft project.
2. NGO defines project title, description, estimated effort, target completion date, and deliverables.
3. NGO defines at least one mandatory deliverable.
4. NGO optionally selects required skills from the Skills Catalog.
5. NGO publishes the project.
6. Project state changes from Draft to Published.
7. Project becomes available in active discovery.

### Rules

* Only verified NGOs may publish projects.
* Restricted NGOs must not publish new projects.
* A project cannot be published without at least one mandatory deliverable.
* Project skills are optional.
* If selected, project skills must come from active Skills Catalog entries.
* Published projects may receive applications.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Project | None | Draft |
| Project | Draft | Published |

### Notifications And Activity

* Project creation and publication should be recorded in project activity history.
* Publication does not need to notify all contributors in the MVP.

---

## Flow 4: Project Discovery And Application

### Goal

A contributor finds a relevant project and submits an application.

### Main Flow

1. Contributor views active project discovery.
2. Platform shows published projects owned by verified, unrestricted NGOs.
3. Contributor opens a project detail view.
4. Platform may show a compatibility label when enough skill information exists.
5. Contributor submits an application message.
6. Application state becomes Submitted.
7. NGO receives an application notification.

### Alternative: Guest Discovery

1. Guest views public project discovery.
2. Guest opens public project details.
3. Guest chooses to apply.
4. Platform requires registration or login before application submission.

### Rules

* Only Contributors may apply.
* Contributors may apply only to Published projects.
* Application messages are required.
* A contributor may have only one active submitted application per project.
* Contributor skills are not required for application.
* Compatibility labels must not block applications.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Application | None | Submitted |

### Notifications And Activity

* Application submission must notify the owning NGO.
* Application submission must be recorded in application and project activity history.

---

## Flow 5: Application Review And Assignment

### Goal

An NGO reviews applications and assigns exactly one contributor to a project.

### Main Flow

1. NGO opens submitted applications for one of its Published projects.
2. Platform shows application messages, visible contributor profile information, availability, collaboration history when available, and compatibility labels when available.
3. NGO selects one submitted application.
4. Selected Application becomes Accepted.
5. Other submitted Applications become Not Selected.
6. Project moves from Published to In Progress.
7. Assigned contributor may submit deliverables.
8. Project stops accepting new applications.

### Alternative: Contributor Withdraws Before Assignment

1. Contributor withdraws a submitted application.
2. Application state changes to Withdrawn.
3. NGO receives a notification that the application is no longer active.
4. Contributor may reapply while the project remains Published.

### Rules

* Assignment is a human decision made by the owning NGO.
* Compatibility Assessment is assistive only.
* Compatibility must not automatically accept, mark not selected, hide, block, rank as final truth, or assign contributors.
* A project may have only one assigned contributor.
* Assignment immediately starts the project.
* Manual individual application rejection is not supported in the MVP; applications remain Submitted until withdrawal or assignment outcome.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Application | Submitted | Accepted |
| Other Applications | Submitted | Not Selected |
| Project | Published | In Progress |
| Application | Submitted | Withdrawn |

### Notifications And Activity

* Selected contributor must be notified that they were accepted.
* Non-selected applicants must be notified that they were not selected.
* Owning NGO should be notified when an applicant withdraws.
* Application outcomes and assignment must be recorded in activity history.

---

## Flow 6: Project Collaboration Comments

### Goal

The assigned contributor and owning NGO coordinate work through contextual, append-only comments.

### Main Flow

1. Project is In Progress.
2. Assigned contributor or owning NGO adds a project-level or deliverable-level comment.
3. Comment is stored with author, timestamp, and context.
4. Relevant participants may be notified when the comment requires attention.
5. Comment remains part of collaboration history.

### Rules

* Comments are contextual to projects or deliverables.
* Comments are append-only for normal users in the MVP.
* Corrections happen through new comments.
* Comments are private collaboration records.
* Comments must not become direct messaging or real-time chat.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Collaboration Comment | None | Created |

### Notifications And Activity

* Comment creation may notify relevant participants.
* Comment creation should be recorded when relevant to project or deliverable history.

---

## Flow 7: Deliverable Submission And Approval

### Goal

The assigned contributor submits work and the NGO approves it.

### Main Flow

1. Project is In Progress.
2. Assigned contributor opens a Pending deliverable.
3. Contributor submits a submission comment and optional external URL.
4. Deliverable state changes to Submitted.
5. NGO receives a notification to review the deliverable.
6. NGO reviews the submission.
7. NGO approves the deliverable.
8. Deliverable state changes to Approved.
9. Contributor receives an approval notification.

### Rules

* Only the assigned Contributor may submit deliverables.
* Submission comment is required.
* External URL is optional.
* SkillMatch stores submission metadata, not project files.
* Only the owning NGO may approve deliverables during normal workflow.
* Approved mandatory deliverables count toward project completion.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Deliverable | Pending | Submitted |
| Deliverable | Submitted | Approved |
| Deliverable Submission | None | Created |
| Deliverable Review | None | Approved review created |

### Notifications And Activity

* Deliverable submission must notify the owning NGO.
* Deliverable approval must notify the assigned contributor.
* Submission and approval must be preserved in deliverable history.

---

## Flow 8: Deliverable Rejection And Resubmission

### Goal

The NGO rejects a deliverable with feedback, and the contributor resubmits improved work.

### Main Flow

1. Deliverable is Submitted.
2. NGO reviews the submission.
3. NGO rejects the deliverable and provides required feedback.
4. Deliverable state changes to Rejected.
5. Contributor receives a rejection notification with access to feedback.
6. Contributor addresses feedback externally or in collaboration.
7. Contributor resubmits with a new submission comment and optional external URL.
8. Deliverable state changes back to Submitted.
9. NGO receives a resubmission notification.

### Rules

* Rejection feedback is required.
* Rejected deliverables may be resubmitted while the Project remains In Progress.
* Previous submissions, URLs, reviews, and feedback must be preserved.
* The MVP does not impose a platform limit on resubmission attempts.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Deliverable | Submitted | Rejected |
| Deliverable | Rejected | Submitted |
| Deliverable Review | None | Rejected review created |
| Deliverable Submission | None | New submission created |

### Notifications And Activity

* Rejection must notify the assigned contributor.
* Resubmission must notify the owning NGO.
* Rejection, feedback, and resubmission must be preserved in deliverable history.

---

## Flow 9: Project Completion And Certificate Issuance

### Goal

A project is completed after all mandatory deliverables are approved, and the contributor receives a certificate.

### Main Flow

1. All mandatory deliverables are Approved.
2. NGO completes the project.
3. Project state changes from In Progress to Completed.
4. Platform issues a Certificate to the assigned contributor.
5. Contributor may download the Certificate.
6. NGO may view the Certificate record for that completed project.

### Rules

* Project completion depends only on mandatory deliverables.
* Optional deliverables do not block completion.
* Certificates are generated only from valid project completion.
* A Certificate belongs to the assigned Contributor.
* NGOs cannot download contributor certificates in the MVP.
* Public certificate verification is Post-MVP.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Project | In Progress | Completed |
| Certificate | None | Issued |

### Notifications And Activity

* Project completion must notify the assigned contributor.
* Certificate issuance should notify the contributor.
* Completion and certificate issuance must be recorded in activity history.

---

## Flow 10: Project Archival

### Goal

A project is removed from active workflows while preserving history.

### Main Flow

1. Owning NGO decides that a project should no longer remain active.
2. NGO archives the project and provides a reason when the project is In Progress.
3. Project state changes to Archived.
4. Project stops accepting applications and deliverable submissions.
5. Existing applications, comments, submissions, and history are preserved.
6. Assigned contributor is notified if the project was In Progress.

### Administrative Alternative

1. Administrator archives a project for governance, safety, quality, fraud, abuse, or moderation reasons.
2. Administrative reason is recorded.
3. Relevant affected users are notified when appropriate.

### Rules

* Archived projects cannot receive applications or deliverable submissions.
* No certificate is generated unless completion rules had already been met.
* Archival must not delete workflow history.
* Archival must not become a complex cancellation workflow in the MVP.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Project | Draft, Published, or In Progress | Archived |

### Notifications And Activity

* In-progress archival must notify the assigned contributor.
* Archival must be recorded in project or administrative activity history.

---

## Flow 11: NGO Restriction

### Goal

An administrator restricts an NGO when governance requires limiting publication or discovery.

### Main Flow

1. Administrator identifies a governance, safety, quality, fraud, abuse, or moderation reason.
2. Administrator restricts the NGO and records the reason.
3. NGO Verification state changes to Restricted.
4. Restricted NGO can no longer publish new projects.
5. Published projects owned by the restricted NGO are removed from applicant-facing discovery while restricted.
6. Existing in-progress projects require administrative review before additional action.

### Rules

* Restriction is an administrative governance action.
* Restriction reasons and history must be preserved.
* Restricted NGOs must not publish new projects.
* Restriction should not silently delete project, application, or collaboration history.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| NGO Verification | Verified | Restricted |
| NGO Verification | Restricted | Verified |

### Notifications And Activity

* NGO should be notified when restricted or restored.
* Affected users should be notified when restriction changes active project availability.
* Restriction and restoration must be recorded in administrative history.

---

## Flow 12: Skill Catalog Governance

### Goal

Administrators maintain the controlled skill vocabulary used by profiles, projects, discovery, and compatibility assessment.

### Main Flow

1. Administrator creates, updates, disables, restores, or archives a skill.
2. Platform updates catalog availability for future selection.
3. Historical profile and project references remain understandable.

### Rules

* Only administrators manage the Skills Catalog.
* Contributors and NGOs cannot create arbitrary skills.
* Disabled or archived skills cannot be newly selected.
* Historical references to disabled or archived skills must remain understandable.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Skill | None | Active |
| Skill | Active | Disabled or Archived |
| Skill | Disabled | Active or Archived |

### Notifications And Activity

* Normal catalog changes do not require contributor or NGO notifications in the MVP.
* Catalog governance events should be recorded in administrative history.

---

## Flow 13: Administrative Moderation And Correction

### Goal

An administrator performs exceptional governance action without replacing normal collaboration workflow.

### Main Flow

1. Administrator identifies a safety, abuse, fraud, quality, support, moderation, mission alignment, or operational integrity issue.
2. Administrator reviews only the records needed for the governance decision.
3. Administrator chooses a proportional action such as disabling an account, hiding or archiving a project, moderating a comment, revoking a certificate, or correcting an operational record.
4. Administrator records a clear reason when the action affects access, visibility, workflow state, comments, certificates, or historical records.
5. Platform preserves the underlying workflow history.
6. Affected users are notified when the action changes their access, visibility, workflow state, collaboration record, or certificate validity.

### Rules

* Administrative action is exceptional.
* Administrators must not replace normal NGO/contributor decisions during regular operation.
* Administrators should not assign contributors, approve deliverables, complete projects, or generate certificates unless there is a clear administrative reason.
* Disabling an account must not delete project history, applications, deliverables, certificates, comments, notifications, or activity records.
* Certificate revocation requires an administrative reason.
* Comment moderation must preserve accountability and relevant history.
* Administrative visibility should follow least privilege where possible.

### State Changes

| Object | From | To |
| ------ | ---- | -- |
| Account | Active | Disabled |
| Account | Disabled | Active |
| Certificate | Issued | Revoked |
| Project | Draft, Published, or In Progress | Archived |
| Comment | Visible | Hidden or moderated |

### Notifications And Activity

* Affected users should be notified when administrative action changes access, visibility, workflow state, collaboration records, or certificate validity.
* Administrative actions requiring reasons must be recorded in administrative activity history.
* Administrative records should include actor, action, target context, timestamp, reason when required, and outcome.

---

## Cross-Flow Rules

The following rules apply across all user flows:

* Workflow state changes must preserve history.
* Notifications are recipient-specific awareness items and do not change workflow state.
* Activity Records are not Notifications and must not be deleted by notification actions.
* The actor who performs an action usually does not need a notification for that same action.
* Administrators are governance operators, not normal workflow participants.
* Administrative actions require clear reasons when they affect user access, publication, discovery, moderation, certificates, or historical records.
* Compatibility Assessment supports human decisions but must not automate assignment or block participation.
* SkillMatch stores collaboration metadata, not project files.
* User flows must not expand the MVP into social networking, freelancing, job marketplace, project management, messaging, or file hosting behavior.

---

## Review Checklist

Before this document is considered complete, verify that:

* The primary happy path covers the full SkillMatch collaboration lifecycle.
* Every major Project, Application, Deliverable, Verification, Skill, Certificate, Account, and governance state appears in at least one flow.
* Notifications appear only where they support relevant workflow awareness.
* Activity history appears where traceability is required.
* Compatibility Assessment remains assistive and label-based for users.
* Administrative flows are exceptional governance flows, not normal user workflows.
* MVP exclusions remain explicit.

---

## Open Questions

The following decisions must be resolved before this document is considered complete:

None.
