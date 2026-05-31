# 12. Notifications

## Purpose

Notifications inform users about relevant platform events that require awareness, attention, or follow-up.

Notifications help contributors, NGOs, and administrators stay aware of collaboration progress without turning SkillMatch into a messaging platform or noisy activity feed.

Notifications are separate from activity history. Notifications are for awareness; activity history is for traceability.

---

## Notification Scope

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

Password recovery may use email or another secure delivery mechanism as an implementation necessity, but that does not make general email notifications part of the MVP.

Notifications should be tied to platform workflows, project collaboration, moderation, verification, deliverables, applications, comments, account events, or administrative tasks.

SkillMatch must avoid notification noise for routine events that do not require awareness or action.

---

## Notification Ownership

Each notification belongs to one recipient account.

A notification should reference the relevant context when applicable, such as:

* Project
* Application
* Deliverable
* Comment
* NGO verification request
* Account event
* Administrative moderation event

Notifications should preserve enough context for the recipient to understand what happened and where to act.

Notifications must not expose private information to users who are not authorized to view the underlying context.

---

## Recipient Rules

Notifications should be sent only to users who need to know about an event.

By default, the actor who performs an action does not need to receive a notification for that same action.

The action must still be recorded in the relevant activity history when traceability is needed.

Unrelated users must not receive notifications for private project, application, deliverable, comment, verification, or moderation events.

Administrators may receive notifications or dashboard indicators for governance events that require review or intervention.

---

## Contributor Notifications

Contributors should be notified when important events affect their applications, assigned projects, deliverables, certificates, or account access.

Contributor notifications may include:

* Their application is submitted, rejected, accepted, or marked not selected.
* They are selected for a project.
* A project they applied to has material information changed before assignment.
* An assigned project is archived or completed.
* A deliverable they submitted is approved or rejected.
* A deliverable comment requires their attention.
* A certificate is generated for their completed project.
* An administrator takes moderation action affecting their profile or account.

Routine actions performed by the contributor should not notify the same contributor unless confirmation is necessary for security or usability.

---

## NGO Notifications

NGOs should be notified when important events affect their verification, projects, applications, deliverables, comments, certificates, or account access.

NGO notifications may include:

* Their verification request is approved, rejected, restricted, or restored.
* A contributor applies to one of their projects.
* A contributor withdraws an application from one of their projects.
* A contributor submits or resubmits a deliverable.
* A project comment or deliverable comment requires NGO attention.
* A project is completed or archived when relevant.
* A certificate is generated for one of their completed projects.
* An administrator takes moderation action affecting their profile, account, verification status, or project.

Routine actions performed by the NGO should not notify the same NGO unless confirmation is necessary for security or usability.

---

## Administrator Notifications

Administrators should receive notifications or dashboard indicators for events requiring governance, moderation, review, or operational attention.

Administrator notifications may include:

* NGO verification request submitted.
* Suspicious, abusive, fraudulent, or inappropriate activity requires review.
* Moderation action requires follow-up.
* Account or project governance events require administrative attention.
* Skills catalog governance changes when relevant.

Administrators should not receive noisy notifications for every normal workflow action unless administrative review is required.

---

## Notification States

Notifications should support a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Unread | The recipient has not acknowledged or opened the notification. |
| Read | The recipient has opened or marked the notification as read. |
| Archived | The notification is hidden from the active notification view but retained if needed. |

---

## Notification State Rules

### Unread

Unread notifications:

* Should appear in the recipient's active notification area.
* May contribute to an unread count.
* Should link to the relevant context when the recipient is authorized to view it.

### Read

Read notifications:

* Should remain available for recent notification history.
* Should not contribute to unread counts.
* May still link to the relevant context when available.

### Archived

Archived notifications:

* Should be hidden from the active notification view.
* May remain available for history or support depending on retention rules.
* Must not delete underlying activity history.

---

## Notification State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Unread | Read | Recipient opens or marks the notification as read. |
| Read | Archived | Recipient archives or clears the notification. |
| Unread | Archived | Recipient archives or clears the notification without reading it. |

---

## Delivery Rules

MVP notifications may be delivered inside the platform only.

Notifications should be visible from the appropriate authenticated dashboard or notification area.

Notifications should be linked to the relevant object when possible.

If the underlying object becomes unavailable because of permissions, archival, restriction, or moderation, the notification must not expose unauthorized details.

The MVP does not require real-time push notifications.

---

## Activity History Relationship

Notifications and activity history are related but distinct.

Activity history records what happened.

Notifications inform users who need to know.

A workflow event may create both an activity record and one or more notifications.

Some workflow events may create activity history without notifications.

Some security or account events may create notifications without being visible in public or workflow timelines.

Deleting, archiving, or reading a notification must not delete the underlying activity history.

---

## Constraints

Notifications must respect the following constraints:

* MVP notifications may be in-platform only.
* Email notifications are Post-MVP unless explicitly introduced later.
* Notifications must be recipient-specific.
* Notifications must not expose unauthorized private information.
* The actor who performs an action usually does not need a notification for that same action.
* Notification read/archive state must not affect workflow state.
* Notifications must not replace activity history.
* Notifications must not become general messaging, chat, or social feed behavior.
* Routine events should avoid notification noise unless user awareness or action is needed.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
