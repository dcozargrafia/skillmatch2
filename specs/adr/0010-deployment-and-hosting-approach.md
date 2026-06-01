# ADR 0010: Deployment And Hosting Approach

## Status

Accepted

## Context

SkillMatch needs a deployment and hosting approach before production readiness work begins.

The MVP architecture has already established:

* A monorepo with separately structured frontend and backend/API.
* React + Vite frontend.
* Fastify backend API.
* PostgreSQL persistence.
* Prisma migrations and database access isolated behind infrastructure adapters.
* First-party authentication with server-side sessions.
* Ant Design and i18next as frontend infrastructure choices.

The deployment approach should keep MVP operations simple while preserving enough discipline for security, backups, rollback, and future migration.

The project owner has access to an Axarnet VPS with Coolify installed.

---

## Decision

SkillMatch MVP will be deployed on the existing Axarnet VPS using Coolify.

Coolify will be used as the self-hosted deployment platform for application services, environment variables, secrets, service orchestration, and operational access.

Recommended MVP deployment shape:

```text
Axarnet VPS
  └── Coolify
        ├── Frontend application container
        ├── Backend/API application container
        ├── PostgreSQL service
        └── Reverse proxy / HTTPS routing
```

The application should be deployable through containers or Docker Compose-compatible configuration.

This decision favors MVP simplicity and use of already available infrastructure over managed platform convenience.

---

## Deployment Boundaries

The deployment must preserve the logical frontend/backend separation defined in the architecture.

Rules:

* Frontend and backend should be deployable as separate services, even if hosted on the same VPS.
* Backend API owns business rules, authorization, sessions, state transitions, and persistence access.
* Frontend serves the React application and communicates with the backend API through configured public/internal URLs.
* PostgreSQL should not be exposed publicly unless explicitly required and secured.
* Secrets and environment variables must be configured through Coolify or equivalent deployment secrets management, not committed to the repository.
* Deployment configuration should remain understandable enough to migrate away from Coolify later if needed.

---

## Database Hosting

PostgreSQL may run initially as a Coolify-managed service on the same VPS.

This is acceptable for the MVP only if backup and restore responsibilities are explicit.

Requirements:

* PostgreSQL data must be stored in persistent volumes or equivalent persistent storage.
* Scheduled backups must be configured before production use.
* Backup retention must be defined before production use.
* Restore procedure must be documented and tested before relying on the system for real users.
* Database credentials must be stored as secrets.
* Database access should be limited to application services and operational maintenance paths.

A managed PostgreSQL provider may be reconsidered later if operational risk, availability, backups, or scaling needs exceed what the VPS setup should own.

---

## Backups And Restore

Backups are mandatory for production use.

Minimum backup expectations:

* PostgreSQL scheduled backups.
* Coolify configuration backup or documented recovery path.
* Off-server backup storage when practical.
* Restore procedure documented.
* Restore procedure periodically tested.

A backup that has not been restored successfully must not be treated as a complete recovery strategy.

The MVP should avoid user-uploaded platform files, so backup scope is mainly database state, configuration, and deployment secrets/process documentation.

---

## Secrets And Configuration

Runtime configuration must be environment-based.

Examples:

* Database URL.
* Session secret.
* Cookie settings.
* Frontend API base URL.
* CORS/allowed origins.
* Password recovery token secret or equivalent signing material if introduced.
* Email delivery credentials if password recovery email is implemented.

Rules:

* Secrets must never be committed to the repository.
* Local development environment variables must be documented through examples, not real values.
* Production secrets should be managed through Coolify.
* Environment-specific behavior must be explicit and reviewable.

---

## HTTPS, Domains, And Routing

Production traffic should use HTTPS.

Rules:

* Public frontend traffic must use HTTPS.
* Backend API traffic exposed to browsers must use HTTPS.
* Cookie security settings must match the deployment topology.
* CORS and cookie domain settings must be configured deliberately.
* Frontend and backend may use separate subdomains if that keeps routing and security clearer.

Example conceptual domains:

```text
app.skillmatch.example      → Frontend
api.skillmatch.example      → Backend API
```

Final domain names are not decided by this ADR.

---

## Observability And Operations

Coolify-provided logs and service status may be sufficient for early MVP operation.

Minimum expectations:

* Application logs must be accessible to the operator.
* Backend errors must avoid leaking secrets or private user content.
* Failed deployments must be diagnosable from logs.
* Disk usage should be monitored because PostgreSQL, Docker images, and backups share VPS resources.
* Operational runbooks should be added before production launch for deploy, rollback, backup, restore, and incident response.

Advanced observability is not required for the MVP unless production needs justify it.

---

## Rollback And Release Policy

The MVP should support a simple rollback path.

Requirements:

* Deployments should be tied to Git commits or immutable build artifacts where practical.
* The operator should know how to redeploy a previous working version.
* Database migrations must be reviewed carefully because application rollback does not automatically roll back data shape.
* Destructive migrations require extra caution and backup verification.
* Production deployment should happen only after required checks pass.

---

## Preview And Staging Environments

Preview environments are useful but not mandatory for the MVP.

The initial deployment approach may use:

* Local development for fast iteration.
* One production-like staging deployment if practical.
* Production deployment on the VPS.

If Coolify preview deployments are easy to configure safely, they may be introduced later.

The absence of preview environments must be compensated by disciplined local checks, testing, and careful production deployment.

---

## Consequences

Benefits:

* Uses infrastructure already available to the project owner.
* Keeps hosting costs predictable for the MVP.
* Fits containerized frontend, backend, and PostgreSQL services.
* Avoids Kubernetes and complex cloud infrastructure.
* Keeps deployment understandable for a small open-source project.
* Preserves future migration path because services remain containerized.

Costs:

* The project owner becomes responsible for VPS operations.
* Availability depends on a single VPS unless later architecture changes.
* PostgreSQL backups and restore must be managed explicitly.
* Disk, memory, Docker images, and backup storage require monitoring.
* Security updates and operational maintenance are not outsourced to a fully managed platform.
* Preview environments may be less automatic than managed platforms.

---

## Rejected Alternative: Kubernetes For MVP

Kubernetes is rejected for the MVP.

It would add orchestration complexity, operational overhead, and cognitive load far beyond current needs.

SkillMatch does not currently require independent scaling, multi-node orchestration, service mesh behavior, or complex deployment topology.

---

## Rejected Alternative: Fully Managed App Platform First

Platforms such as Render, Railway, Heroku-style platforms, Vercel plus a managed backend, or similar services remain valid alternatives.

They are not selected first because the project already has a VPS with Coolify available and the MVP can reasonably operate there.

A managed platform may be reconsidered if operational burden, reliability needs, preview environments, team collaboration, or database operations become more important than VPS control and cost predictability.

---

## Rejected Alternative: Frontend-Only Hosting With Backend Elsewhere

Deploying the frontend to a static/frontend platform while running the backend and database elsewhere is not selected for the initial MVP.

It would add another provider and more cross-origin/session configuration before the product needs that separation.

This may be reconsidered later if frontend CDN performance, preview deployments, or collaboration workflows justify it.

---

## Review Triggers

This decision should be revisited if:

* The VPS becomes unreliable or underpowered.
* PostgreSQL backup/restore risk becomes unacceptable.
* The project needs higher availability than a single VPS can provide.
* Coolify becomes a bottleneck or operational burden.
* Preview environments become important for collaboration.
* Traffic, storage, or compute needs exceed the VPS comfortably.
* Security or compliance requirements demand managed infrastructure.
