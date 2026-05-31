# 4. NGO Verification

## Purpose

NGO verification ensures that organizations publishing projects on SkillMatch are legitimate and aligned with the platform mission.

Verification protects contributors, improves trust, and prevents low-quality or fraudulent project publication.

NGO verification is a human administrative decision. SkillMatch may support the process, but must not fully automate approval or rejection in the MVP.

---

## Verification Ownership

NGO verification is managed by administrators.

NGOs may submit their profile for verification.

Only administrators may approve or reject NGO verification requests during normal operation.

A verified NGO may publish projects.

An unverified NGO may create project drafts but cannot publish projects.

---

## Verification Requirements

An NGO profile should contain enough information for administrators to evaluate legitimacy and mission alignment.

At minimum, an NGO verification request should include:

* NGO name
* NGO description
* Website or public reference URL
* Contact information
* Mission or cause area
* Verification status

The exact evidence required for verification should remain simple in the MVP.

SkillMatch should avoid creating a heavy compliance process unless future risk requires it.

---

## Verification States

An NGO verification request should move through a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Unsubmitted | The NGO profile exists but has not been submitted for verification. |
| Pending Review | The NGO submitted its profile and awaits administrator review. |
| Verified | The NGO was approved and may publish projects. |
| Rejected | The NGO verification request was rejected by an administrator. |
| Restricted | The NGO was previously verified but has limited publishing ability due to administrative action. |

---

## Verification State Rules

### Unsubmitted

Unsubmitted NGO profiles:

* May be edited by the NGO.
* Cannot publish projects.
* May create project drafts.
* May be submitted for verification when required information is present.

### Pending Review

Pending review profiles:

* Await administrator decision.
* Cannot publish projects until approved.
* May require profile changes before approval.
* Should remain visible to administrators for review.

### Verified

Verified NGO profiles:

* May publish projects.
* May appear as verified public NGO profiles.
* May be used to build trust with contributors.
* Remain subject to moderation and administrative status changes.

### Rejected

Rejected NGO verification requests:

* Must not allow project publication.
* Must include an administrator reason or feedback.
* Should remain visible to the NGO as a verification outcome.
* May be resubmitted after the NGO updates its profile or addresses feedback.
* May become verified if a later resubmission is approved by an administrator.

### Restricted

Restricted NGO profiles:

* Represent NGOs that were previously verified but require administrative limitation.
* Must not allow publication of new projects while restricted.
* May remain visible to administrators for governance review.
* May require administrative resolution before returning to verified status.
* May become verified again if an administrator restores verification after resolution.
* Should preserve the reason for restriction in history.

---

## Verification State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Unsubmitted | Pending Review | NGO submits profile for verification. |
| Pending Review | Verified | Administrator approves the verification request. |
| Pending Review | Rejected | Administrator rejects the verification request with feedback. |
| Rejected | Pending Review | NGO updates and resubmits the profile for verification. |
| Rejected | Verified | Administrator approves a later resubmission. |
| Verified | Restricted | Administrator restricts the NGO for governance, safety, quality, fraud, abuse, or moderation reasons. |
| Restricted | Verified | Administrator restores verified status after resolution. |

---

## Publishing Rules

Only verified NGOs may publish projects.

Unverified NGOs may create and edit project drafts, but those drafts must not become publicly visible.

If an NGO becomes restricted:

* It must not publish new projects.
* Existing draft projects remain drafts.
* Existing published projects must be removed from applicant-facing discovery while the NGO remains restricted.
* Existing published projects must stop accepting new applications while the NGO remains restricted.
* Existing in-progress projects require administrative review before additional action is taken.
* Existing project history, applications, comments, submissions, and collaboration records must be preserved.

SkillMatch should avoid automatically disrupting active collaborations without human administrative review.

---

## Review Rules

Verification approval and rejection are human administrative decisions.

Administrators should evaluate whether the NGO appears legitimate and aligned with SkillMatch's nonprofit/social-impact mission.

When rejecting verification, administrators must provide feedback explaining the reason.

Verification rejection feedback helps NGOs understand what needs to change before resubmission.

---

## Activity History

NGO verification events must be recorded in the relevant activity history.

Activity history should include events such as:

* Verification submitted.
* Verification approved.
* Verification rejected.
* Verification resubmitted.
* Verification status changed by an administrator.
* NGO restricted.
* NGO restored to verified status.

The actor who performs an action does not need to receive a notification for that same action, but the action must be recorded for traceability.

---

## Notifications

The platform should notify relevant users when:

* An NGO submits a verification request, so administrators can review it.
* An NGO verification request is approved, so the NGO knows it may publish projects.
* An NGO verification request is rejected, so the NGO can review feedback and resubmit.
* An NGO verification status changes, so the NGO knows its publishing ability may be affected.
* An NGO is restricted or restored, so the NGO understands its current platform access.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

NGO verification must respect the following constraints:

* Verification is required before project publication.
* Verification is not required to create project drafts.
* Only administrators may approve or reject verification requests during normal operation.
* Rejected NGOs may resubmit after addressing feedback.
* Rejected or restricted NGOs may become verified again after administrator approval.
* Verification status changes must be preserved in history.
* Restricted status must be separate from rejected verification.
* Published projects owned by restricted NGOs must not remain visible to applicants or accept new applications while restricted.
* Verification must not become a complex compliance workflow in the MVP.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
