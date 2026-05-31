# AGENTS.md

# SkillMatch Agent Instructions

This repository follows a Specification Driven Development (SDD) workflow.

The specification is the source of truth.

Agents must prioritize consistency with the specification over implementation convenience.

---

# Project Overview

SkillMatch is a platform that connects contributors with digital skills and nonprofit organizations (NGOs) through technology-focused micro-projects.

The platform facilitates the complete collaboration lifecycle:

* Project publication
* Contributor applications
* Contributor selection
* Deliverable submission
* Deliverable validation
* Project completion
* Certificate generation

The project is open source and designed to create social impact through technology.

---

# Source Of Truth

Always consult the specification before making decisions.

Specification documents are located in:

```text
specs/
```

Key documents:

```text
README.md
00-product-brief.md
01-scope-and-mvp.md
02-roles-and-permissions.md
```

Future specification documents must remain consistent with previously approved documents.

If conflicts are discovered, raise them explicitly.

Do not silently invent behavior.

---

# Product Principles

All decisions must respect the Product Brief and Core Principles.

Especially:

* Impact First
* Skills Over Credentials
* Trust Over Restrictions
* Simplicity Over Complexity
* Guided Collaboration
* Micro-Projects First
* Inclusivity By Design
* Transparency And Accountability

---

# Scope Constraints

SkillMatch is intentionally limited in scope.

The platform is NOT:

* A social network
* A job marketplace
* A freelance marketplace
* A project management suite
* A messaging platform
* A file hosting platform

Avoid introducing features that move the product in these directions.

---

# Specification Workflow

Before implementation:

1. Understand the existing specification.
2. Identify missing requirements.
3. Identify contradictions.
4. Identify unresolved business rules.
5. Propose alternatives and tradeoffs.
6. Wait for approval when decisions are unclear.

Do not jump directly to implementation.

---

# Decision Making

Challenge assumptions when appropriate.

Do not automatically agree with proposals.

When evaluating a change:

* Explain benefits.
* Explain drawbacks.
* Explain complexity costs.
* Explain long-term maintenance implications.
* Suggest simpler alternatives when possible.

---

# Simplicity Rule

Prefer:

```text
Simple solution
+ Clear business rules
+ Low maintenance
```

over:

```text
Highly flexible solution
+ Additional complexity
+ Hypothetical future needs
```

Do not optimize for edge cases unless explicitly required.

---

# Documentation Standards

When creating specification documents:

* Use English.
* Be explicit.
* Avoid ambiguity.
* Define business rules clearly.
* Define states and transitions when relevant.
* Identify edge cases.
* Keep implementation details separate from functional requirements.

---

# Implementation Standards

When implementation eventually begins:

* Follow the specification.
* Keep changes small and focused.
* Avoid introducing functionality not present in the specification.
* Prefer maintainability over cleverness.
* Update documentation when behavior changes.

---

# Current Phase

Current project phase:

```text
Functional Specification
```

Completed:

* Product Brief
* Scope & MVP
* Roles & Permissions

Current target:

```text
03-functional-requirements.md
```

The goal is to fully define platform behavior before moving into architecture and implementation.
