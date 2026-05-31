# 7. NGO Profiles

## Purpose

NGO profiles describe the organizations that publish technology micro-projects on SkillMatch.

Profiles help contributors understand who they may collaborate with, what mission the organization serves, and whether the organization has been verified by the platform.

NGO profiles must support trust, transparency, and project publication without becoming a complex compliance or organization-management system.

---

## Profile Ownership

An NGO profile belongs to one NGO account.

NGOs may create and edit their own NGO profile.

Administrators may view NGO profiles when needed for verification, governance, moderation, support, or operational integrity.

Guests and contributors may view public NGO profiles only for verified NGOs.

Unverified, rejected, or restricted NGO profiles must remain visible to the owning NGO and administrators, but must not be presented as verified public organizations.

---

## Profile Requirements

An NGO profile should contain enough information for contributors and administrators to understand the organization.

At minimum, an NGO profile should support:

* NGO name
* NGO description
* Website or public reference URL
* Contact information
* Mission or cause area
* Verification status

The MVP should avoid collecting unnecessary legal, compliance, financial, or organizational structure details unless later risk requires it.

Verification evidence should remain simple and is defined by the NGO Verification module.

---

## Profile Completion Rules

An NGO may register before completing its full profile.

An NGO may create project drafts before verification.

An NGO must complete the minimum required profile information before submitting for verification.

An NGO must be verified before publishing projects.

Incomplete NGO profiles must not be publicly visible as verified NGO profiles.

The platform should guide NGOs toward completing the information required for verification and project publication.

---

## Verification Relationship

NGO profile information is the basis for NGO Verification.

When an NGO submits for verification, administrators review the profile information and any required public reference information.

Verification status belongs to the NGO profile context and must be visible to the owning NGO and administrators.

Verified status may be shown publicly to help contributors understand organizational trust.

Rejected and restricted statuses must preserve administrative feedback or reasons according to the NGO Verification module.

Profile edits after verification should not automatically remove verified status unless administrative policy or moderation requires it.

If profile changes create trust, safety, quality, fraud, abuse, or mission-alignment concerns, administrators may review or restrict the NGO according to the NGO Verification module.

---

## Public Profile Rules

Verified NGO public profiles may be visible to guests, contributors, other NGOs, and administrators.

A public NGO profile may show:

* NGO name
* NGO description
* Website or public reference URL
* Mission or cause area
* Verification status
* Published projects
* Basic completed-project history
* Basic public impact information when available

Public NGO profiles should help contributors evaluate whether they want to collaborate with the organization.

In the MVP, completed-project history on public NGO profiles should remain basic and should not become dashboard-style impact analytics.

Public NGO profiles must not expose private administrative notes, verification feedback, internal contact details, private project information, applications, deliverables, or restricted governance history.

---

## Editing Rules

NGOs may update their own profile information.

Profile edits should affect future public profile visibility, verification review, project context, and contributor understanding.

Profile edits must not rewrite historical project, application, deliverable, certificate, comment, or activity records.

If a verified NGO edits important public information, the current public profile should show the updated information.

The platform should preserve relevant activity history for significant profile changes.

---

## Visibility Rules

NGOs can view and edit their own profile.

Administrators can view NGO profiles for verification, governance, moderation, support, and operational integrity.

Guests and contributors can view public profiles for verified NGOs.

Other NGOs can view public profiles for verified NGOs.

Unverified NGO profiles are not public by default.

Rejected NGO profiles are not public by default.

Restricted NGO profiles must not be presented as normal verified public organizations while restricted.

---

## Activity History

Important NGO profile events should be recorded when relevant for accountability, verification, moderation, or support.

Activity history may include events such as:

* NGO profile created.
* NGO profile updated.
* Required verification information completed.
* Profile submitted for verification.
* Administrator reviewed the NGO profile.
* Administrator requested changes or took moderation action.

Verification-specific events are defined in the NGO Verification module.

The actor who performs an action does not need to receive a notification for that same action, but the action should be recorded when relevant for traceability.

---

## Notifications

The platform should notify relevant users when:

* A profile-related issue requires NGO attention.
* An administrator takes moderation action affecting the NGO profile.
* Profile information is insufficient for verification or publication.

Verification approval, rejection, restriction, and restoration notifications are defined in the NGO Verification module.

Routine NGO profile edits by the NGO do not require notifications to the same NGO.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

NGO profiles must respect the following constraints:

* NGO profiles belong to NGO accounts only.
* NGO profiles support verification and project publication trust.
* NGOs may create project drafts before verification.
* NGOs must be verified before publishing projects.
* Public NGO profiles are available only for verified NGOs by default.
* Public NGO profiles may show basic completed-project history in the MVP.
* Public NGO profile history must not become dashboard-style impact analytics in the MVP.
* Unverified, rejected, or restricted NGOs must not be presented as normal verified public organizations.
* Profile edits must not rewrite historical workflow records.
* Private administrative notes and verification feedback must not be publicly exposed.
* NGO profile management must not become a complex compliance workflow in the MVP.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
