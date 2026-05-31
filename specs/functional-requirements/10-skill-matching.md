# 10. Skill Matching

## Purpose

Skill Matching helps NGOs understand how well an applicant's selected skills align with a project's required skills.

Matching is a decision-support feature, not an automated selection mechanism.

The MVP should provide simple compatibility information that supports human review while respecting SkillMatch principles: Skills Over Credentials, Trust Over Restrictions, and Human Review Over Full Automation.

---

## Matching Ownership

Skill Matching is calculated by the platform from existing project, profile, application, and catalog information.

NGOs may view compatibility information for applicants to their own projects.

Contributors may see matching or fit indicators for projects when useful, but matching must not prevent them from applying.

Administrators may view matching information when needed for governance, support, or operational integrity.

Guests must not see private contributor matching information.

---

## Matching Inputs

MVP matching should use simple structured inputs.

Matching may consider:

* Project required skills, when defined
* Contributor selected skills, when available
* Contributor self-declared proficiency levels

Matching must not require projects to define skills.

Matching must not require contributors to select skills.

If either side has no defined skills, the platform should indicate that compatibility is limited or unavailable rather than blocking the workflow.

Advanced matching inputs such as availability, workload, previous project history, preferred causes, contributor interests, reviews, ratings, or behavioral analytics are Post-MVP unless explicitly introduced later.

---

## Compatibility Score Rules

SkillMatch may calculate compatibility for submitted applications.

MVP compatibility should be displayed as simple labels rather than numeric percentages.

Recommended MVP labels are:

| Label | Meaning |
| ----- | ------- |
| High | Strong visible alignment between project skills and contributor skills. |
| Medium | Some visible alignment, but not complete. |
| Low | Limited visible alignment. |
| Not enough information | Compatibility cannot be calculated reliably from available skills. |

Compatibility should reflect alignment between project required skills and contributor selected skills when both are available.

Compatibility may consider proficiency levels when relevant.

Compatibility labels must not be treated as credentials, guarantees, rankings of human worth, or proof of capability.

Compatibility labels must not automatically accept, reject, hide, or block contributors.

When compatibility cannot be calculated reliably, the platform should show `Not enough information` instead of inventing precision.

---

## Applicant Ranking Rules

The MVP may rank applicants by compatibility to help NGOs review applications.

Applicant ranking must remain assistive.

NGOs must be able to review applications regardless of score.

A low or unavailable compatibility label must not automatically reject an application.

A high compatibility label must not automatically select a contributor.

The owning NGO remains responsible for the assignment decision.

---

## Contributor Experience

Contributors may see project fit indicators when viewing projects, if the platform has enough information to calculate them.

Fit indicators should help contributors understand whether a project may be suitable for them.

Fit indicators must not discourage contributors from applying when they believe they can contribute.

If a contributor has not selected skills, the platform may guide them to improve their profile, but must not require skill selection before applying.

---

## NGO Experience

NGOs may see compatibility information when reviewing applicants for their own projects.

Compatibility information should be shown alongside application messages, availability, visible profile information, and collaboration history when available.

Compatibility should support review, not replace judgment.

NGOs should understand when compatibility is based on limited information.

---

## Transparency Rules

Matching results should be understandable enough for users to interpret.

The platform should avoid opaque or overly precise scoring in the MVP.

When possible, matching should explain simple reasons such as:

* Matching skills
* Missing project skills
* Contributor skills not requested by the project
* Insufficient information to calculate compatibility

The MVP should avoid complex machine learning, hidden ranking factors, behavioral profiling, or popularity scoring.

---

## Visibility Rules

Compatibility information is visible only in relevant contexts.

Contributors may see their own fit or compatibility information for public projects when available.

NGOs may see compatibility information for applications submitted to their own projects.

Administrators may see compatibility information when required for governance, support, or operational integrity.

Guests must not see private contributor compatibility information.

Other contributors must not see another contributor's compatibility information.

---

## Activity History

Skill Matching calculations do not need to create activity history records for normal viewing, recalculation, or sorting in the MVP.

Assignment decisions, application outcomes, profile changes, project changes, and catalog changes are recorded in their relevant modules.

If matching information is used in administrative review or support, that administrative action may be recorded in the relevant history.

---

## Notifications

Skill Matching does not require direct notifications in the MVP.

The platform should not notify users merely because a compatibility label changed.

Notifications for applications, assignment outcomes, project updates, and deliverable workflows are defined in their relevant modules.

MVP notifications may be in-platform only.

Email notifications are Post-MVP unless explicitly introduced later.

---

## Constraints

Skill Matching must respect the following constraints:

* Matching is assistive, not automatic decision-making.
* Matching must not automatically assign contributors.
* Matching must not automatically accept, reject, hide, or block applications.
* Missing project skills must not prevent matching fallback states or project publication.
* Missing contributor skills must not prevent applications.
* Compatibility must be displayed as simple labels, not numeric percentages, in the MVP.
* Advanced matching factors are Post-MVP unless explicitly introduced later.
* Matching must not become a leaderboard, popularity score, hiring score, freelance ranking, or social reputation system.

---

## Open Questions

The following decisions must be resolved before this section is considered complete:

None.
