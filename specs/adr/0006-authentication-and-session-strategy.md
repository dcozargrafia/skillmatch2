# ADR 0006: Authentication And Session Strategy

## Status

Accepted

## Context

SkillMatch needs an authentication and session strategy before Phase 1 implementation begins.

The decision must support:

* Contributor and NGO self-registration.
* Administrator accounts that are not self-registered.
* Login and logout.
* Password recovery foundation.
* Account states such as Active and Disabled.
* Backend-enforced authorization for protected workflows.
* A React frontend consuming a Fastify backend API.
* A modular monolith where the backend is the source of truth for account state, roles, ownership, and workflow permissions.

The strategy must remain simple enough for the MVP while avoiding unsafe shortcuts around browser session handling, password recovery, and authorization.

---

## Decision

SkillMatch will use first-party email/password authentication for the MVP, backed by opaque server-side sessions stored in secure HTTP cookies.

The browser must not store meaningful authentication claims.

Recommended session characteristics:

| Concern | Decision |
| ------- | -------- |
| Authentication method | First-party email/password for Contributors and NGOs. |
| Administrator provisioning | Administrators are provisioned through a controlled internal process, not public self-registration. |
| Browser session transport | Secure HTTP cookies. |
| Session token type | Opaque session identifier with no business meaning on the client. |
| Session state | Stored server-side in the backend persistence layer or a compatible server-side session store. |
| Cookie protections | `HttpOnly`, `Secure`, and appropriate `SameSite` configuration. |
| Logout | Server-side session invalidation plus cookie clearing. |
| Disabled accounts | Checked by the backend before allowing authenticated workflow actions. |
| Authorization | Separate from authentication and enforced by backend use cases/API boundaries. |

The session identifier should only identify a server-side session record. User role, account state, permissions, and workflow access must be resolved by the backend.

---

## Security Requirements

The implementation must follow current secure session-management practices.

Requirements:

* Session identifiers must be generated with cryptographically secure randomness.
* Session identifiers must not contain user data, role data, permissions, or workflow state.
* Session data must be stored server-side.
* Session cookies must not be readable by frontend JavaScript.
* Logout must invalidate the server-side session.
* Password recovery tokens must be short-lived, single-use, and stored safely.
* Authentication and password recovery responses must avoid unnecessary account enumeration.
* Sensitive authentication endpoints must support abuse prevention such as rate limiting.
* Account state must be checked after authentication, not assumed from stale client state.

Reference guidance:

* [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
* [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).
* [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html).
* [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

---

## CSRF Policy

Because browser cookies are sent automatically, SkillMatch must explicitly consider CSRF protection for state-changing requests.

Minimum policy:

* Use `SameSite` cookies as a defense-in-depth control.
* State-changing API requests must not rely on `SameSite` alone if deployment topology, browser behavior, or cross-origin frontend/backend separation makes CSRF realistic.
* If needed, add a CSRF token or equivalent anti-CSRF mechanism for unsafe methods.
* Safe methods such as `GET` must not change server state.

The exact CSRF mechanism may be finalized during implementation, but the architecture must not assume cookies are sufficient by themselves in every deployment.

---

## Password Recovery Policy

Password recovery must be treated as an authentication-sensitive workflow.

Requirements:

* Recovery requests should produce a generic response regardless of whether the email exists.
* Recovery tokens must be random, short-lived, single-use, and invalidated after successful password reset.
* Recovery tokens should be stored hashed or otherwise protected at rest.
* Password reset must not automatically reveal account existence or account state.
* Successful password reset should invalidate existing sessions where practical.

---

## Authorization Boundary

Authentication only proves who the requester is.

It does not decide what the requester can do.

Authorization must remain a backend responsibility and must consider:

* Account role.
* Account state.
* Resource ownership.
* NGO verification status.
* Project state.
* Application state.
* Assignment relationship.
* Deliverable state.
* Administrative permission and reason requirements.

The frontend may use session/current-account data to improve navigation and display, but frontend checks are never security boundaries.

---

## Consequences

Benefits:

* Simple mental model for the MVP.
* Strong fit with a modular monolith.
* Supports real logout and server-side revocation.
* Keeps authorization decisions fresh and backend-owned.
* Avoids exposing meaningful authentication claims to the browser.
* Avoids premature complexity around token rotation and stateless authentication.

Costs:

* The backend must implement session storage, expiration, logout, and cleanup.
* Cookie-based sessions require explicit CSRF consideration.
* First-party password authentication creates responsibility for password hashing, recovery, rate limiting, and abuse prevention.
* Future external authentication providers may require an additional integration layer.

---

## Rejected Alternative: JWT Browser Sessions For The MVP

JWT-based browser sessions are not recommended for the MVP.

JWTs are useful in some architectures, but they add unnecessary complexity for SkillMatch's current shape.

Reasons:

* Stateless tokens make immediate revocation harder.
* Logout can become less reliable unless additional server-side state is introduced.
* Token claims may become stale when roles, account state, or permissions change.
* The team may be tempted to treat frontend-decoded claims as authorization truth.
* The MVP does not currently need mobile clients, public API consumers, microservices, or distributed stateless authentication.

JWTs may be reconsidered later if SkillMatch introduces public APIs, mobile applications, external integrations, or distributed services that justify that tradeoff.

---

## Rejected Alternative: External Authentication Provider As Mandatory MVP Dependency

A hosted authentication provider is not required for the MVP decision.

Benefits would include reduced responsibility for some authentication flows and possible future support for social login, MFA, passkeys, or enterprise identity.

However, making it mandatory now would add:

* Vendor dependency before product behavior is validated.
* Additional integration complexity.
* Potential mismatch with the simple Contributor/NGO/Admin role model.
* More moving parts during early implementation.

External authentication providers may be reconsidered if operational security needs, social login, passkeys, MFA, or compliance requirements make the tradeoff worthwhile.

---

## Implementation Notes

This ADR does not choose a specific Fastify plugin or password-hashing library.

Those choices must preserve the architectural decision:

* Framework code stays at the HTTP/infrastructure boundary.
* Domain and application logic do not depend on session plugin internals.
* Use cases receive authenticated actor context from the API/application boundary.
* Authorization remains explicit in use cases or policy services.
* Session persistence is accessed through infrastructure adapters.

Password hashing parameters and concrete libraries should be selected during implementation using current security guidance.

---

## Review Triggers

This decision should be revisited if:

* SkillMatch introduces mobile clients or public API consumers.
* Independent backend services require distributed authentication.
* Passkeys, MFA, social login, or enterprise identity become MVP requirements.
* Session storage becomes an operational bottleneck.
* Deployment topology makes cookie-based browser sessions impractical.
* Security review recommends a different authentication model.
