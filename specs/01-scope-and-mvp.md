# Scope Guardrails

The following constraints define the intended scope of SkillMatch and should guide all future product decisions.

## One Contributor Per Project

Each project can only be assigned to a single contributor.

SkillMatch is designed around individual ownership and accountability rather than team-based project execution.

Projects that require multiple contributors should be split into smaller, independent micro-projects.

---

## NGO Verification Is Required

NGOs must be reviewed and approved by platform administrators before they can publish projects.

This verification process helps maintain trust, legitimacy, and quality within the ecosystem.

---

## Skills Are Centrally Managed

Skills are maintained through a centralized catalog managed by administrators.

Contributors and NGOs cannot create arbitrary skills.

This ensures consistency in matching, reporting, and search functionality.

---

## Projects Must Be Structured Around Deliverables

Every project must define at least one mandatory deliverable and may define optional deliverables.

Project completion is determined by the successful delivery and approval of all mandatory deliverables.

---

## External Asset Ownership

SkillMatch is not intended to store or manage project assets.

Deliverable submissions consist of comments and optional external URLs pointing to files, repositories, documents, designs, or other project outputs.

Project assets remain under the ownership and control of contributors and NGOs through external platforms and services.

The platform stores submission metadata rather than project files.

---

## Communication Must Remain Contextual

Communication should remain tied to projects, applications, deliverables, and platform events.

SkillMatch is not intended to become a general-purpose messaging platform.

---

## Contributors May Participate In Multiple Projects

Contributors may apply to and participate in multiple projects simultaneously.

The platform should provide visibility into availability and workload rather than impose artificial participation limits.

---

## Skills Over Credentials

Matching and project selection should prioritize demonstrated skills, interests, availability, and previous contributions rather than formal qualifications or academic credentials.

---

## Micro-Projects First

SkillMatch is optimized for small, focused technology projects with clear objectives, limited scope, and well-defined deliverables.

Large-scale initiatives should be decomposed into smaller projects whenever possible.

---

## Guided Collaboration, Not Project Management

SkillMatch facilitates collaboration between contributors and NGOs but is not intended to replace dedicated project management tools.

Only lightweight coordination features should be included within the platform.

---

## Trust Through Transparency

The platform should encourage informed decision-making through visibility into project history, reviews, certificates, validations, and contributor activity.

Transparency should be preferred over restrictive platform rules whenever possible.

---

## Human Review Over Full Automation

Critical actions such as NGO approval, contributor selection, deliverable validation, and project completion should involve human decision-making.

Automation should assist participants rather than replace them.

---

## Mission Alignment Over Feature Expansion

New features should only be introduced when they clearly support the core mission of connecting digital contributors with NGOs through meaningful micro-projects.

Features that dilute this mission should be considered out of scope.

# MVP Features

The MVP must support the complete lifecycle of a collaboration between a contributor and an NGO, from project discovery to project completion.

## Authentication & Authorization

* User registration
* User login
* Password recovery
* Role-based access control
* Contributor accounts
* NGO accounts
* Administrator accounts

---

## Contributor Profiles

* Create and edit contributor profile
* Profile biography
* Skills management
* Skill proficiency levels
* Availability information
* Contributor dashboard

---

## NGO Profiles

* Create and edit NGO profile
* NGO description
* Website and contact information
* NGO verification status

---

## NGO Verification

* NGO review workflow
* NGO approval
* NGO rejection
* NGO status management

---

## Skills Catalog

* Centralized skills catalog
* Skill categories
* Skill management by administrators
* Skill level definitions

---

## Project Management

* Create project
* Edit project
* Publish project
* Archive project
* Project status management
* Define required skills
* Define estimated effort
* Define target completion date
* Define mandatory and optional deliverables

---

## Project Discovery

* Browse projects
* Search projects
* Filter projects
* View project details

---

## Applications

* Submit application
* Withdraw application
* View submitted applications
* NGO application review

---

## Skill Matching

* Calculate compatibility assessment
* Display compatibility labels
* Rank applicants by compatibility

---

## Project Assignment

* Assign contributor to project
* Automatically start project when a contributor is assigned
* Project progress tracking through deliverables

---

## Deliverables

* Create deliverables
* Submit deliverables
* Add submission comments
* Approve deliverables
* Reject deliverables
* Deliverable history

---

## Project Collaboration

* Project comments
* Deliverable comments
* Activity timeline

---

## Notifications

* Project assignment notifications
* Deliverable approval notifications
* Deliverable rejection notifications
* Project completion notifications
* System notifications

---

## Certificates

* Automatic certificate generation
* Certificate download
* Certificate history

---

## Administration

* NGO management
* Skills management
* User moderation
* Project moderation
* Basic platform administration


# Post-MVP Features

The following features are aligned with the long-term vision of SkillMatch but are not required for the initial MVP.

They should only be considered after the core collaboration lifecycle is working reliably in production.

## Reviews And Ratings

Allow contributors and NGOs to review each other after completing a project together.

Reviews should only be available when there has been a valid project assignment between both parties.

Possible features:

* Contributor reviews for NGOs
* NGO reviews for contributors
* Public or semi-public reputation indicators
* Review moderation

---

## Public Impact Dashboard

Display aggregated platform impact metrics.

Possible metrics:

* Completed projects
* Collaboration hours
* Active NGOs
* Active contributors
* Certificates issued
* Most requested skills

---

## Public Contributor Profiles

Allow contributors to optionally publish a public profile.

Possible profile content:

* Bio
* Skills
* Completed projects
* Certificates
* Portfolio links
* Reviews

Public profiles should be opt-in and privacy-aware.

---

## Advanced Matching

Improve Compatibility Assessment beyond basic skill matching.

Possible factors:

* Availability
* Workload
* Previous project history
* Preferred causes
* Contributor interests
* Project urgency
* Skill confidence

---

## Email Notifications

Send relevant platform notifications by email.

Initial notifications may exist only inside the platform during the MVP.

Email delivery can be added later to improve engagement.

---

## Advanced Admin Tools

Expand administration capabilities as the platform grows.

Possible features:

* Project reporting
* User suspension
* Audit logs
* Content moderation queues
* NGO verification history
* Platform health metrics

---

## Certificate Verification Page

Allow external users to verify a certificate through a public verification URL or code.

The certificate entity should exist in the system, while the PDF can continue to be generated on demand.

---

## Contributor Availability And Workload Insights

Provide better visibility into contributor capacity.

Possible features:

* Weekly availability
* Estimated active workload
* Workload warnings
* Availability status
* Preferred project size

---

## Project Recommendation System

Recommend relevant projects to contributors based on their skills, interests, and availability.

This should only be implemented after enough project and contributor data exists to make recommendations meaningful.

---

## NGO Discovery Tools

Allow contributors to explore verified NGOs beyond individual projects.

Possible features:

* NGO profiles
* NGO causes
* Completed projects
* Active projects
* Reviews

---

## Better Collaboration Tools

Add lightweight collaboration features if comments and notifications are not enough.

Possible features:

* Threaded comments
* Mentions
* Comment attachments via external URLs
* Activity filters

SkillMatch should still avoid becoming a full messaging or project management platform.

---

## Open Source Contribution Workflow

Define how external developers can contribute to SkillMatch.

Possible features:

* Contributor guide
* Local development setup
* Issue templates
* Pull request templates
* Roadmap visibility
* Good first issues

# Out Of Scope

The following features are intentionally excluded from SkillMatch because they do not align with the platform's core mission or would introduce unnecessary complexity.

## Real-Time Chat

SkillMatch is not intended to become a messaging platform.

Collaboration should remain centered around contextual comments, notifications, and project-related communication.

Real-time chat, direct messaging systems, typing indicators, read receipts, and similar features are out of scope.

---

## Video Calls And Meeting Platforms

SkillMatch does not aim to replace communication tools such as Zoom, Google Meet, Microsoft Teams, or Discord.

Participants should use external services when synchronous communication is required.

---

## Team-Based Project Execution

Projects are designed around a single contributor.

The platform does not support contributor teams, team management, team roles, or multi-contributor project assignments.

Projects that require multiple contributors should be decomposed into smaller micro-projects.

---

## Job Marketplace Features

SkillMatch is not a recruitment platform, job board, or hiring marketplace.

The platform focuses on collaboration and social impact rather than employment opportunities.

---

## Freelance Marketplace Features

SkillMatch is not intended to facilitate paid freelance work, bidding systems, project auctions, or commercial contracting.

The platform focuses on volunteer-driven collaboration and contribution.

---

## Social Network Features

The platform is not intended to become a social network.

Features such as follower systems, social feeds, reactions, popularity metrics, influencer-style profiles, or engagement-driven mechanics are out of scope.

---

## Competitive Gamification

SkillMatch should encourage contribution and impact rather than competition.

Leaderboards, contributor rankings, popularity scores, and similar competitive mechanics are out of scope.

---

## General File Storage

SkillMatch does not provide general-purpose file hosting or document storage.

Project assets should remain under the control of contributors and NGOs through external services.

The platform stores collaboration metadata rather than project files.

---

## Advanced Project Management

SkillMatch is not intended to replace Jira, Trello, Asana, ClickUp, Plane, or similar project management tools.

Features such as kanban boards, sprint planning, task hierarchies, dependency management, resource planning, and project analytics are out of scope.

---

## Native Mobile Applications

Native mobile applications are not part of the initial product vision.

The platform should provide a responsive web experience that works across desktop and mobile devices.

---

## AI-Driven Platform Features

Artificial intelligence should not be considered a core product dependency.

AI-based recommendations, automated evaluations, AI-generated reviews, or AI-driven project management features are out of scope unless a future need is clearly demonstrated.

---

## Corporate Integrations

Integrations with enterprise systems such as CRMs, ERPs, HR platforms, or internal business software are out of scope.

SkillMatch is designed for NGOs and contributors, not enterprise workflows.
