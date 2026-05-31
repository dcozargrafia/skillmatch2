# 8. Skills Catalog

## Purpose

The Skills Catalog defines the controlled list of digital skills used across SkillMatch.

The catalog supports consistent project requirements, contributor profiles, discovery, and skill matching without relying on credentials, degrees, job titles, or arbitrary free-text labels.

The catalog should improve clarity and matching quality while remaining simple enough for administrators to maintain during the MVP.

---

## Catalog Ownership

The Skills Catalog is managed by administrators.

Only administrators may create, edit, disable, or archive skills during normal operation.

Contributors may select skills from the catalog for their profiles.

NGOs may select skills from the catalog as project requirements.

Contributors and NGOs must not create arbitrary skills directly from profile or project workflows.

---

## Skill Requirements

A catalog skill should contain enough information to be understandable and reusable.

At minimum, a skill should include:

* Skill name
* Skill category
* Skill status
* Optional description

Skill names should be clear, human-readable, and understandable to non-expert NGOs when possible.

Skill categories should help browse, filter, and organize skills without creating a complex taxonomy.

The MVP should avoid deeply nested categories, aliases, endorsements, credentials, or complex skill ontology.

---

## Skill Categories

Skills should be grouped into simple categories.

Categories may represent broad areas such as:

* Design
* Development
* Data
* Content
* Marketing
* Operations
* Strategy

The exact category list may evolve as the catalog grows.

Categories should help users find relevant skills but must not become a rigid classification system that blocks useful matching.

---

## Skill Level Definitions

Skill proficiency levels should be consistent across contributor profiles.

The MVP should use a small, understandable set of levels.

A recommended baseline is:

| Level | Meaning |
| ----- | ------- |
| Beginner | Can contribute with guidance on simple tasks. |
| Intermediate | Can work independently on common tasks. |
| Advanced | Can handle complex tasks and guide decisions. |

Skill levels are self-declared by contributors in the MVP.

Skill levels should inform matching and NGO review, but must not be treated as formal credentials or verified certifications.

---

## Skill States

Catalog skills should support a simple lifecycle.

| State | Meaning |
| ----- | ------- |
| Active | The skill can be selected for profiles and project requirements. |
| Disabled | The skill remains in history but cannot be newly selected. |
| Archived | The skill is retained for historical records and hidden from normal selection. |

---

## Skill State Rules

### Active

Active skills:

* May be selected by contributors for profiles.
* May be selected by NGOs for project requirements.
* May be used for discovery, filtering, and matching.
* May appear in public or authorized project/profile contexts.

### Disabled

Disabled skills:

* Must not be newly selected by contributors or NGOs.
* Should remain visible where already used historically.
* Should preserve historical project, profile, matching, application, and certificate context.
* May be restored by administrators if needed.

### Archived

Archived skills:

* Must not be newly selected.
* Should be hidden from normal catalog selection and browsing.
* Must remain available for historical records.
* Should not be deleted if referenced by previous activity.

---

## Skill State Transitions

| From | To | Trigger |
| ---- | -- | ------- |
| Active | Disabled | Administrator disables a skill that should not be newly used. |
| Disabled | Active | Administrator restores a disabled skill. |
| Active | Archived | Administrator archives a skill that should be retired. |
| Disabled | Archived | Administrator archives a disabled skill. |

The MVP should prefer disabling or archiving skills over deleting them, because skills may be referenced by profiles, projects, applications, matching history, and certificates.

---

## Usage Rules

Contributor profile skills must be selected from active catalog skills when added.

Project required skills must be selected from active catalog skills when added.

A contributor is not required to select at least one skill before applying to a project.

An NGO is not required to define at least one required skill before publishing a project.

This avoids blocking projects whose real needs are not yet represented in the catalog.

A project may define required skills to help contributors understand fit and to support matching.

If a skill is later disabled or archived, existing references to that skill must remain understandable in historical records.

Skill changes should affect future selection and matching, but must not rewrite historical workflow records.

---

## Matching Relationship

The Skills Catalog provides structured data for basic skill matching.

Skill matching may compare project required skills with contributor selected skills and proficiency levels.

A missing skill match should not automatically block a contributor from applying.

Skill matching should assist decision-making, not replace human NGO review.

Advanced matching factors are Post-MVP unless explicitly introduced later.

---

## Visibility Rules

Active skills may be visible to guests, contributors, NGOs, and administrators when shown in public projects or public NGO/project contexts.

Contributors may view active skills when editing their profile.

NGOs may view active skills when defining project requirements.

Administrators may view active, disabled, and archived skills for catalog governance.

Disabled and archived skills should be visible where needed for historical context but hidden from normal selection.

---

## Activity History

Important Skills Catalog events should be recorded for administrative traceability.

Activity history may include events such as:

* Skill created.
* Skill updated.
* Skill disabled.
* Skill restored.
* Skill archived.
* Skill category updated.
* Skill level definitions updated.

The actor who performs an action does not need to receive a notification for that same action, but the action should be recorded when relevant for traceability.

---

## Notifications

Skills Catalog changes generally do not require user-facing notifications in the MVP.

Administrators may see catalog activity or governance events in administrative history.

If a catalog change materially affects project publication, profile editing, discovery, or matching behavior, the platform may surface contextual guidance in the relevant workflow.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

The Skills Catalog must respect the following constraints:

* Skills are centrally managed by administrators.
* Contributors and NGOs cannot create arbitrary skills.
* Skills must support contributor profiles, project requirements, discovery, and matching.
* Skill levels are self-declared in the MVP.
* Skill levels must not be treated as verified credentials.
* Projects are not required to define at least one required skill before publication.
* Missing skill matches must not automatically block applications.
* Disabled or archived skills must preserve historical references.
* The catalog must avoid complex taxonomy, endorsements, credential verification, or ontology management in the MVP.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
