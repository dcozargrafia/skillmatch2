# 2. Deliverables

## Purpose

Deliverables define the expected outputs of a project.

They are the primary mechanism for tracking progress, validating work, and determining whether a project can be completed.

SkillMatch does not manage project tasks, files, or detailed execution plans. It tracks deliverable expectations, submissions, review outcomes, and history.

---

## Deliverable Ownership

Deliverables belong to a project.

The owning NGO defines at least one mandatory deliverable before publishing the project.

After assignment, mandatory deliverables are considered part of the agreed project scope.

The assigned contributor may submit work for project deliverables.

The owning NGO reviews submitted deliverables and decides whether to approve or reject them.

---

## Deliverable Requirements

Each project must define at least one mandatory deliverable before publication.

Projects may also define optional deliverables.

Each deliverable should include enough information for contributors to understand what must be produced.

At minimum, a deliverable should include:

* Title
* Description
* Requirement type, either mandatory or optional
* Review status

Mandatory deliverables define the minimum work required for project completion.

Optional deliverables may provide additional value but must not block project completion.

Deliverables should remain small and concrete enough to support micro-project execution.

---

## Deliverable Submissions

A deliverable submission represents the contributor's attempt to satisfy a deliverable.

A submission must include a submission comment.

A submission may also include optional external URLs pointing to repositories, documents, designs, files, or other outputs.

An external URL is not required when the submission comment provides enough information for the NGO to review the deliverable.

SkillMatch must not store project files as deliverable assets.

External assets remain under the ownership and control of contributors and NGOs through external platforms.

---

## Deliverable States

A deliverable should move through a simple review lifecycle.

| State | Meaning |
| ----- | ------- |
| Pending | The deliverable exists but has not been submitted for review. |
| Submitted | The contributor has submitted work for NGO review. |
| Approved | The NGO has accepted the submitted work. |
| Rejected | The NGO has rejected the submitted work and provided feedback. |

---

## Deliverable State Rules

### Pending

Pending deliverables:

* Are visible to the owning NGO and assigned contributor after project assignment.
* May receive submissions from the assigned contributor while the project is in progress.
* Count as incomplete for project completion when mandatory.

### Submitted

Submitted deliverables:

* Await review from the owning NGO.
* Must preserve submission comments and any external URLs.
* May be approved or rejected by the owning NGO.
* Count as incomplete until approved when mandatory.

### Approved

Approved deliverables:

* Count toward project completion when mandatory.
* Should preserve the approved submission history.
* Should not be resubmitted during normal workflow.
* May only be changed later through exceptional correction or an acknowledged scope change.

### Rejected

Rejected deliverables:

* Must include feedback from the owning NGO.
* May be resubmitted by the assigned contributor while the project remains in progress.
* May be resubmitted multiple times without a platform-imposed limit during the MVP.
* Must preserve previous submission and rejection history.
* Count as incomplete for project completion when mandatory.

---

## Deliverable State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Pending | Submitted | Assigned contributor submits work. |
| Submitted | Approved | Owning NGO approves the submission. |
| Submitted | Rejected | Owning NGO rejects the submission with feedback. |
| Rejected | Submitted | Assigned contributor resubmits after addressing feedback. |

---

## Review Rules

Deliverable review is a human decision made by the owning NGO.

The platform may guide the review process but must not automatically approve or reject deliverables.

When rejecting a deliverable, the NGO must provide feedback explaining what needs to change.

A project cannot be completed while any mandatory deliverable is pending, submitted, or rejected.

Optional deliverables do not block project completion.

---

## Activity History

Deliverable events must be recorded in the relevant activity history.

The actor who performs an action does not need to receive a notification for that same action, but the action must be recorded for traceability.

## Deliverable History

Deliverable history must preserve:

* Submissions
* Submission comments
* External URLs provided with submissions
* Approval events
* Rejection events
* Rejection feedback
* Resubmission events
* Exceptional deliverable changes after assignment

History exists for accountability and collaboration continuity.

History must not become a general file archive or task-management log.

---

## Notifications

The platform should notify relevant users when:

* A deliverable is submitted, so the owning NGO can review it.
* A deliverable is approved, so the assigned contributor knows the outcome.
* A deliverable is rejected, so the assigned contributor can review feedback and resubmit.
* A rejected deliverable is resubmitted, so the owning NGO can review it again.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Deliverables must respect the following constraints:

* Only assigned contributors may submit deliverables.
* Only the owning NGO may approve or reject deliverables during normal workflow.
* Administrators must not approve or reject deliverables except for a clear administrative reason.
* Deliverables cannot be submitted before a project is in progress.
* Deliverables cannot be submitted after a project is completed or archived.
* All mandatory deliverables must be approved for project completion.
* Optional deliverables do not need to be approved for project completion.
* Deliverable submissions must use comments and optional external URLs rather than uploaded files.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.

---
