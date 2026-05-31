# SkillMatch

[Español](README.es.md)

SkillMatch is an open-source platform that connects people with digital skills and nonprofit organizations through focused technology micro-projects.

The project is currently in the specification phase. The specification is the source of truth until implementation begins.

---

## What SkillMatch does

SkillMatch helps nonprofit organizations publish structured technology needs and helps contributors apply their skills to meaningful projects.

The platform supports the collaboration lifecycle from project discovery to contributor selection, deliverable submission, validation, project completion, and certificate generation.

---

## Who it is for

### Contributors

People who want to apply digital skills to real-world social-impact projects.

This may include students, junior professionals, career changers, self-taught practitioners, experienced technologists, freelancers, and volunteers.

### NGOs

Nonprofit organizations that need practical technology support for specific, well-scoped initiatives.

### Administrators

Platform operators responsible for trust, safety, NGO verification, catalog governance, and moderation.

---

## Product principles

SkillMatch is guided by these principles:

- Impact First
- Skills Over Credentials
- Trust Over Restrictions
- Simplicity Over Complexity
- Guided Collaboration
- Micro-Projects First
- Inclusivity By Design
- Transparency And Accountability

These principles are not decoration. They constrain product and technical decisions.

---

## What SkillMatch is not

SkillMatch is intentionally not:

- A social network
- A job board
- A recruitment platform
- A freelance marketplace
- A consulting platform
- A project management suite
- A general-purpose messaging platform
- A file hosting platform

The product stays focused on structured collaboration between digital contributors and NGOs.

---

## Current status

The project has completed the product, functional, domain, user-flow, and UI-structure specification areas.

Completed specification areas:

- Product brief
- Scope and MVP definition
- Roles and permissions
- Functional requirements modules
- Domain model
- User flows
- UI structure

Next specification areas:

- API specification
- Data model
- Architecture
- Non-functional requirements
- SDD execution plan

See [`specs/README.md`](specs/README.md) for the full specification tracker.

---

## Specification structure

```text
specs/
├── 00-product-brief.md
├── 01-scope-and-mvp.md
├── 02-roles-and-permissions.md
├── 03-functional-requirements.md
├── functional-requirements/
│   ├── 01-project-lifecycle.md
│   ├── 02-deliverables.md
│   ├── 03-applications-and-assignment.md
│   ├── 04-ngo-verification.md
│   ├── 05-authentication-and-accounts.md
│   ├── 06-contributor-profiles.md
│   ├── 07-ngo-profiles.md
│   ├── 08-skills-catalog.md
│   ├── 09-project-discovery.md
│   ├── 10-skill-matching.md
│   ├── 11-collaboration-comments.md
│   ├── 12-notifications.md
│   ├── 13-certificates.md
│   └── 14-administration-and-moderation.md
├── 04-domain-model.md
├── 05-user-flows.md
├── 06-ui-structure.md
├── 07-api-spec.md
├── 08-data-model.md
├── 09-architecture.md
├── 10-non-functional-requirements.md
├── 11-sdd-execution-plan.md
├── adr/
└── README.md
```

---

## Development approach

This repository follows Specification Driven Development.

Before implementation:

1. Define product behavior.
2. Resolve business rules.
3. Identify states and transitions.
4. Check consistency across specifications.
5. Only then move into architecture and implementation.

Implementation must follow the approved specification rather than inventing behavior for convenience.

---

## Contributing

The project is not ready for code contributions yet.

For now, useful contributions are specification review, consistency checks, domain modeling, and product-rule clarification.

When implementation begins, contribution guidelines will be added here.

---

## License

License information has not been defined yet.
