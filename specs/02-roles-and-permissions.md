## Role Model

SkillMatch follows a single-role account model.

Each registered account is associated with exactly one operational role:

* Contributor
* NGO
* Administrator

Users cannot simultaneously hold multiple operational roles.

Future support for multi-role or multi-profile accounts may be considered if there is demonstrated demand.

---

## Guest Access

A guest is any unauthenticated visitor using the public areas of the platform.

Guest is not a persisted user role in the system. It represents a public access state.

Guests can access public discovery and informational content but cannot perform actions that require identity, ownership, or accountability.


## Guest Permissions

Guests are unauthenticated visitors.

Guests can:

* View the public home page.
* View published projects.
* View public project details.
* View public NGO profiles for verified NGOs.
* View public platform impact information.
* Register as a Contributor.
* Register as an NGO.

Guests cannot:

* Apply to projects.
* View private contributor profiles.
* View project applicants.
* View project comments.
* View deliverable submissions.
* Create projects.
* Submit deliverables.
* Write comments.
* Access dashboards.
* Download certificates.

---

## Contributor Permissions

Contributors are registered users who want to participate in technology micro-projects.

Contributors can:

* Log in and access their contributor dashboard.
* Create and edit their own contributor profile.
* Manage their own skills and proficiency levels.
* Define their availability.
* Browse published projects.
* View public project details.
* Apply to open projects.
* Withdraw their own applications before assignment.
* View the status of their own applications.
* View projects assigned to them.
* Submit deliverables for assigned projects.
* Add comments to assigned projects and deliverables.
* View their own certificates.
* Download their own certificates.
* View their own collaboration history.
* Receive platform notifications.

Contributors cannot:

* Create projects.
* Edit NGO profiles.
* View applications submitted by other contributors.
* View private information from projects they are not assigned to.
* Approve or reject deliverables.
* Validate NGOs.
* Manage the skills catalog.
* Access admin features.

---

## NGO Permissions

NGOs are registered organizations that publish technology micro-projects.

NGOs can:

* Log in and access their NGO dashboard.
* Create and edit their own NGO profile.
* Submit their NGO profile for verification.
* Create project drafts.
* Edit their own projects before assignment.
* Publish projects after NGO verification.
* Define required skills for projects.
* Define project deliverables.
* View applications submitted to their own projects.
* View contributor profiles for applicants to their own projects.
* View SkillMatch compatibility scores for applicants.
* Assign one contributor to a project.
* View projects owned by their NGO.
* Add comments to their own projects and deliverables.
* Review submitted deliverables.
* Approve deliverables.
* Reject deliverables with feedback.
* Mark projects as completed when all deliverables are approved.
* View certificates generated for their completed projects.
* Receive platform notifications.

NGOs cannot:

* Publish projects before verification.
* Assign more than one contributor to a project.
* View applications for projects owned by other NGOs.
* Edit contributor profiles.
* Manage the global skills catalog.
* Validate other NGOs.
* Access admin features.

---

## Administrator Permissions

Administrators are trusted platform operators responsible for quality, safety, and governance.

Administrators can:

* Access the admin dashboard.
* View registered users.
* View registered NGOs.
* Approve NGO verification requests.
* Reject NGO verification requests.
* Manage NGO verification status.
* Manage the centralized skills catalog.
* Create, edit, disable, or archive skills.
* Moderate projects.
* Moderate users.
* View platform activity at an administrative level.
* Access basic platform metrics.
* Handle reported content or suspicious activity.

Administrators cannot:

* Apply to projects as contributors unless using a separate contributor account.
* Represent an NGO unless using a separate NGO account.
* Modify project outcomes without a clear administrative reason.
* Bypass the core collaboration workflow for normal project completion.

## Visibility Rules

### Public Information

The following information is publicly accessible:

* Public home page
* Published projects
* Public project details
* Verified NGO public profiles
* Platform impact metrics
* Public informational content

---

### Contributor Visibility

Contributors can view:

* Their own profile
* Their own applications
* Their own certificates
* Their own notifications
* Their own assigned projects
* Public projects
* Public NGO profiles

Contributors cannot view:

* Applications submitted by other contributors
* Private NGO information
* Internal project information from projects they are not assigned to
* Deliverables belonging to projects they are not assigned to

---

### NGO Visibility

NGOs can view:

* Their own NGO profile
* Their own projects
* Applications submitted to their own projects
* Contributor profiles of applicants to their own projects
* Deliverables submitted to their own projects
* Certificates generated for their completed projects
* Public projects
* Public NGO profiles

NGOs cannot view:

* Applications submitted to projects owned by other NGOs
* Private contributor information unrelated to their projects
* Internal information from projects owned by other NGOs

---

### Administrator Visibility

Administrators have access to the information required to operate, moderate, and maintain the platform.

Administrative visibility should follow the principle of least privilege whenever possible.

Administrators may access:

* User accounts
* NGO accounts
* Projects
* Applications
* Deliverables
* Certificates
* Platform activity records
* Administrative metrics

Administrative access should be limited to operational needs and platform governance responsibilities.

## Permission Matrix

| Action                  | Guest | Contributor | NGO | Admin |
| ----------------------- | :---: | :---------: | :-: | :---: |
| View public projects    |   ✓   |      ✓      |  ✓  |   ✓   |
| Register account        |   ✓   |      -      |  -  |   -   |
| Edit own profile        |   -   |      ✓      |  ✓  |   ✓   |
| Create project          |   -   |      -      |  ✓  |   ✓   |
| Publish project         |   -   |      -      |  ✓* |   ✓   |
| Apply to project        |   -   |      ✓      |  -  |   -   |
| Withdraw application    |   -   |      ✓      |  -  |   -   |
| View own applications   |   -   |      ✓      |  -  |   ✓   |
| View project applicants |   -   |      -      | ✓** |   ✓   |
| Assign contributor      |   -   |      -      | ✓** |   ✓   |
| Submit deliverable      |   -   |     ✓***    |  -  |   ✓   |
| Approve deliverable     |   -   |      -      | ✓** |   ✓   |
| Reject deliverable      |   -   |      -      | ✓** |   ✓   |
| View own certificates   |   -   |      ✓      |  ✓  |   ✓   |
| Download certificates   |   -   |      ✓      |  ✓  |   ✓   |
| Manage skills catalog   |   -   |      -      |  -  |   ✓   |
| Verify NGOs             |   -   |      -      |  -  |   ✓   |
| Moderate users          |   -   |      -      |  -  |   ✓   |
| Moderate projects       |   -   |      -      |  -  |   ✓   |

* Verified NGOs only.

** Only for projects owned by the NGO.

*** Only for projects assigned to the contributor.
