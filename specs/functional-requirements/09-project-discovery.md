# 9. Project Discovery

## Purpose

Project Discovery helps guests, contributors, NGOs, and administrators find and understand public SkillMatch projects.

Discovery should make active opportunities easy to browse without turning SkillMatch into a job board, freelance marketplace, social network, or complex search platform.

The MVP should prioritize clear project visibility, simple filters, and enough context for contributors to decide whether to apply.

---

## Discovery Ownership

Project Discovery is generated from project records owned by NGOs.

Only projects that meet visibility and publication rules may appear in public discovery.

NGOs control the content of their own project records during allowed editing states.

Administrators may moderate, hide, archive, or restrict projects when needed for governance, safety, quality, fraud, abuse, or operational reasons.

---

## Discoverable Project Rules

A project may appear in default active discovery only when it is:

* Published
* Owned by a verified NGO
* Open for applications
* Not archived
* Not completed
* Not owned by a restricted NGO

Draft projects must not appear in public discovery.

In-progress projects must not appear in default active discovery because they no longer accept applications.

Completed projects may remain publicly visible as evidence of platform activity and impact, but must not appear in default active project discovery.

Archived projects must not appear in public active discovery.

Projects owned by restricted NGOs must be removed from applicant-facing discovery while the NGO remains restricted.

---

## Discovery Content

Project discovery entries should show enough information for contributors to understand the opportunity before opening the full project details.

A discovery entry may include:

* Project title
* Owning NGO name
* NGO verified status
* Short project summary
* Required skills, when defined
* Estimated effort
* Target completion date
* Application availability, such as open for applications or closed

Discovery entries must not expose private project comments, applications, deliverable submissions, internal review history, or administrative notes.

---

## Search Rules

The MVP should support simple project search.

Search may include project fields such as:

* Title
* Description
* Owning NGO name
* Mission or cause area
* Skills, when defined

Search should help users find relevant projects but must not become a complex ranking or recommendation engine in the MVP.

Advanced recommendations are Post-MVP unless explicitly introduced later.

---

## Filter Rules

The MVP should support lightweight project filters.

Filters may include:

* Skill
* Skill category
* Cause area or mission area
* Estimated effort
* Target completion timeframe
* Application availability

Filters must not require every project to define skills.

If a project has no required skills, it may still appear in discovery and search results based on other project information.

The platform should avoid excessive filtering complexity in the MVP.

---

## Sorting Rules

Default active discovery should prioritize projects that are open for applications.

The MVP may sort active projects using simple criteria such as:

* Recently published
* Target completion date
* Estimated effort
* Relevance to search or filters

Sorting should remain understandable and must not hide valid opportunities through opaque ranking.

Personalized ranking and advanced recommendations are Post-MVP unless explicitly introduced later.

---

## Project Detail Access

Guests, contributors, NGOs, and administrators may view public project details for published projects according to visibility rules.

Public project details should include the information required for an informed application decision.

Public project details must clearly show when a project is no longer accepting applications.

Completed projects that remain publicly visible must clearly indicate that they are closed and cannot receive applications.

Private collaboration details, applications, deliverables, comments, and administrative information must remain hidden from public project details.

---

## Contributor Discovery Experience

Contributors may browse, search, filter, and view public project details.

Contributors may apply only to projects that are published, open for applications, and otherwise eligible according to application rules.

Contributors should be able to understand project fit from visible information such as description, deliverables, effort, target date, owning NGO, and skills when defined.

Compatibility or matching information is defined in the Skill Matching module.

---

## Guest Discovery Experience

Guests may browse published projects and view public project details.

Guests must not apply to projects until they register and authenticate as contributors.

Guest discovery should support transparency and platform trust while preserving private workflow information.

---

## NGO Discovery Experience

NGOs may browse public projects and public NGO profiles.

NGOs may view their own projects through their NGO dashboard, including drafts, published projects, in-progress projects, completed projects, and archived projects according to ownership rules.

NGO-owned project management views are not the same as public project discovery.

---

## Activity History

Project discovery itself does not need detailed activity history for normal browsing, searching, or filtering in the MVP.

Project lifecycle events that affect discovery visibility are recorded in the Project Lifecycle module.

Administrative moderation actions that affect discovery visibility should be recorded in the relevant project or administrative history.

---

## Notifications

Project discovery changes generally do not require direct user notifications in the MVP.

Notifications related to project publication, material project edits, assignment, archival, completion, or restriction are defined in the relevant workflow modules.

If a project is removed from active discovery due to restriction, archival, or moderation, affected users should be notified according to Project Lifecycle, NGO Verification, or Administration And Moderation rules.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Project Discovery must respect the following constraints:

* Draft projects must not appear in public discovery.
* Default active discovery must show only projects open for applications.
* Completed projects may be publicly visible but must not appear in default active discovery.
* Archived projects must not appear in public active discovery.
* Projects owned by restricted NGOs must not appear in applicant-facing discovery while restricted.
* Projects without required skills may still appear in discovery.
* Discovery must not expose private collaboration records, applications, deliverables, comments, or administrative notes.
* Discovery must not become a job marketplace, freelance marketplace, social network, or advanced recommendation system in the MVP.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
