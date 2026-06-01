## Exploration: Phase 0 Project Foundation

### Current State

The SkillMatch repository is currently specification-complete but implementation-empty. All 12 spec documents and 10 ADRs are accepted and present. The `openspec/config.yaml` exists with a designated but uninstalled tool stack. There is **no** application code, **no** workspace configuration, **no** tooling, **no** tests, and **no** environment setup yet. The `.gitignore` only excludes `.atl/`. `AGENTS.md` and `README.md` describe the intended workflow but the repository itself contains only documentation and metadata.

### Affected Areas

- **Root directory** — Needs `pnpm-workspace.yaml`, root `package.json`, expanded `.gitignore`, and root tooling scripts.
- **`apps/api/`** — Does not exist. Needs Fastify + TypeScript skeleton with Clean/Hexagonal folder placeholders, a minimal `main.ts`, and Vitest config.
- **`apps/web/`** — Does not exist. Needs React + Vite + TypeScript skeleton with product-area folders, i18n scaffolding, and Vitest + React Testing Library config.
- **`packages/shared/`** — Does not exist. Needs a minimal shared-types package (genuinely shared only, no business logic dumping).
- **`packages/config/`** — Does not exist. Optional shared TS / tooling configs if useful.
- **`docker/`** — Does not exist. Needs at least a `docker-compose.yml` or Dockerfile stubs for local PostgreSQL and future Coolify compatibility.
- **`specs/`** — Already complete. Phase 0 must not modify product specs.
- **`openspec/`** — Already initialized. Needs a `changes/` entry for this exploration artifact.

### Approaches

1. **Bootstrap-first (recommended)** — Create the full monorepo skeleton in one coherent commit set: pnpm workspaces, both app skeletons, shared packages, minimal smoke tests, example env files, and root quality-gate scripts.
   - Pros: Gives contributors a complete runnable foundation immediately. Aligns with Phase 0 acceptance criteria. Reduces future “fix the foundation while building features” friction.
   - Cons: Slightly larger initial change (~50–100 files), but all scaffolding with zero product logic.
   - Effort: Medium

2. **Incremental slice-by-slice** — Start with pnpm workspaces and root tooling, then add backend skeleton, then frontend skeleton, then Docker, then docs.
   - Pros: Smaller individual PRs; easier to review each slice.
   - Cons: Slower to reach a “clone and run” state; intermediate commits may leave the repo in a broken/unrunnable state; more orchestration overhead.
   - Effort: Medium (more coordination, similar total work)

3. **Use a starter template** — Adopt an existing Vite + Fastify monorepo template and adapt it.
   - Pros: Faster initial file creation.
   - Cons: High risk of importing opinions that conflict with ADRs (e.g., NestJS, Next.js, Express, or non-pnpm package manager). Cleanup often exceeds value.
   - Effort: Low initially, High to align with specs

### Recommendation

Use **Approach 1 (Bootstrap-first)** but deliver it as **2–3 chained work-unit commits** so review remains focused:

1. **Commit 1**: Root workspace — `pnpm-workspace.yaml`, root `package.json`, shared packages, `.gitignore`, and root scripts (`format`, `lint`, `typecheck`, `test`, `build`).
2. **Commit 2**: Backend skeleton — `apps/api/` with Fastify, TypeScript, minimal `main.ts`, folder structure per ADR 0002/0004, Prisma placeholder, Vitest smoke test.
3. **Commit 3**: Frontend skeleton — `apps/web/` with React, Vite, TypeScript, product-area folders, i18n placeholder per ADR 0009, Ant Design dependency (wrapped later), Vitest + RTL smoke test, plus Docker/local-dev docs.

This gives the smallest useful foundation path while keeping each unit reviewable under the 400-line budget.

### Risks

- **Scope creep into product workflows**: Empty folder placeholders for modules (e.g., `apps/api/src/modules/accounts/`) are fine, but any real auth logic or schema would violate Phase 0 scope.
- **Tooling choice drift**: Linter and formatter are still TBD in `openspec/config.yaml`. Phase 0 should resolve this (recommend Biome for speed and monorepo simplicity, or ESLint+Prettier if team preference is strong).
- **Prisma leakage**: If Prisma Client is imported outside `infrastructure/` in the initial skeleton, it establishes a bad pattern before product code arrives.
- **i18n namespace explosion**: Creating all translation files upfront is okay, but empty files should be minimal to avoid maintenance noise.
- **Docker/Coolify mismatch**: Early Dockerfiles should avoid baking local-only paths or secrets, and should expose the correct start/build commands that Coolify will call.

### Ready for Proposal

**Yes.** The specs and ADRs provide a complete enough baseline to propose the foundation work. The orchestrator should tell the user that:

1. Phase 0 is ready to be broken into a concrete proposal.
2. The only open tooling question is linter/formatter (Biome vs ESLint+Prettier); this should be decided in the proposal or design phase.
3. No product workflows will be implemented — only structural scaffolding, smoke tests, and documented commands.
4. The acceptance criteria from `specs/12-phase-0-project-foundation.md` are clear and measurable.
