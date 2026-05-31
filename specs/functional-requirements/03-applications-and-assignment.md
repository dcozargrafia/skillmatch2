# 3. Applications And Assignment

## Purpose

Applications allow contributors to express interest in open projects and allow NGOs to select one contributor for collaboration.

Assignment is the decision that starts the project execution phase.

SkillMatch supports human selection assisted by relevant information, not automated assignment.

---

## Application Ownership

An application belongs to exactly one contributor and one project.

Only contributors may submit applications.

Only the owning NGO may review applications for its projects during normal operation.

Administrators may view or moderate applications only when required for governance, safety, quality, or operational reasons.

---

## Application Eligibility

A contributor may apply only to projects that are open for applications.

A project is open for applications only when it is published.

Contributors cannot apply to:

* Draft projects
* In-progress projects
* Completed projects
* Archived projects

Contributors may apply to multiple projects at the same time.

SkillMatch should provide visibility into contributor activity and workload rather than impose artificial application limits during the MVP.

---

## Application Requirements

An application should include enough information for the NGO to evaluate contributor fit.

Application messages are required in the MVP.

At minimum, an application should include:

* Contributor identity
* Target project
* Required application message or motivation
* Application status
* Submission date

The application may also reference contributor profile information such as skills, availability, and collaboration history when visible to the NGO.

---

## Application States

Applications should move through a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Submitted | The contributor has applied and the application awaits NGO review. |
| Withdrawn | The contributor withdrew the application before assignment. |
| Accepted | The NGO selected this contributor and the project moved to in progress. |
| Not Selected | The NGO selected another contributor for the project. |

---

## Application State Rules

### Submitted

Submitted applications:

* Are visible to the applicant contributor.
* Are visible to the owning NGO.
* Are not visible to other contributors.
* May be reviewed by the owning NGO.
* May be withdrawn by the applicant before assignment.

### Withdrawn

Withdrawn applications:

* Must remain visible in the contributor's own application history.
* Must remain visible to the owning NGO as historical application activity.
* Cannot be accepted unless the contributor submits a new application while the project is still open.
* Must not be considered active for assignment.

A contributor may submit a new application to the same project after withdrawing a previous one, as long as the project remains published and open for applications.

A contributor may have only one active submitted application per project.

### Accepted

An application becomes accepted when the NGO assigns that contributor to the project.

Accepted applications:

* Identify the selected contributor.
* Start the project automatically by moving the project from published to in progress.
* Must notify the selected contributor.
* Must remain part of project and contributor history.

### Not Selected

Applications become not selected when another contributor is assigned to the project.

Not-selected applications:

* Must notify the applicant contributor.
* Must remain visible in the contributor's own application history.
* Must remain visible to the owning NGO as historical application activity.
* Must not allow the contributor to submit deliverables for the project.

---

## Application State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Submitted | Withdrawn | Contributor withdraws before project assignment. |
| Submitted | Accepted | NGO selects the contributor for the project. |
| Submitted | Not Selected | NGO selects a different contributor for the project. |
| Withdrawn | Submitted | Contributor applies again while the project remains published. |

---

## Assignment Rules

Each project may have only one assigned contributor.

An NGO may assign a contributor only from submitted applications to its own published project.

The MVP does not support manual individual application rejection before assignment. Applications that are not selected remain submitted until the contributor withdraws or the project is assigned to another contributor.

When an NGO assigns a contributor:

* The selected application becomes accepted.
* All other submitted applications for the project become not selected.
* All applicants must be notified of the assignment outcome.
* The project immediately moves from published to in progress.
* The project stops accepting new applications.
* The assigned contributor may begin submitting deliverables.

Assignment is a human decision made by the owning NGO.

SkillMatch may display compatibility information to support the decision, but must not automatically assign contributors.

---

## Withdrawal And Reapplication Rules

A contributor may withdraw an application before the project is assigned.

A contributor cannot withdraw an application after it has been accepted because the project has already started.

If a contributor can no longer continue after assignment, that situation must be handled through project comments, project archival, or future cancellation rules rather than application withdrawal.

A withdrawn application does not prevent the contributor from applying again to the same project while the project remains published.

A contributor may have only one active submitted application per project at a time.

---

## Visibility Rules

Contributors can view their own applications and application outcomes.

Contributors cannot view applications submitted by other contributors.

NGOs can view applications submitted to their own projects.

NGOs cannot view applications submitted to projects owned by other NGOs.

Guests cannot submit or view applications.

---

## Activity History

Application and assignment events must be recorded in the relevant activity history.

Activity history should include events such as:

* Application submitted.
* Application withdrawn.
* Application accepted.
* Application marked as not selected.
* Project assigned to a contributor.

The actor who performs an action does not need to receive a notification for that same action, but the action must be recorded for traceability.

---

## Notifications

The platform should notify relevant users when:

* A contributor submits an application, so the owning NGO can review it.
* A contributor withdraws an application, so the owning NGO knows it is no longer active.
* A contributor is accepted for a project, so the contributor knows the project has started.
* A contributor is not selected because another contributor was assigned, so the contributor knows the outcome.
* A project the contributor applied to receives material changes before assignment, so the contributor can reassess the opportunity.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Applications and assignment must respect the following constraints:

* Only contributors may apply to projects.
* Only published projects may receive applications.
* Only verified NGOs may publish projects and therefore receive applications on published projects.
* Only the owning NGO may assign a contributor during normal workflow.
* A contributor may have only one active submitted application per project.
* Application messages are required.
* Manual individual application rejection is not supported in the MVP.
* A project can have only one accepted application.
* Assignment immediately starts the project.
* Non-selected applicants must be notified.
* Application history must be preserved.
* Applications must not become a bidding, hiring, or freelance marketplace mechanism.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
