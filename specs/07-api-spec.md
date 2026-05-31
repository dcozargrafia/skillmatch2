# 07-api-spec.md

# API Specification

## Purpose

This document defines the high-level API contract for SkillMatch.

The API specification translates the approved product scope, roles, functional requirements, domain model, user flows, and UI structure into resource groups, operations, authorization boundaries, state transitions, and error rules.

This is not an implementation plan, framework decision, database schema, transport optimization, or final OpenAPI document. Those decisions come later.

---

## API Principles

SkillMatch API design should prioritize:

* Explicit workflow transitions over implicit side effects
* Role and ownership checks at every protected operation
* Simple resource boundaries aligned with the domain model
* Human decisions for assignment, verification, and deliverable review
* Clear state-transition errors instead of silent failures
* Metadata references over file upload or file hosting behavior
* Traceability through activity records where workflow state changes occur

The API must not introduce behavior that is absent from the approved specification.

---

## API Style

The MVP API should be resource-oriented.

Recommended style:

* HTTPS JSON API
* Resource-based URLs
* Explicit action endpoints for business state transitions
* Cursor or page-based pagination for list endpoints
* Stable identifiers for domain resources
* Standardized error response shape

Final REST conventions, OpenAPI formatting, authentication mechanism details, and framework-specific routing are implementation decisions unless explicitly defined later.

---

## Cross-Cutting Rules

### Authentication

Protected endpoints require an authenticated Account unless explicitly marked public.

Guest access is limited to public read endpoints and registration/login flows.

### Authorization

Authorization must check:

* Account role
* Account state
* Resource ownership
* Project state
* NGO verification status
* Assignment relationship
* Administrative governance permission where relevant

Disabled accounts must not perform normal workflow actions.

### State Transitions

State-changing operations must validate the current state before applying changes.

Invalid transitions should return clear errors and must not partially update workflow state.

### Activity Records

Important workflow and governance state changes should create Activity Records.

Notification read/archive actions must not delete or replace Activity Records.

### Notifications

Workflow events may create recipient-specific Notifications according to the Notifications requirements.

Notification state does not affect workflow state.

### Files And External URLs

SkillMatch stores metadata and external URLs for deliverable submissions.

The MVP API must not expose project file upload, file hosting, file library, or asset-management workflows.

---

## Standard Error Categories

| Error | Meaning |
| ----- | ------- |
| Unauthorized | The request requires authentication. |
| Forbidden | The authenticated account is not allowed to perform the operation. |
| Not Found | The resource does not exist or is not visible to the requester. |
| Validation Failed | Required fields or business constraints are missing or invalid. |
| Invalid State Transition | The operation is not allowed from the resource's current state. |
| Conflict | The operation conflicts with existing resource state or uniqueness rules. |
| Rate Limited | The requester exceeded allowed usage limits, if limits are introduced. |

Error responses should be clear enough for UI flows to explain the next corrective action when possible.

---

## Public API

Public endpoints support unauthenticated discovery and informational access.

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| View public platform information | Show mission, basic impact, and public content. | Guest |
| List public projects | Show active published projects open for applications by default. | Guest |
| View public project detail | Show public project information without private collaboration records. | Guest |
| List verified NGO public profiles | Show verified NGOs when public NGO profiles are available. | Guest |
| View verified NGO public profile | Show public NGO information and basic completed-project history when allowed. | Guest |

Public API responses must not expose:

* Applications
* Private contributor profile data
* Project comments
* Deliverable submissions
* Internal review history
* Administrative notes
* Private notifications

---

## Authentication And Account API

### Resources

* Account
* Session or authentication token

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| Register Contributor Account | Create an active Contributor Account and Contributor Profile. | Guest |
| Register NGO Account | Create an active NGO Account and NGO Profile. | Guest |
| Login | Authenticate an existing active account. | Guest |
| Logout | End the current authenticated session. | Authenticated |
| Request password recovery | Start password recovery. | Guest |
| Complete password recovery | Reset password through the recovery flow. | Guest |
| View current account | Return current account identity, role, and state. | Authenticated |

### Rules

* Guests may register only as Contributor or NGO.
* Guests must not self-register as Administrator.
* Disabled accounts must not log in for normal platform use.
* Account history must be preserved when an account is disabled.

---

## Contributor Profile API

### Resources

* Contributor Profile
* Contributor Skill Selection

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| View own Contributor Profile | Show contributor profile information to its owner. | Contributor owner |
| Update own Contributor Profile | Edit display name, biography, website or portfolio URL, availability, and other editable profile fields. | Contributor owner |
| Set contributor skills | Add, update, or remove selected catalog skills and proficiency levels. | Contributor owner |
| View applicant Contributor Profile | Show visible contributor profile data for an application submitted to the NGO's own project. | Owning NGO |

### Rules

* Contributor skills are optional.
* Selected skills must come from active Skills Catalog entries.
* Public Contributor Profiles are Post-MVP unless introduced later.
* Profile edits must not rewrite historical workflow records.

---

## NGO Profile And Verification API

### Resources

* NGO Profile
* NGO Verification

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| View own NGO Profile | Show NGO profile and verification state. | NGO owner |
| Update own NGO Profile | Edit NGO profile information. | NGO owner |
| Submit NGO Verification | Move verification from Unsubmitted or Rejected to Pending Review. | NGO owner |
| List verification requests | Show NGO verification requests requiring review. | Administrator |
| View verification request | Review NGO verification information. | Administrator |
| Approve verification request | Move NGO verification to Verified. | Administrator |
| Reject verification request | Move NGO verification to Rejected with required feedback. | Administrator |
| Restrict NGO | Move Verified NGO to Restricted with required reason. | Administrator |
| Restore NGO | Move Restricted NGO back to Verified after resolution. | Administrator |

### Rules

* Only verified NGOs may publish projects.
* Rejected NGOs may resubmit after addressing feedback.
* Restricted NGOs must not publish new projects.
* Verification rejection and restriction require preserved reasons.
* Published projects owned by restricted NGOs must be removed from applicant-facing discovery while restricted.

---

## Skills Catalog API

### Resources

* Skill
* Skill Category
* Skill Level Definition

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| List active skills | Support profile skill selection, project skill selection, discovery filters, and matching. | Authenticated / public when useful |
| View skill detail | Show skill name, category, status, and description. | Authenticated / public when useful |
| Create skill | Add a new catalog skill. | Administrator |
| Update skill | Edit skill metadata. | Administrator |
| Disable skill | Prevent future selection while preserving history. | Administrator |
| Restore skill | Make a disabled skill selectable again. | Administrator |
| Archive skill | Retire a skill from normal selection while preserving history. | Administrator |

### Rules

* Only administrators manage the Skills Catalog.
* Contributors and NGOs cannot create arbitrary skills.
* Disabled or archived skills must remain understandable in historical records.

---

## Project API

### Resources

* Project
* Project Deliverable Definition
* Project Activity Record

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| Create project draft | Create a Draft project owned by the NGO. | NGO owner |
| View own projects | List drafts, published, in-progress, completed, and archived projects owned by the NGO. | NGO owner |
| View project owner detail | Show project detail with owner-only data. | NGO owner |
| Update draft project | Edit project fields before publication. | NGO owner |
| Manage draft deliverable definitions | Create, update, or remove deliverable definitions before publication. | NGO owner |
| Publish project | Move complete Draft project to Published. | Verified NGO owner |
| Update published project | Edit allowed non-disruptive fields; material changes must notify existing applicants. | NGO owner |
| Archive project | Move project to Archived with reason when required. | NGO owner / Administrator with governance reason |
| Complete project | Move In Progress project to Completed when all mandatory deliverables are Approved. | NGO owner |
| Generate completion certificates | Create issued contributor certificate records after valid project completion. | Platform/internal trigger |
| View project activity | Show relevant project activity history. | Authorized participants / Administrator |

### Rules

* Projects are owned by exactly one NGO.
* Projects require at least one mandatory deliverable before publication.
* Project skills are optional.
* Only verified, unrestricted NGOs may publish projects.
* In-progress projects cannot receive new applications.
* Completed and archived projects cannot receive normal deliverable submissions.
* Completed projects may be archived and retained for history.

---

## Project Discovery API

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| List discoverable projects | Return active Published projects by default. | Guest / authenticated |
| Search projects | Search public project text and allowed metadata. | Guest / authenticated |
| Filter projects | Filter by allowed public fields such as skills when defined. | Guest / authenticated |
| View public project detail | Return public project detail. | Guest / authenticated |

### Rules

* Draft projects must not appear in public discovery.
* In-progress projects must not appear as open for applications.
* Completed projects may be visible in public completed contexts but not default active discovery.
* Archived projects must not appear in active public discovery.
* Discovery responses must not expose private workflow records.

---

## Application And Assignment API

### Resources

* Application
* Assignment
* Compatibility Assessment

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| Submit application | Create a Submitted application with required message. | Contributor |
| Withdraw application | Move own Submitted application to Withdrawn before assignment. | Contributor applicant |
| View own applications | List own application history and statuses. | Contributor owner |
| View project applications | List applications for an owned project while preserving historical visibility across project states. | NGO owner |
| View application detail | Show application message, visible profile information, and compatibility label when available. | Applicant Contributor / NGO owner |
| Assign contributor | Accept one submitted application, mark other submitted applications Not Selected, and move project to In Progress. | NGO owner |
| View assignment | Show assigned contributor/project relationship when authorized. | Assigned Contributor / NGO owner / Administrator |

### Rules

* Manual individual application rejection is not supported in the MVP.
* Applications use Submitted, Withdrawn, Accepted, and Not Selected states.
* Contributors may have only one active submitted application per project.
* Assignment is a human NGO decision.
* Compatibility Assessment must not automatically accept, reject, hide, block, or assign contributors.
* Assignment immediately moves the project to In Progress.

---

## Compatibility Assessment API

### Resources

* Compatibility Assessment

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| Get project fit for current contributor | Show contributor's own fit label for a public project when available. | Contributor |
| Get applicant compatibility | Show compatibility label and simple reasons for an application. | NGO owner |
| Recalculate compatibility internally | Update derived compatibility when relevant inputs change. | Platform/internal operation |

### Rules

* The API may use internal numeric logic.
* MVP user-facing responses expose labels and simple reasons, not percentages.
* Missing project skills or contributor skills should produce limited or unavailable compatibility, not workflow blockage.
* Compatibility recalculation does not require activity records for normal viewing, sorting, or recalculation.

---

## Collaboration Comment API

### Resources

* Collaboration Comment

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| List project comments | Show project-context comments. | Assigned Contributor / NGO owner / Administrator when needed |
| Create project comment | Add append-only project-context comment. | Assigned Contributor / NGO owner |
| List deliverable comments | Show deliverable-context comments. | Assigned Contributor / NGO owner / Administrator when needed |
| Create deliverable comment | Add append-only deliverable-context comment. | Assigned Contributor / NGO owner |
| Hide or moderate comment | Apply administrative moderation without deleting history. | Administrator |

### Rules

* Comments are append-only for normal users in the MVP.
* Corrections happen through new comments.
* Comments are private collaboration records.
* Comments must not become direct messaging or real-time chat.

---

## Deliverable API

### Resources

* Deliverable
* Deliverable Submission
* Deliverable Review

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| View project deliverables | Show deliverables for an authorized project context. | Assigned Contributor / NGO owner |
| Submit deliverable | Create a Deliverable Submission and move deliverable to Submitted. | Assigned Contributor |
| Approve deliverable | Create Approved Deliverable Review and move deliverable to Approved. | NGO owner |
| Reject deliverable | Create Rejected Deliverable Review with required feedback and move deliverable to Rejected. | NGO owner |
| Resubmit rejected deliverable | Create a new Deliverable Submission and move deliverable back to Submitted. | Assigned Contributor |
| View deliverable history | Show submission and review history. | Assigned Contributor / NGO owner / Administrator when needed |

### Rules

* Only the assigned Contributor may submit deliverables.
* Submission comment is required.
* External URL is optional.
* SkillMatch stores submission metadata, not project files.
* Rejection feedback is required.
* All mandatory deliverables must be Approved before project completion.

---

## Certificate API

### Resources

* Certificate

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| List own certificates | Show certificates earned by the contributor. | Contributor owner |
| View own certificate | Show certificate detail. | Contributor owner |
| Download own certificate | Download or generate certificate presentation artifact. | Contributor owner |
| View project certificate records | View certificate records for completed projects owned by the NGO. | NGO owner |
| Revoke certificate | Move certificate to Revoked with administrative reason. | Administrator |
| Correct certificate metadata | Correct certificate metadata with administrative reason. | Administrator |

### Rules

* Certificates are generated only from valid project completion.
* Contributors may download their own certificates.
* NGOs may view certificate records but cannot download contributor certificates in the MVP.
* Public certificate verification is Post-MVP.
* Certificate revocation requires an administrative reason.

---

## Notification API

### Resources

* Notification

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| Create notification from workflow event | Create recipient-specific notification for relevant workflow or governance event. | Platform/internal trigger |
| List own notifications | Show recipient-specific notifications. | Authenticated recipient |
| Mark notification as read | Move notification to Read. | Notification recipient |
| Archive notification | Move notification to Archived. | Notification recipient |
| View notification context | Navigate to linked context when authorized. | Notification recipient |

### Rules

* Notifications belong to one recipient Account.
* Notification state changes must not affect workflow state.
* Reading or archiving notifications must not delete Activity Records.
* Notifications must not expose unauthorized private information.
* MVP notifications are in-platform only.

---

## Administration API

### Resources

* Administrative Action
* Account Governance
* NGO Governance
* Project Moderation
* Comment Moderation
* Certificate Administration
* Platform Activity Record

### Operations

| Operation | Purpose | Access |
| --------- | ------- | ------ |
| List governance items | Show items requiring administrative attention. | Administrator |
| List accounts | Show account records for governance, moderation, support, or operational integrity. | Administrator |
| List contributor accounts | Show contributor accounts and summary profile information for governance, moderation, support, or operational integrity. | Administrator |
| View contributor account detail | Inspect contributor account, profile, applications, assignments, certificates, and activity when administratively justified. | Administrator |
| Disable account | Move Account to Disabled with reason. | Administrator |
| Restore account | Move Account back to Active after review. | Administrator |
| Moderate project | Hide, archive, or correct project for governance reason. | Administrator |
| Moderate comment | Hide or flag comment while preserving history. | Administrator |
| Manage certificate | Revoke or correct certificate with reason. | Administrator |
| View activity records | Review workflow and governance activity records. | Administrator |
| View basic metrics | Review minimal operational and impact indicators. | Administrator |

### Rules

* Administrators are governance operators, not normal workflow participants.
* Contributor administration must not become public contributor discovery, talent search, CRM, or assignment assistance.
* Administrative actions require clear reasons when affecting access, publication, discovery, moderation, certificates, or historical records.
* Administrative actions must preserve history.
* Administrative visibility should follow least privilege where possible.

---

## Pagination, Filtering, And Sorting

List endpoints should support pagination when result sets may grow.

Recommended list endpoints requiring pagination:

* Public project discovery
* Own projects
* Own applications
* Project applications
* Notifications
* Activity records
* Certificates
* Skills catalog
* Administrative governance lists

Filtering and sorting must not expose unauthorized information or create hidden ranking systems beyond approved compatibility support.

---

## API Review Checklist

Before this document is considered complete, verify that:

* Every approved user flow has corresponding API support.
* Every major domain state transition has an explicit operation or internal trigger.
* Manual individual application rejection is not present.
* Compatibility Assessment is label-based for user-facing API responses.
* Deliverable submissions use comments and optional external URLs, not file uploads.
* NGO certificate access is record-view only, not contributor certificate download.
* Admin operations remain governance-focused and exceptional.
* Public endpoints do not expose private workflow records.
* Internal triggers are clearly separated from user-initiated API operations.

---

## Open Questions

The following decisions must be resolved before this document is considered complete:

None.
