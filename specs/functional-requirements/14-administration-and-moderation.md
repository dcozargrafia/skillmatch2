# 14. Administration And Moderation

## Purpose

Administration and Moderation provide the governance capabilities required to keep SkillMatch safe, trustworthy, and operational.

Administrators are governance operators, not normal workflow participants.

Administrative tools must protect platform integrity without replacing the standard collaboration workflow between contributors and NGOs.

---

## Administration Scope

MVP administration should support basic platform operation and governance.

Administration may include:

* NGO verification review and status management
* Skills catalog management
* User moderation
* Project moderation
* Comment moderation
* Certificate revocation or correction for clear administrative reasons
* Basic platform activity visibility
* Basic administrative metrics

Advanced admin tools such as moderation queues, detailed audit dashboards, reporting systems, platform health dashboards, and advanced analytics are Post-MVP unless explicitly introduced later.

---

## Administrator Account Rules

Administrator accounts must be created or granted through an administrative process.

Guests must not self-register as administrators.

Administrators must use administrative capabilities for governance and operations.

Administrators must not use their admin account as a normal contributor or NGO account.

If an administrator wants to participate as a contributor or represent an NGO, they must use a separate account according to the single-role account model.

---

## Workflow Boundary Rules

Administrative intervention must not replace normal collaboration workflow.

During normal operation:

* NGOs select contributors for their own projects.
* Contributors submit deliverables for assigned projects.
* NGOs approve or reject submitted deliverables.
* Projects are completed through the standard mandatory deliverable approval flow.
* Certificates are generated only from valid project completion.

Administrators should not assign contributors, approve deliverables, complete projects, or generate certificates on behalf of users unless there is a clear administrative reason.

Administrative correction must be exceptional, reasoned, and preserved in history.

---

## Governance Actions

Administrators may intervene when necessary to protect platform safety, quality, trust, mission alignment, or operational integrity.

Governance actions may include:

* Approving or rejecting NGO verification requests.
* Restricting or restoring NGO verification status.
* Disabling or restoring user accounts.
* Moderating inappropriate, fraudulent, abusive, or suspicious activity.
* Hiding, restricting, or archiving projects that violate platform rules.
* Moderating comments when needed.
* Managing active, disabled, and archived skills.
* Revoking certificates for fraud, abuse, invalid completion, or operational correction.
* Correcting operational errors when there is a clear administrative reason.

Governance actions should be proportional to the issue being addressed.

SkillMatch should prefer transparency, history, and targeted intervention over broad restrictions when possible.

---

## User Moderation Rules

Administrators may moderate user accounts when needed for safety, abuse prevention, fraud prevention, support, or operational integrity.

User moderation may include:

* Viewing account information needed for review.
* Disabling an account.
* Restoring a disabled account after review or resolution.
* Reviewing activity associated with the account.

Disabling an account must prevent normal platform use but must not delete historical project, application, deliverable, certificate, comment, notification, or activity records.

Account moderation must follow the account state rules defined in Authentication And Accounts.

---

## NGO Moderation Rules

Administrators may moderate NGOs through verification status and profile/project review.

NGO moderation may include:

* Reviewing NGO profile information.
* Approving or rejecting verification requests.
* Restricting verified NGOs.
* Restoring restricted NGOs after resolution.
* Reviewing projects owned by the NGO.

When an NGO becomes restricted, published projects must be removed from applicant-facing discovery and stop accepting new applications while restricted.

Existing in-progress projects owned by a restricted NGO require administrative review before additional action is taken.

NGO moderation must preserve history, reasons, and relevant notifications according to NGO Verification rules.

---

## Project Moderation Rules

Administrators may moderate projects for governance, safety, quality, fraud, abuse, mission alignment, or operational reasons.

Project moderation may include:

* Viewing project information required for review.
* Hiding a project from public discovery.
* Archiving a project.
* Correcting project records for a clear administrative reason.
* Preserving moderation notes or reasons.

Project moderation must not erase existing applications, comments, deliverables, submissions, certificates, or activity history.

Administrative project archival must notify affected users according to Project Lifecycle and Notifications rules.

---

## Comment Moderation Rules

Administrators may moderate comments when required for platform safety, abuse prevention, fraud prevention, privacy, support, or operational integrity.

Comment moderation may include:

* Hiding a comment.
* Flagging a comment.
* Preserving an administrative moderation note.

Comments are append-only for normal users in the MVP.

Administrators should not use comment moderation to rewrite collaboration decisions or replace normal project communication.

Comment moderation must preserve accountability and relevant history.

---

## Skills Catalog Administration

Administrators manage the centralized Skills Catalog.

Skills Catalog administration may include:

* Creating skills.
* Updating skills.
* Disabling skills.
* Restoring disabled skills.
* Archiving skills.
* Updating simple skill categories.
* Updating skill level definitions.

Administrators should prefer disabling or archiving skills over deleting them because skills may be referenced by historical profiles, projects, applications, matching results, and certificates.

---

## Certificate Administration

Administrators may view certificates when needed for governance, support, moderation, or operational integrity.

Certificate administration may include:

* Revoking a certificate for fraud, abuse, invalid completion, moderation, or operational correction.
* Correcting certificate metadata for a clear administrative reason.
* Reviewing certificate history for support or governance.

Certificate revocation or correction must preserve the reason and must not delete the underlying project, deliverable, or activity history.

Administrators should not generate certificates manually except for a clear administrative reason.

---

## Administrative Visibility Rules

Administrators may access the information required to operate, moderate, and maintain the platform.

Administrative visibility may include:

* User accounts
* NGO accounts
* Contributor profiles
* NGO profiles
* Projects
* Applications
* Deliverables
* Comments
* Certificates
* Notifications when relevant for support
* Platform activity records
* Basic administrative metrics

Administrative visibility should follow the principle of least privilege whenever possible.

Administrative access must not make private information public.

---

## Activity History And Auditability

Important administrative actions must be recorded for accountability.

Administrative activity history should include:

* Actor
* Action performed
* Target record or context
* Timestamp
* Reason when required
* Outcome or status change

Actions requiring reasons include:

* NGO verification rejection
* NGO restriction
* Account disabling
* Project archival or hiding by an administrator
* Comment moderation
* Certificate revocation
* Operational correction of workflow records

MVP activity history should provide enough traceability for governance without becoming a complex enterprise audit-log system.

---

## Notifications

The platform should notify relevant users when administrative action affects their access, visibility, workflow state, or collaboration records.

Notification examples include:

* An NGO verification request is approved or rejected.
* An NGO is restricted or restored.
* A user account is disabled or restored.
* A project is hidden, archived, or moderated by an administrator.
* A comment is moderated in a way that affects a participant.
* A certificate is revoked or corrected.

Administrators may receive notifications or dashboard indicators for events requiring review or intervention.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Administration and Moderation must respect the following constraints:

* Administrators are governance operators, not normal workflow participants.
* Administrative intervention must require a clear governance, safety, quality, trust, support, fraud, abuse, moderation, or operational reason.
* Administrators must not replace normal NGO/contributor workflow decisions during regular operation.
* Administrative actions must preserve history and reasons when relevant.
* Moderation must not delete historical collaboration records needed for accountability.
* Administrative visibility must follow least privilege where possible.
* Basic platform administration is MVP; advanced admin dashboards, moderation queues, reports, and analytics are Post-MVP.
* Admin tools must not turn SkillMatch into a project management suite or surveillance-heavy platform.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
