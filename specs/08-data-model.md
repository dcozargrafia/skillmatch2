# 08-data-model.md

# Data Model

## Purpose

This document defines the logical data model for SkillMatch.

The data model translates the approved domain model, user flows, UI structure, and API specification into persistable entities, relationships, state fields, history records, and integrity constraints.

This is not a physical database schema, migration plan, ORM model, indexing strategy, or technology decision. Those decisions come later.

---

## Data Modeling Principles

SkillMatch data modeling should prioritize:

* Preserving workflow history over destructive updates
* Explicit state fields for business lifecycles
* Separate records for submissions, reviews, comments, notifications, and administrative actions
* Metadata and external references instead of file storage
* Role and ownership relationships that support authorization
* Simple MVP structures that can evolve without pretending to solve future analytics
* Clear separation between user-facing records and administrative governance records

The data model must not introduce social networking, marketplace, messaging, file hosting, or full project-management concepts.

---

## Entity Overview

| Entity | Purpose |
| ------ | ------- |
| Account | Authenticated identity with one operational role and account state. |
| Contributor Profile | Role-specific contributor information. |
| NGO Profile | Role-specific NGO information and public profile content. |
| NGO Verification | Verification state and review history for an NGO. |
| Skill | Centrally managed catalog skill. |
| Contributor Skill | Contributor-selected skill and proficiency level. |
| Project Skill | Project-selected required skill reference. |
| Project | NGO-owned micro-project with lifecycle state. |
| Deliverable | Project deliverable definition and workflow state. |
| Application | Contributor request to participate in a project. |
| Assignment | Selected contributor relationship for one project. |
| Compatibility Assessment | Derived fit result for contributor/project or application context. |
| Deliverable Submission | Contributor submission metadata for a deliverable. |
| Deliverable Review | NGO review decision for a deliverable submission. |
| Collaboration Comment | Append-only contextual project or deliverable comment. |
| Notification | Recipient-specific awareness item. |
| Certificate | Contributor-owned completion evidence. |
| Certificate Snapshot | Immutable display data captured when a certificate is issued. |
| Activity Record | Traceability record for important workflow events. |
| Administrative Action | Governance intervention with reason and target context. |

---

## Shared Field Conventions

Most persisted entities should include:

* Stable identifier
* Creation timestamp
* Last update timestamp when mutable
* State field when the entity has a lifecycle
* Actor reference for important user-created or reviewed records
* Snapshot fields when future edits must not change historical meaning

Historical workflow records should prefer append-only records over overwriting meaningful past decisions.

Administrative corrections may update records only with preserved reason and traceability.

---

## Enumerations

| Enum | Values |
| ---- | ------ |
| Account Role | Contributor, NGO, Administrator |
| Account State | Active, Disabled |
| NGO Verification State | Unsubmitted, Pending Review, Verified, Rejected, Restricted |
| Skill State | Active, Disabled, Archived |
| Skill Proficiency Level | Beginner, Intermediate, Advanced |
| Project State | Draft, Published, In Progress, Completed, Archived |
| Application State | Submitted, Withdrawn, Accepted, Not Selected |
| Deliverable Requirement Type | Mandatory, Optional |
| Deliverable State | Pending, Submitted, Approved, Rejected |
| Deliverable Review Outcome | Approved, Rejected |
| Compatibility Label | High, Medium, Low, Not Enough Information |
| Notification State | Unread, Read, Archived |
| Certificate State | Issued, Revoked |
| Comment Context Type | Project, Deliverable |
| Activity Target Type | Account, Contributor Profile, NGO Profile, NGO Verification, Skill, Project, Application, Assignment, Deliverable, Deliverable Submission, Deliverable Review, Comment, Notification, Certificate, Administrative Action |
| Administrative Target Type | Account, NGO, Project, Comment, Skill, Certificate, Platform Record |

---

## Account

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable account identifier. |
| email | Login identifier. |
| password credential reference | Stored according to later security design. |
| role | One Account Role. |
| state | Account State. |
| created_at | Account creation timestamp. |
| updated_at | Last account update timestamp. |
| disabled_at | Present when state is Disabled. |
| disabled_reason | Required when account is disabled. |

### Relationships

* One Contributor Account has one Contributor Profile.
* One NGO Account has one NGO Profile.
* One Account may receive many Notifications.
* One Account may author many workflow records.

### Constraints

* Each Account has exactly one role.
* Guests are not persisted as accounts.
* Administrator accounts are not self-registered.
* Disabled accounts preserve historical relationships.

---

## Contributor Profile

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable contributor profile identifier. |
| account_id | Owning Contributor Account. |
| display_name | Contributor display name. |
| biography | Optional contributor biography. |
| website_url | Optional website or portfolio URL. |
| availability | Optional availability information. |
| created_at | Profile creation timestamp. |
| updated_at | Last profile update timestamp. |

### Relationships

* Belongs to one Contributor Account.
* Has many Contributor Skills.
* May be referenced by Applications, Assignments, Compatibility Assessments, and Certificates.

### Constraints

* Contributor skills are optional.
* Profile edits must not rewrite historical workflow records.
* Public Contributor Profiles are Post-MVP.

---

## NGO Profile

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable NGO profile identifier. |
| account_id | Owning NGO Account. |
| name | NGO name. |
| description | NGO description. |
| website_url | Website or public reference URL. |
| contact_information | Contact information needed for platform use and verification. |
| mission_or_cause_area | Mission or cause information. |
| created_at | Profile creation timestamp. |
| updated_at | Last profile update timestamp. |

### Relationships

* Belongs to one NGO Account.
* Has one current NGO Verification state record.
* Owns many Projects.

### Constraints

* Public NGO profile visibility depends on verification status.
* Profile edits must not erase verification history.

---

## NGO Verification

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable verification identifier. |
| ngo_profile_id | NGO profile being verified. |
| state | NGO Verification State. |
| submitted_at | Last submission timestamp. |
| reviewed_by_account_id | Administrator who reviewed the request, when applicable. |
| reviewed_at | Review timestamp, when applicable. |
| feedback | Required when rejected. |
| restriction_reason | Required when restricted. |
| restored_at | Restoration timestamp, when applicable. |
| created_at | Record creation timestamp. |
| updated_at | Last update timestamp. |

### Relationships

* Belongs to one NGO Profile.
* Review and restriction actions should create Administrative Actions and Activity Records.

### Constraints

* Only Verified NGOs may publish Projects.
* Rejected NGOs may resubmit.
* Restricted NGOs must not publish new Projects.
* Review feedback and restriction reasons must be preserved.

---

## Skill

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable skill identifier. |
| name | Skill name. |
| category | Skill category. |
| description | Optional description. |
| state | Skill State. |
| created_at | Skill creation timestamp. |
| updated_at | Last update timestamp. |

### Relationships

* Referenced by Contributor Skills.
* Referenced by Project Skills.
* Referenced by Compatibility Assessments.

### Constraints

* Only administrators manage Skills.
* Disabled and Archived skills remain valid historical references.
* Contributors and NGOs cannot create arbitrary Skills.

---

## Contributor Skill

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable contributor skill identifier. |
| contributor_profile_id | Owning Contributor Profile. |
| skill_id | Referenced Skill. |
| proficiency_level | Skill Proficiency Level. |
| created_at | Selection timestamp. |
| updated_at | Last update timestamp. |

### Constraints

* A Contributor Profile should not duplicate the same active Skill selection.
* New selections must reference active Skills.
* Historical references to disabled or archived Skills remain understandable.

---

## Project

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable project identifier. |
| ngo_profile_id | Owning NGO Profile. |
| title | Project title. |
| description | Project description. |
| estimated_effort | Estimated effort description or value. |
| target_completion_date | Optional target completion date. |
| state | Project State. |
| published_at | Publication timestamp. |
| started_at | Set when assignment moves project to In Progress. |
| completed_at | Set when project is completed. |
| archived_at | Set when project is archived. |
| archival_reason | Required for in-progress archival; administrative archival requires reason. |
| created_at | Project creation timestamp. |
| updated_at | Last update timestamp. |

### Relationships

* Belongs to one NGO Profile.
* Has many Project Skills.
* Has many Deliverables.
* Has many Applications.
* Has at most one Assignment.
* Has many Collaboration Comments.
* Has many Activity Records.
* May generate one or more Certificate records for the assigned Contributor, according to completion rules.

### Constraints

* Project must have at least one mandatory Deliverable before publication.
* Project may have at most one Assignment.
* Only verified, unrestricted NGOs may publish.
* Published projects may receive Applications.
* In Progress, Completed, and Archived projects cannot receive new Applications.
* Completed and Archived projects cannot receive normal Deliverable Submissions.

---

## Project Skill

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable project skill identifier. |
| project_id | Owning Project. |
| skill_id | Referenced Skill. |
| created_at | Selection timestamp. |

### Constraints

* Project skills are optional.
* New selections must reference active Skills.
* A Project should not duplicate the same active Skill reference.

---

## Deliverable

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable deliverable identifier. |
| project_id | Owning Project. |
| title | Deliverable title. |
| description | Deliverable description. |
| requirement_type | Mandatory or Optional. |
| state | Deliverable State. |
| created_at | Deliverable creation timestamp. |
| updated_at | Last update timestamp. |

### Relationships

* Belongs to one Project.
* Has many Deliverable Submissions over time.
* Has many Deliverable Reviews through submissions.
* May have Deliverable-context Collaboration Comments.

### Constraints

* Deliverable definitions include title, description, and requirement type.
* Deliverable state is workflow state, not the definition itself.
* Mandatory Deliverables block completion until Approved.
* Optional Deliverables do not block completion.

---

## Application

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable application identifier. |
| project_id | Target Project. |
| contributor_profile_id | Applying Contributor Profile. |
| message | Required application message. |
| state | Application State. |
| submitted_at | Submission timestamp. |
| withdrawn_at | Withdrawal timestamp, when applicable. |
| outcome_at | Accepted or Not Selected timestamp, when applicable. |
| created_at | Record creation timestamp. |
| updated_at | Last update timestamp. |

### Relationships

* Belongs to one Project.
* Belongs to one Contributor Profile.
* May have one Assignment when Accepted.
* May have Compatibility Assessment records.

### Constraints

* Manual individual Application rejection is not supported in the MVP.
* A Contributor may have only one active Submitted Application per Project.
* Applications may be submitted only for Published Projects.
* Applications are preserved for history.

---

## Assignment

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable assignment identifier. |
| project_id | Assigned Project. |
| application_id | Accepted Application. |
| contributor_profile_id | Assigned Contributor Profile. |
| assigned_by_account_id | NGO Account that made the assignment. |
| assigned_at | Assignment timestamp. |

### Relationships

* Belongs to one Project.
* Belongs to one Accepted Application.
* Identifies the assigned Contributor Profile.
* Enables Deliverable Submissions and Certificate generation.

### Constraints

* A Project may have at most one Assignment.
* Assignment must come from a Submitted Application.
* Assignment moves Project to In Progress.
* Assignment marks other Submitted Applications as Not Selected.
* Assignment must not be automated by Compatibility Assessment.

---

## Compatibility Assessment

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable compatibility assessment identifier. |
| project_id | Related Project. |
| contributor_profile_id | Related Contributor Profile. |
| application_id | Related Application when calculated in application context. |
| label | Compatibility Label. |
| internal_score | Optional internal numeric value, not exposed directly to MVP users. |
| reasons | Simple explanation data for matching, missing, or insufficient information. |
| calculated_at | Calculation timestamp. |
| input_version | Optional marker for input snapshot/version. |
| input_summary | Optional snapshot of relevant skill inputs used for explanation. |

### Constraints

* User-facing API/UI exposes labels and reasons, not numeric percentages.
* Missing contributor or project skills should produce Not Enough Information or limited compatibility, not workflow blockage.
* Compatibility must not accept, reject, hide, block, or assign contributors.
* Normal recalculation does not need Activity Records in the MVP.

---

## Deliverable Submission

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable submission identifier. |
| deliverable_id | Target Deliverable. |
| submitted_by_account_id | Assigned Contributor Account. |
| comment | Required submission comment. |
| external_url | Optional external URL. |
| submitted_at | Submission timestamp. |

### Relationships

* Belongs to one Deliverable.
* Submitted by the assigned Contributor.
* May have one Deliverable Review.

### Constraints

* SkillMatch stores submission metadata, not project files.
* Submission comment is required.
* External URL is optional.
* Submissions are preserved for history.

---

## Deliverable Review

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable review identifier. |
| deliverable_submission_id | Reviewed submission. |
| reviewer_account_id | NGO Account that reviewed the submission. |
| outcome | Approved or Rejected. |
| feedback | Required when outcome is Rejected. |
| reviewed_at | Review timestamp. |

### Relationships

* Belongs to one Deliverable Submission.
* Updates the related Deliverable workflow state.

### Constraints

* Only owning NGO reviews deliverables during normal workflow.
* Rejection feedback is required.
* Reviews are preserved for history.

---

## Collaboration Comment

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable comment identifier. |
| context_type | Project or Deliverable. |
| project_id | Present for project-context comments and useful for authorization. |
| deliverable_id | Present for deliverable-context comments. |
| author_account_id | Comment author. |
| body | Comment content. |
| created_at | Comment timestamp. |
| hidden_at | Present when administratively hidden. |
| hidden_by_account_id | Administrator who hid the comment. |
| moderation_reason | Required when hidden. |

### Constraints

* Comments are append-only for normal users.
* Comments are private collaboration records.
* Moderation must preserve accountability and history.
* Comments must not become direct messages or real-time chat.

---

## Notification

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable notification identifier. |
| recipient_account_id | Account receiving the notification. |
| actor_account_id | Actor who caused the event, when relevant. |
| context_type | Related resource type. |
| context_id | Related resource identifier. |
| message_key | Stable message/template key or event type. |
| state | Notification State. |
| created_at | Notification creation timestamp. |
| read_at | Present when read. |
| archived_at | Present when archived. |

### Constraints

* Notifications belong to one recipient Account.
* Notification state does not change workflow state.
* Archiving a Notification does not delete Activity Records.
* Notifications must not expose unauthorized private information.

---

## Certificate

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable certificate identifier. |
| certificate_identifier | Stable human/reference identifier for future verification. |
| contributor_profile_id | Certificate owner. |
| project_id | Completed Project. |
| ngo_profile_id | Owning NGO at completion. |
| snapshot_id | Certificate Snapshot captured at issue time. |
| issued_at | Issue timestamp. |
| state | Certificate State. |
| revoked_at | Present when revoked. |
| revoked_by_account_id | Administrator who revoked the certificate. |
| revocation_reason | Required when revoked. |

### Constraints

* Certificates are generated only from valid Project completion.
* Valid completion requires one Assignment and all mandatory Deliverables Approved.
* Contributors may download their own Certificates.
* NGOs may view Certificate records for their completed Projects but cannot download contributor Certificates in the MVP.
* Public certificate verification is Post-MVP.
* Certificate display data must not silently change when Contributor Profile, NGO Profile, or Project records are edited later.

---

## Certificate Snapshot

Certificate Snapshot stores immutable certificate display data captured when a Certificate is issued.

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable certificate snapshot identifier. |
| certificate_id | Certificate using this snapshot. |
| contributor_display_name | Contributor display name at issue time. |
| project_title | Project title at completion time. |
| ngo_name | NGO name at completion time. |
| project_completion_date | Completion date used for the certificate. |
| issued_at | Issue timestamp. |
| approved_mandatory_deliverables_summary | Optional summary of approved mandatory deliverables. |

### Constraints

* Snapshot fields are immutable after certificate issuance except through administrative correction with preserved reason.
* Snapshots must not expose private comments, submission details, application messages, review internals, or administrative notes.
* Public certificate verification remains Post-MVP even though stable snapshot data exists.

---

## Activity Record

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable activity record identifier. |
| actor_account_id | Actor who performed the action, when applicable. |
| action | Activity action name. |
| target_type | Activity Target Type. |
| target_id | Target resource identifier. |
| project_id | Optional project context for workflow events. |
| reason | Required for actions where the spec requires a reason. |
| outcome | Outcome or state change summary. |
| created_at | Activity timestamp. |

### Constraints

* Activity Records are distinct from Notifications.
* Important workflow and governance events should create Activity Records.
* Activity history must not become a general file archive or detailed project-management log.

---

## Administrative Action

### Fields

| Field | Notes |
| ----- | ----- |
| id | Stable administrative action identifier. |
| administrator_account_id | Administrator performing the action. |
| target_type | Administrative Target Type. |
| target_id | Target resource identifier. |
| action | Administrative action name. |
| reason | Required governance reason. |
| outcome | Resulting action or state change. |
| created_at | Action timestamp. |

### Constraints

* Administrative Actions are exceptional governance records.
* Administrative reasons are required when affecting access, publication, discovery, moderation, certificates, or historical records.
* Administrative Actions may create Activity Records and Notifications.
* Administrators are not normal workflow participants.

---

## Relationship Summary

| Relationship | Cardinality |
| ------------ | ----------- |
| Account -> Contributor Profile | One-to-zero-or-one, only for Contributor role. |
| Account -> NGO Profile | One-to-zero-or-one, only for NGO role. |
| NGO Profile -> Project | One-to-many. |
| NGO Profile -> NGO Verification | One-to-one current state, with preserved review/admin history through records. |
| Contributor Profile -> Contributor Skill | One-to-many. |
| Project -> Project Skill | One-to-many. |
| Project -> Deliverable | One-to-many. |
| Project -> Application | One-to-many. |
| Project -> Assignment | One-to-zero-or-one. |
| Contributor Profile -> Application | One-to-many. |
| Application -> Assignment | One-to-zero-or-one. |
| Deliverable -> Deliverable Submission | One-to-many. |
| Deliverable Submission -> Deliverable Review | One-to-zero-or-one. |
| Project/Deliverable -> Collaboration Comment | One-to-many. |
| Account -> Notification | One-to-many as recipient. |
| Project -> Certificate | One-to-many if future completion rules allow more recipients; MVP expects one assigned contributor certificate. |
| Contributor Profile -> Certificate | One-to-many. |
| Certificate -> Certificate Snapshot | One-to-one. |
| Workflow/Governance Event -> Activity Record | Event-to-many, as needed. |
| Administrative Action -> Activity Record | One-to-many, as needed. |

---

## Integrity Rules

The data model must enforce or support these rules:

* Exactly one operational role per Account.
* One assigned Contributor per Project.
* One active Submitted Application per Contributor per Project.
* No manual individual Application rejection state.
* At least one mandatory Deliverable before Project publication.
* Project completion only after all mandatory Deliverables are Approved.
* Deliverable submissions only by assigned Contributor.
* Deliverable reviews only by owning NGO during normal workflow.
* Certificate generation only after valid Project completion.
* Contributor-owned certificate download only.
* NGO certificate access is record-view only in MVP.
* Notifications cannot change workflow state.
* Activity Records survive notification read/archive actions.
* Admin governance actions require preserved reasons.

---

## Data Model Review Checklist

Before this document is considered complete, verify that:

* Every domain concept has a persistable representation or is explicitly derived.
* Every approved state enum is represented.
* Application Rejected is absent from the data model.
* Compatibility exposes labels while allowing internal numeric calculation.
* Deliverable Submission and Deliverable Review are separate records.
* Assignment is explicitly represented and enforces one contributor per project.
* Comments are append-only for normal users.
* Notifications and Activity Records are separate entities.
* Certificates preserve ownership, revocation state, and immutable display snapshots.
* Administrative Actions preserve reasons and do not replace normal workflow.
* No file-hosting, direct messaging, social graph, bidding, or project-management entities were introduced.

---

## Open Questions

The following decisions must be resolved before this document is considered complete:

None.
