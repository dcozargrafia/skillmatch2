# Project Specification Guide

## Objetivo

Este documento define la estructura de especificación que se utilizará para diseñar y documentar el proyecto antes de comenzar el desarrollo.

El objetivo es disponer de una documentación clara, profesional y orientada a SDD (Specification Driven Development), permitiendo que humanos y agentes de IA puedan comprender, planificar e implementar el sistema de forma consistente.

---

# Estructura de documentación

```text
specs/
├── 00-product-brief.md
├── 01-scope-and-mvp.md
├── 02-roles-and-permissions.md
├── 03-functional-requirements.md
├── 04-domain-model.md
├── 05-user-flows.md
├── 06-ui-structure.md
├── 07-api-spec.md
├── 08-data-model.md
├── 09-architecture.md
├── 10-non-functional-requirements.md
├── 11-sdd-execution-plan.md
└── adr/
    ├── 0001-tech-stack.md
    ├── 0002-frontend-architecture.md
    ├── 0003-backend-architecture.md
    └── 0004-auth-strategy.md
```

---

# 00-product-brief.md

## Propósito

Definir la visión general del producto.

Este documento responde a la pregunta:

> ¿Qué estamos construyendo y por qué?

## Debe incluir

* Descripción del producto
* Problema que resuelve
* Usuarios objetivo
* Propuesta de valor
* Beneficios principales
* Objetivos del proyecto
* Qué NO es el producto

## Resultado esperado

Una visión compartida que sirva de referencia para todas las decisiones posteriores.

---

# 01-scope-and-mvp.md

## Propósito

Definir claramente el alcance.

Este documento responde a la pregunta:

> ¿Qué entra y qué no entra en esta versión?

## Debe incluir

### MVP

Funcionalidades imprescindibles.

### Post-MVP

Funcionalidades deseables para futuras versiones.

### Fuera de alcance

Funcionalidades que deliberadamente no se implementarán.

### Prioridades

Clasificación de funcionalidades:

* Críticas
* Importantes
* Opcionales

## Resultado esperado

Evitar el crecimiento descontrolado del proyecto.

---

# 02-roles-and-permissions.md

## Propósito

Definir actores y permisos.

Este documento responde a la pregunta:

> ¿Quién puede hacer qué?

## Debe incluir

### Roles

* Visitante
* Estudiante
* ONG
* Administrador

### Permisos

Acciones permitidas por cada rol.

### Visibilidad

Información pública y privada.

## Resultado esperado

Base para autenticación y autorización.

---

# 03-functional-requirements.md

## Propósito

Definir el comportamiento funcional del sistema.

Este documento responde a la pregunta:

> ¿Qué debe hacer el producto?

## Debe incluir

Módulos funcionales como:

* Registro
* Autenticación
* Perfil de estudiante
* Perfil de ONG
* Skills
* Proyectos
* Postulaciones
* Matching
* Entregables
* Certificados
* Valoraciones
* Notificaciones
* Administración

Para cada módulo:

* Objetivo
* Reglas de negocio
* Restricciones
* Casos especiales

## Resultado esperado

Fuente principal para implementar funcionalidades.

---

# 04-domain-model.md

## Propósito

Definir el dominio de negocio.

Este documento responde a la pregunta:

> ¿Qué conceptos existen en el sistema?

## Debe incluir

### Entidades

Ejemplo:

* User
* Student
* NGO
* Project
* Application
* Deliverable
* Certificate
* Review
* Notification

### Relaciones

Cómo se conectan entre sí.

### Reglas de negocio

Restricciones importantes del dominio.

### Estados

Estados posibles de entidades relevantes.

## Resultado esperado

Modelo conceptual estable del negocio.

---

# 05-user-flows.md

## Propósito

Documentar recorridos completos de usuario.

Este documento responde a la pregunta:

> ¿Cómo se usa el sistema?

## Debe incluir

Flujos como:

* Registro de estudiante
* Registro de ONG
* Creación de proyecto
* Postulación
* Asignación
* Entrega de entregables
* Validación
* Finalización de proyecto
* Generación de certificado

## Resultado esperado

Validar la experiencia de usuario antes de construir pantallas.

---

# 06-ui-structure.md

## Propósito

Definir la estructura de la interfaz.

Este documento responde a la pregunta:

> ¿Qué pantallas existen?

## Debe incluir

### Área pública

* Home
* Catálogo de proyectos
* Detalle de proyecto
* Perfil de ONG
* Página de impacto

### Área estudiante

* Dashboard
* Perfil
* Proyectos
* Certificados

### Área ONG

* Dashboard
* Gestión de proyectos
* Gestión de postulaciones

### Área admin

* Validaciones
* Skills
* Moderación

## Resultado esperado

Mapa funcional de navegación.

---

# 07-api-spec.md

## Propósito

Definir el contrato de la API.

Este documento responde a la pregunta:

> ¿Cómo se comunican frontend y backend?

## Debe incluir

### Recursos

* Users
* Projects
* Applications
* Deliverables
* Reviews
* Certificates

### Endpoints

### Requests

### Responses

### Errores

### Autorización

## Resultado esperado

Contrato estable para frontend y backend.

---

# 08-data-model.md

## Propósito

Definir el modelo de persistencia.

Este documento responde a la pregunta:

> ¿Cómo se almacenan los datos?

## Debe incluir

### Tablas

### Campos

### Relaciones

### Índices

### Restricciones

### Enums

## Resultado esperado

Base sólida para diseño de base de datos.

---

# 09-architecture.md

## Propósito

Definir la arquitectura técnica.

Este documento responde a la pregunta:

> ¿Cómo estará construido el sistema?

## Debe incluir

### Frontend

### Backend

### Base de datos

### Autenticación

### Almacenamiento de archivos

### Notificaciones

### Testing

### Despliegue

### Organización de carpetas

### Patrones arquitectónicos

## Resultado esperado

Guía técnica para todas las implementaciones.

---

# 10-non-functional-requirements.md

## Propósito

Definir requisitos de calidad.

Este documento responde a la pregunta:

> ¿Cómo debe comportarse el sistema?

## Debe incluir

### Seguridad

### Rendimiento

### Accesibilidad

### Disponibilidad

### Logging

### Monitorización

### Manejo de errores

### Escalabilidad

### Mantenibilidad

## Resultado esperado

Criterios técnicos transversales.

---

# 11-sdd-execution-plan.md

## Propósito

Convertir la especificación en un plan de ejecución para agentes.

Este documento responde a la pregunta:

> ¿Cómo se implementará el proyecto?

## Debe incluir

### Fases

### Dependencias

### Orden de implementación

### Criterios de aceptación

### Estrategia de testing

### Reglas para agentes

### Restricciones de implementación

## Resultado esperado

Plan de ejecución compatible con SDD.

---

# ADRs

## Propósito

Registrar decisiones importantes.

ADR significa:

Architecture Decision Record

## Formato

Cada ADR debe contener:

### Contexto

¿Qué problema existe?

### Decisión

¿Qué se decidió?

### Consecuencias

Ventajas y desventajas.

---

# ADRs recomendados

## 0001-tech-stack.md

Tecnologías seleccionadas.

## 0002-frontend-architecture.md

Arquitectura del frontend.

## 0003-backend-architecture.md

Arquitectura del backend.

## 0004-auth-strategy.md

Estrategia de autenticación y autorización.

## 0005-certificate-generation.md

Generación de certificados PDF.

## 0006-notification-system.md

Sistema de notificaciones.

---

# Orden recomendado de elaboración

1. 00-product-brief.md
2. 01-scope-and-mvp.md
3. 02-roles-and-permissions.md
4. 03-functional-requirements.md
5. 04-domain-model.md
6. 05-user-flows.md
7. 06-ui-structure.md
8. 09-architecture.md
9. 08-data-model.md
10. 07-api-spec.md
11. 10-non-functional-requirements.md
12. 11-sdd-execution-plan.md
13. ADRs

---

# Metodología de trabajo

Cada documento deberá:

1. Definirse primero a nivel funcional.
2. Revisarse antes de pasar al siguiente.
3. Mantener coherencia con los documentos anteriores.
4. Evitar decisiones técnicas prematuras.
5. Priorizar claridad frente a complejidad.

La especificación tendrá prioridad sobre la implementación.

No se comenzará el desarrollo hasta disponer de una visión clara del producto, alcance, dominio y arquitectura.
