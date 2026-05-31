# 5. Authentication And Accounts

## Purpose

Authentication and accounts provide identity, access control, and accountability across SkillMatch.

The account system must support the MVP collaboration lifecycle without becoming a complex identity platform.

SkillMatch uses authentication to know who is acting, authorization to determine what they may do, and activity history to preserve accountability for important actions.

---

## Account Model

SkillMatch follows a single-role account model.

Each registered account must have exactly one operational role:

* Contributor
* NGO
* Administrator

A registered user cannot act as more than one operational role from the same account.

If a person needs to participate in more than one capacity, they must use separate accounts unless multi-role accounts are explicitly introduced in a future version.

Guest is not an account role. Guest represents an unauthenticated access state.

Email verification is not required before Contributors or NGOs can use general authenticated MVP features.

Trust for NGO project publication is handled through NGO Verification, not general account email verification.

---

## Registration Rules

Guests may register as:

* Contributor
* NGO

Guests must not self-register as administrators.

Contributor registration should create a contributor account and allow the user to access contributor-only areas.

NGO registration should create an NGO account and allow the NGO to create and edit its profile and project drafts.

NGO registration does not grant publishing rights. Publishing requires NGO verification.

Administrator accounts must be created or granted through an administrative process, not public registration.

The MVP registration process should collect only the information required to create the account and continue onboarding.

Role-specific profile information may be completed after registration in the relevant profile module.

---

## Login Rules

Registered users may log in using their account credentials.

After login, users should be directed to the dashboard or area appropriate for their operational role.

Authenticated users may only access actions and information allowed by their role and ownership rules.

A logged-in contributor must not access NGO-only workflows.

A logged-in NGO must not access contributor-only workflows.

A logged-in administrator must use administrative capabilities for governance and operations, not to replace normal contributor or NGO workflow participation.

---

## Password Recovery

SkillMatch must support password recovery for registered accounts.

Password recovery should allow users to regain access without administrative intervention in normal cases.

Password recovery must not change the account role, ownership, verification status, project ownership, applications, deliverables, certificates, or history.

Password recovery events should be recorded as account security events when relevant.

---

## Authorization Rules

Authorization must be based on:

* Authentication state
* Account role
* Ownership of the relevant resource
* Project state
* NGO verification status
* Administrative governance permissions

Role-based access control must enforce the permissions defined in `02-roles-and-permissions.md`.

Ownership rules must prevent users from accessing private information or actions belonging to unrelated accounts, projects, applications, deliverables, certificates, or profiles.

NGO verification status must be checked before allowing project publication.

Project state must be checked before allowing applications, assignments, deliverable submissions, approvals, completion, or archival actions.

---

## Account States

Accounts should support a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Active | The account can log in and use allowed platform features. |
| Disabled | The account is blocked from normal platform use by administrative action. |

The MVP should avoid a complex account state model unless required for moderation or security.

Email verification is not required for general authenticated MVP use. Account suspension levels, account deletion workflows, and advanced security states may be defined later if needed.

---

## Account State Rules

### Active

Active accounts:

* May log in.
* May access features allowed by their role.
* Remain subject to role, ownership, project state, and verification constraints.
* May receive notifications.
* May appear in relevant platform contexts according to visibility rules.

### Disabled

Disabled accounts:

* Must not be able to log in for normal platform use.
* Must not perform contributor, NGO, or administrative workflow actions.
* Should preserve existing historical records for accountability.
* Should remain visible to administrators for governance review.
* May require administrative action before becoming active again.

Disabling an account must not delete project history, applications, deliverables, certificates, comments, notifications, or activity records.

---

## Account State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Active | Disabled | Administrator disables the account for moderation, safety, abuse, fraud, operational, or governance reasons. |
| Disabled | Active | Administrator restores the account after review or resolution. |

---

## Visibility Rules

Guests may view only public content defined in the visibility rules.

Authenticated users may view their own account information.

Contributors may view their own contributor account, profile, applications, assigned projects, certificates, notifications, and collaboration history.

NGOs may view their own NGO account, profile, projects, applications submitted to their projects, deliverables submitted to their projects, certificates generated for completed projects, and notifications.

Administrators may view account information required for platform governance, moderation, support, and operational integrity.

Administrative visibility should follow the principle of least privilege whenever possible.

---

## Activity History

Important account and authentication events should be recorded when relevant for accountability, moderation, or support.

Activity history may include events such as:

* Account registered.
* User logged in.
* Password recovery requested.
* Password changed through recovery.
* Account disabled by an administrator.
* Account restored by an administrator.
* Account role assigned at registration or through administrative setup.

The actor who performs an action does not need to receive a notification for that same action, but the action should be recorded when relevant for traceability.

---

## Notifications

The platform should notify relevant users when:

* Password recovery is requested.
* Password recovery is completed.
* An account is disabled by an administrator.
* A disabled account is restored by an administrator.

Administrators may receive notifications or dashboard indicators for account events that require governance action.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

Password recovery may require email or another secure delivery mechanism as an implementation necessity, but this does not mean general account email verification is required for MVP access.

---

## Constraints

Authentication and accounts must respect the following constraints:

* Each registered account has exactly one operational role.
* Guest is not a persisted role.
* Guests may register as Contributor or NGO.
* Guests must not self-register as administrators.
* NGO registration does not grant project publishing rights.
* Administrator accounts require an administrative process.
* Authorization must enforce role, ownership, project state, and NGO verification constraints.
* Password recovery must not change business workflow state or ownership.
* Account disabling must preserve historical records.
* General email verification is not required for MVP authenticated use.
* Account management must not become a general-purpose identity platform in the MVP.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
