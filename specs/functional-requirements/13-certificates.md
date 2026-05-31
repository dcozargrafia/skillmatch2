# 13. Certificates

## Purpose

Certificates provide contributors with evidence that they completed a valid SkillMatch micro-project.

Certificates support contributor recognition, collaboration history, and platform trust without becoming a credentialing, accreditation, or formal certification authority.

A certificate represents successful completion of a SkillMatch project workflow, not verified professional competence.

---

## Certificate Ownership

A certificate belongs to the contributor who completed the project.

A certificate is associated with:

* One completed project
* One assigned contributor
* One owning NGO
* The completion date or generation date

The contributor may view and download their own certificates.

The owning NGO may view certificate records generated for its completed projects, but does not download contributor certificates in the MVP.

Administrators may view certificates when required for governance, support, moderation, or operational integrity.

Guests must not download certificates unless a future public verification page explicitly allows limited public verification.

---

## Generation Rules

Certificates should be generated automatically when a project is validly completed.

A project is validly completed when:

* The project has exactly one assigned contributor.
* All mandatory deliverables have been approved.
* The owning NGO completes the project through the standard project completion workflow.

Optional deliverables do not need to be approved for certificate generation.

No certificate should be generated for draft, published, in-progress, or archived projects unless the project had already met completion rules before archival.

Administrators should not generate certificates on behalf of users unless there is a clear administrative reason.

---

## Certificate Content

A certificate should contain enough information to identify the completed collaboration.

At minimum, a certificate should include:

* Contributor name or display name
* Project title
* Owning NGO name
* Project completion date
* Certificate generation date or issue date
* SkillMatch certificate identifier

A certificate may include:

* Project summary
* Approved mandatory deliverables summary
* NGO verified status at time of completion
* Basic platform branding

Certificates must not expose private comments, deliverable submissions, application messages, internal review details, administrative notes, or restricted governance information.

---

## Certificate States

Certificates should support a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Issued | The certificate was generated from valid project completion. |
| Revoked | The certificate was invalidated by administrative action for governance, fraud, abuse, or operational reasons. |

The MVP should avoid complex certificate lifecycle states unless future verification needs require them.

---

## Certificate State Rules

### Issued

Issued certificates:

* May be viewed by the contributor.
* May be downloaded by the contributor.
* May be viewed by the owning NGO for the completed project.
* May be viewed by administrators when needed.
* Should remain part of contributor and NGO collaboration history.

### Revoked

Revoked certificates:

* Must no longer be presented as valid.
* Should preserve revocation reason in administrative history.
* Should remain visible to administrators for governance and support.
* May remain visible to the contributor with clear revoked status when appropriate.
* Must not delete the underlying project, deliverable, or activity history.

Revocation should be exceptional and require an administrative reason.

---

## Certificate State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Issued | Revoked | Administrator revokes certificate for fraud, abuse, invalid completion, moderation, or operational correction. |

The MVP does not require automatic reissue workflows.

If certificate correction is needed, administrators may handle it as an operational correction with preserved history.

---

## Download Rules

Contributors may download their own issued certificates.

NGOs may view certificate records generated for their completed projects.

NGOs do not download contributor certificates in the MVP.

Contributor certificate download belongs to the contributor.

Certificate files may be generated on demand from certificate data rather than stored as uploaded files.

SkillMatch should store certificate metadata and generate presentation artifacts as needed.

---

## Verification Rules

The certificate entity should exist in the system during the MVP.

A public certificate verification page or public verification URL is Post-MVP.

Until public verification exists, certificate validity is confirmed inside authorized platform contexts.

Certificate identifiers should be stable enough to support future verification if introduced later.

---

## Visibility Rules

Contributors can view and download their own certificates.

NGOs can view certificate records generated for projects owned by their NGO, but cannot download contributor certificates in the MVP.

Administrators can view certificates when needed for governance, support, moderation, or operational integrity.

Guests cannot view or download certificates in the MVP.

Other contributors cannot view another contributor's certificates unless public contributor profiles are introduced later.

Certificates may contribute to basic collaboration history where allowed by profile and public visibility rules.

---

## Activity History

Important certificate events should be recorded for traceability.

Activity history may include events such as:

* Certificate generated.
* Certificate viewed or downloaded when relevant for audit or support.
* Certificate revoked by an administrator.
* Certificate corrected or reissued for an administrative reason, if supported later.

Certificate generation should be linked to the project completion event.

The actor who performs an action does not need to receive a notification for that same action, but the action should be recorded when relevant for traceability.

---

## Notifications

The platform should notify relevant users when:

* A certificate is generated for a contributor after project completion.
* A certificate is generated for one of an NGO's completed projects.
* A certificate is revoked or administratively corrected.

Certificate notifications should link to the relevant certificate or completed project when the recipient is authorized to view it.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Certificates must respect the following constraints:

* Certificates are generated only from valid project completion.
* Project completion requires approval of all mandatory deliverables.
* Optional deliverables do not block certificate generation.
* Certificates belong to the assigned contributor.
* Contributors may download their own certificates.
* NGOs may view certificate records for their completed projects but cannot download contributor certificates in the MVP.
* Certificates must not expose private collaboration records.
* Certificates are not formal professional credentials or verified skill certifications.
* Certificate revocation requires an administrative reason.
* Public certificate verification is Post-MVP.
* Certificate metadata should be preserved even if downloadable files are generated on demand.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
