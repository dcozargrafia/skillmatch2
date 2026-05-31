# ADR 0004: Database And Persistence Approach

## Status

Accepted

## Context

SkillMatch needs a database and persistence approach before persistent domain entities are implemented.

The system must persist relational and historical data such as:

* Accounts and role-specific profiles.
* NGO verification state and review history.
* Skills catalog, contributor skills, and project skills.
* Projects, deliverables, applications, assignments, and compatibility assessments.
* Deliverable submissions and reviews.
* Contextual comments.
* Notifications.
* Certificates and immutable certificate snapshots.
* Activity Records and Administrative Actions.

The data model requires strong integrity around:

* One contributor assigned per project.
* Application states: Submitted, Withdrawn, Accepted, Not Selected.
* Project completion only after all mandatory deliverables are approved.
* Certificate issuance from valid completion.
* Historical records and administrative reasons.
* Notifications remaining separate from Activity Records.

The main options considered were:

* PostgreSQL + Prisma ORM.
* PostgreSQL + Drizzle ORM.
* PostgreSQL with lower-level query builder or handwritten SQL.
* Non-relational document database.

---

## Decision

SkillMatch will use PostgreSQL as the primary database.

SkillMatch will use Prisma ORM for migrations and type-safe database access.

Prisma must be isolated inside infrastructure persistence adapters.

Domain and application layers must not import Prisma Client, Prisma models, or Prisma-specific types.

Recommended dependency direction:

```text
Application Use Cases
        ↓
Repository Ports
        ↓
Prisma Repository Adapters
        ↓
PostgreSQL
```

---

## Architectural Constraints

Persistence implementation must follow these constraints:

* PostgreSQL is the source of persisted relational data.
* Prisma is a persistence tool, not the domain model.
* Domain entities and value objects must remain independent from Prisma-generated types.
* Application use cases should depend on repository ports or equivalent persistence interfaces.
* Prisma Client usage should stay inside infrastructure adapters.
* Database transactions should be coordinated at application/infrastructure boundaries for critical workflow transitions.
* Critical database constraints should be enforced in PostgreSQL where practical.
* Business rules must still be enforced in application/domain logic, not only through database constraints.
* Migrations must be versioned and reviewed.
* Destructive migrations must require explicit review and safe rollout planning.

---

## Integrity Expectations

The database and persistence layer should support these integrity requirements:

| Area | Expectation |
| ---- | ----------- |
| Accounts | Unique login identity and preserved disabled-account history. |
| NGO Verification | Preserved review feedback, restriction reasons, and restoration history. |
| Applications | No manual Rejected state; accepted/not-selected outcomes preserved. |
| Assignment | One contributor per project. |
| Deliverables | Mandatory deliverables gate project completion. |
| Certificates | Certificate Snapshot remains stable after later profile/project edits. |
| Notifications | Notification state does not affect workflow state. |
| Activity | Activity Records survive notification read/archive actions. |
| Administration | Administrative Actions preserve actor, reason, target, timestamp, and effect. |

---

## Consequences

### Benefits

* PostgreSQL fits the relational and integrity-heavy SkillMatch domain.
* Prisma provides strong TypeScript developer experience.
* Prisma migrations reduce early migration-tooling decisions.
* Existing project knowledge includes some Prisma familiarity.
* Type-safe database access supports contributor productivity.
* PostgreSQL constraints and transactions can protect critical invariants.
* Prisma can be used effectively if isolated behind repository adapters.

### Tradeoffs

* Prisma schema may be mistaken for the domain model if boundaries are weak.
* Prisma Client can leak into application use cases if not reviewed carefully.
* Complex historical or reporting queries may require careful query design or raw SQL escape hatches.
* Prisma adds abstraction over SQL, which can hide some database behavior from less experienced contributors.
* Repository adapters add extra mapping code between Prisma records and domain/application models.

### Risks

The main risk is allowing Prisma-generated models to become the application domain.

This risk should be mitigated through strict dependency rules, repository ports, mapping at infrastructure boundaries, tests around domain/use-case behavior, and review of imports across layers.

---

## Rejected Alternatives

### PostgreSQL + Drizzle ORM

Drizzle was a strong alternative.

It is TypeScript-first, closer to SQL, and aligns well with explicit architecture and lower framework magic.

It was rejected for the MVP because the project has more existing Prisma familiarity, and adopting both Fastify and Drizzle would increase the amount of new tooling and conventions to learn at once.

Drizzle may be reconsidered if Prisma abstraction becomes a recurring obstacle for query clarity, migrations, or architectural boundaries.

### PostgreSQL with lower-level query builder or handwritten SQL

This option would provide maximum SQL control.

It was rejected for the MVP because it would increase boilerplate, migration conventions, mapping code, and onboarding cost too early.

### Non-relational document database

A document database was rejected because SkillMatch has a strongly relational domain with important cross-entity integrity, history, state transitions, and ownership relationships.

---

## Review Triggers

This decision should be revisited if:

* Prisma Client leaks repeatedly into domain or application layers.
* Prisma schema starts driving domain design instead of the approved specification.
* Critical queries become difficult or inefficient to express through Prisma.
* Migration workflow becomes unsafe or too restrictive.
* PostgreSQL constraints required by the domain are difficult to represent or maintain with Prisma.
* Contributor onboarding suffers because of repository/adapter mapping complexity.
