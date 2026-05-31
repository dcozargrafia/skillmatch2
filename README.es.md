# SkillMatch

[English](README.md)

SkillMatch es una plataforma open source que conecta personas con habilidades digitales y organizaciones sin fines de lucro mediante microproyectos tecnológicos bien acotados.

El proyecto está actualmente en fase de especificación. La especificación es la fuente de verdad hasta que empiece la implementación.

---

## Qué hace SkillMatch

SkillMatch ayuda a organizaciones sin fines de lucro a publicar necesidades tecnológicas estructuradas y ayuda a contributors a aplicar sus habilidades en proyectos con impacto social.

La plataforma cubre el ciclo de colaboración desde el descubrimiento de proyectos hasta la selección del contributor, la entrega de deliverables, la validación, la finalización del proyecto y la emisión de certificados.

---

## Para quién es

### Contributors

Personas que quieren aplicar habilidades digitales en proyectos reales de impacto social.

Esto puede incluir estudiantes, perfiles junior, personas en transición profesional, perfiles autodidactas, profesionales con experiencia, freelancers y voluntarios.

### NGOs

Organizaciones sin fines de lucro que necesitan apoyo tecnológico práctico para iniciativas específicas y bien definidas.

### Administrators

Operadores de la plataforma responsables de confianza, seguridad, verificación de NGOs, gobernanza del catálogo y moderación.

---

## Principios de producto

SkillMatch se guía por estos principios:

- Impact First
- Skills Over Credentials
- Trust Over Restrictions
- Simplicity Over Complexity
- Guided Collaboration
- Micro-Projects First
- Inclusivity By Design
- Transparency And Accountability

Estos principios no son decoración. Limitan y orientan las decisiones de producto y tecnología.

---

## Qué no es SkillMatch

SkillMatch no pretende ser:

- Una red social
- Un portal de empleo
- Una plataforma de reclutamiento
- Un marketplace freelance
- Una plataforma de consultoría
- Una suite de gestión de proyectos
- Una plataforma de mensajería general
- Un sistema de alojamiento de archivos

El producto se mantiene enfocado en colaboración estructurada entre contributors digitales y NGOs.

---

## Estado actual

El proyecto ya completó las áreas de especificación de producto, requisitos funcionales, modelo de dominio, user flows y estructura de UI.

Áreas de especificación completadas:

- Product brief
- Definición de scope y MVP
- Roles y permisos
- Módulos de functional requirements
- Domain model
- User flows
- UI structure

Próximas áreas de especificación:

- API specification
- Data model
- Architecture
- Non-functional requirements
- SDD execution plan

Ver [`specs/README.md`](specs/README.md) para el tracker completo de especificación.

---

## Estructura de especificación

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

## Enfoque de desarrollo

Este repositorio sigue Specification Driven Development.

Antes de implementar:

1. Definir el comportamiento de producto.
2. Resolver reglas de negocio.
3. Identificar estados y transiciones.
4. Revisar consistencia entre especificaciones.
5. Recién entonces avanzar hacia arquitectura e implementación.

La implementación debe seguir la especificación aprobada en lugar de inventar comportamiento por comodidad.

---

## Contribuir

El proyecto todavía no está listo para contribuciones de código.

Por ahora, las contribuciones útiles son revisión de especificaciones, chequeos de consistencia, modelado de dominio y clarificación de reglas de producto.

Cuando empiece la implementación, se agregarán guías de contribución aquí.

---

## Licencia

La licencia todavía no fue definida.
