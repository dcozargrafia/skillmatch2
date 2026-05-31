# 1. Project Lifecycle

## Purpose

The project lifecycle defines how an NGO-created micro-project moves from draft to publication, assignment, execution, completion, or archival.

Projects are the central unit of collaboration in SkillMatch.

A project must remain small, focused, and structured around clear deliverables.

---

## Project Ownership

Each project is owned by exactly one NGO.

Only the owning NGO may manage the project during normal operation.

Administrators may moderate or intervene in project records only when there is a clear governance, safety, quality, or operational reason.

---

## Project Requirements

A project must define enough information for contributors to understand the opportunity before applying.

At minimum, a project should include:

* Title
* Description
* Owning NGO
* Required skills
* Mandatory and optional deliverables
* Estimated effort
* Target completion date
* Publication status

A project cannot be published if it does not define at least one mandatory deliverable.

A project cannot be published by an unverified NGO.

---

## Project States

A project should move through a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Draft | The project is being prepared by the NGO and is not publicly visible. |
| Published | The project is publicly visible and open for contributor applications. |
| In Progress | One contributor has been selected and collaboration is active. |
| Completed | All mandatory deliverables have been approved and the project has been formally completed. |
| Archived | The project is hidden from active workflows but retained for history, governance, or recordkeeping. |

---

## Project State Rules

### Draft

A project starts as a draft when created by an NGO.

Draft projects:

* Are visible to the owning NGO.
* Are not publicly visible.
* Cannot receive applications.
* May be edited by the owning NGO.
* May be deleted or archived if no meaningful collaboration activity exists.

### Published

A verified NGO may publish a project when all required publication information is present.

Published projects:

* Are visible in public discovery.
* Can receive contributor applications.
* May be viewed by guests, contributors, NGOs, and administrators according to visibility rules.
* May be edited only in ways that do not invalidate existing applications or mislead applicants.
* Must notify existing applicants when material project information changes.

### In Progress

A project becomes in progress when the owning NGO assigns one contributor from the submitted applications.

Assignment immediately starts the project. SkillMatch does not use a separate assigned-but-not-started state in the MVP.

In-progress projects:

* Have exactly one assigned contributor.
* Must stop accepting new applications.
* Should preserve previous application history.
* Should mark the selected contributor application as accepted.
* Should mark all non-selected applications as not selected.
* Must notify all applicants when the project is assigned.
* Should make the selected contributor visible as the active assignee to authorized users.
* Allow the assigned contributor to submit deliverables.
* Allow contextual comments between the owning NGO and assigned contributor.
* Allow the owning NGO to review submitted deliverables.
* Remain unavailable for new contributor applications.

### Completed

A project may be completed only when all mandatory deliverables have been approved.

Completed projects:

* Must not accept new applications.
* Must not accept new deliverable submissions for normal workflow purposes.
* Should trigger certificate generation for the assigned contributor.
* Should become part of the contributor and NGO collaboration history.
* May remain publicly visible as evidence of platform activity and impact.
* Must not appear in default active project discovery.
* Must clearly indicate that they are closed and cannot receive applications.
* Must not expose private collaboration details, comments, submissions, or internal review history.

### Archived

A project may be archived when it should no longer participate in active workflows.

Archived projects:

* Must not accept applications.
* Must not accept deliverable submissions.
* Should remain available to authorized users when required for history, governance, or accountability.
* May be archived by the owning NGO when allowed by project state rules.
* May be archived by administrators for governance or moderation reasons.
* Must preserve existing applications, comments, submissions, and collaboration history.

---

## Project State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Draft | Published | Verified NGO publishes a complete project. |
| Draft | Archived | NGO or administrator removes the draft from active use. |
| Published | In Progress | NGO selects one contributor from applications. |
| Published | Archived | NGO or administrator removes the project from active discovery. |
| In Progress | Completed | All mandatory deliverables are approved and the NGO completes the project. |
| In Progress | Archived | NGO archives with a required reason, or administrator intervenes for governance or moderation. |
| Completed | Archived | Project is removed from public completed-project views but retained for history. |

---

## Project Editing Rules

NGOs may edit their own projects before assignment.

Editing becomes more restricted as the project advances through the lifecycle.

| State | Editing Rule |
| ----- | ------------ |
| Draft | Owning NGO may edit project information freely. |
| Published | Owning NGO may edit non-disruptive information. Material changes must notify existing applicants. |
| In Progress | Mandatory deliverables are considered agreed scope. Changes are exceptional and must be acknowledged in project comments and preserved in history. |
| Completed | Normal editing should not be allowed. Historical correction requires administrative reason. |
| Archived | Normal editing should not be allowed. Administrative correction may be allowed for governance reasons. |

---


## Deliverable Changes After Assignment

After a project becomes in progress, mandatory deliverables are considered the agreed project scope.

Mandatory deliverables should not normally change after assignment.

If a deliverable change is needed:

* The change must be discussed in project comments.
* The assigned contributor must explicitly acknowledge the change in project comments.
* The owning NGO may update the deliverable only after that acknowledgement.
* The change must be preserved in project or deliverable history.
* The change must not erase previous submissions, comments, or review history.

Substantial scope changes should not be handled as normal deliverable edits. If the project no longer represents the original micro-project, the project should be archived and a new project should be created.

SkillMatch must not introduce a complex change-request workflow in the MVP.

---

## Project Cancellation And Archival

SkillMatch should avoid complex project-management behavior, but it must support removing projects from active workflows.

Archival is the preferred MVP mechanism for removing a project from active use.

A project may need to be archived when:

* The NGO no longer needs the project.
* The project was published by mistake.
* The project violates platform rules.
* The project is no longer suitable for contributors.
* Collaboration cannot continue.
* An administrator determines that moderation is required.

An NGO may archive an in-progress project, but must provide a cancellation or archival reason.

When an in-progress project is archived:

* The assigned contributor must be notified.
* Existing applications, comments, submissions, and collaboration history must be preserved.
* No certificate is generated unless the project had already met the completion rules.
* The project must stop accepting applications and deliverable submissions.

Administrators may also archive in-progress projects for governance, safety, quality, fraud, abuse, or moderation reasons.

---

## Activity History

Project lifecycle events must be recorded in the relevant activity history.

Activity history should include events such as:

* Project created.
* Project published.
* Project materially edited after publication.
* Project assigned to a contributor.
* Project moved to in progress.
* Project completed.
* Project archived.
* Mandatory deliverables changed after assignment.

The actor who performs an action does not need to receive a notification for that same action, but the action must be recorded for traceability.

---

## Notifications

Project lifecycle notifications should follow the global notifications and activity history rule.

The platform should notify relevant users when:

* A published project receives material changes after contributors have applied, so existing applicants can reassess the opportunity.
* A project is assigned, so the selected contributor and non-selected applicants know the outcome.
* A project is archived while in progress, so the assigned contributor knows collaboration has stopped.
* A project is completed, so the assigned contributor knows the final outcome.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.

---
