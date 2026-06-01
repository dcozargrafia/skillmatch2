import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const currentDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = resolve(currentDir, "../../../");

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mts", ".cts"]);
const ignoredDirectories = new Set([
  "node_modules",
  "dist",
  "coverage",
  ".git",
  ".pnpm-store",
  "openspec"
]);

const forbiddenPhaseOnePatterns = [
  /\bregister(?:User|Account)?\b/i,
  /\blogin\b/i,
  /\bpasswordHash\b/i,
  /\bauth(?:entication|orization)?\b/i,
  /\bcontributorProfile\b/i,
  /\bcreateProject\b/i,
  /\bprojectApplication\b/i,
  /\bdeliverable\b/i,
  /\bnotification\b/i,
  /\bcertificate\b/i
];

function listFilesRecursively(directoryPath: string): string[] {
  const entries = readdirSync(directoryPath, { withFileTypes: true });
  const result: string[] = [];

  for (const entry of entries) {
    const absolutePath = resolve(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        result.push(...listFilesRecursively(absolutePath));
      }
      continue;
    }

    if (entry.isFile()) {
      result.push(absolutePath);
    }
  }

  return result;
}

function normalizePath(path: string): string {
  return path.split("\\").join("/");
}

function extractImportSpecifiers(content: string): string[] {
  const namedImports = [...content.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1]);
  const sideEffectImports = [...content.matchAll(/import\s+["']([^"']+)["']/g)].map((match) => match[1]);
  const dynamicImports = [...content.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g)].map((match) => match[1]);

  return [...namedImports, ...sideEffectImports, ...dynamicImports];
}

function isApiSpecifier(specifier: string): boolean {
  return specifier === "@skillmatch/api" || specifier.startsWith("@skillmatch/api/");
}

function isWebSpecifier(specifier: string): boolean {
  return specifier === "@skillmatch/web" || specifier.startsWith("@skillmatch/web/");
}

function fileContainsForbiddenCrossImport(filePath: string): string[] {
  const content = readFileSync(filePath, "utf8");
  const importSpecifiers = extractImportSpecifiers(content);
  const relativeImports = importSpecifiers
    .filter((specifier) => specifier.startsWith("."))
    .map((specifier) => normalizePath(resolve(dirname(filePath), specifier)));

  const normalizedFilePath = normalizePath(filePath);
  const violations: string[] = [];

  const isFrontend = normalizedFilePath.includes("/apps/web/");
  const isBackend = normalizedFilePath.includes("/apps/api/");
  const isSharedPackage = normalizedFilePath.includes("/packages/");

  if (isFrontend) {
    if (importSpecifiers.some((specifier) => specifier.includes("apps/api") || isApiSpecifier(specifier))) {
      violations.push("frontend imports backend package/internal path");
    }
    if (relativeImports.some((specifier) => specifier.includes("/apps/api/"))) {
      violations.push("frontend relative import resolves to apps/api");
    }
  }

  if (isBackend) {
    if (importSpecifiers.some((specifier) => specifier.includes("apps/web") || isWebSpecifier(specifier))) {
      violations.push("backend imports frontend package/internal path");
    }
    if (relativeImports.some((specifier) => specifier.includes("/apps/web/"))) {
      violations.push("backend relative import resolves to apps/web");
    }
  }

  if (isSharedPackage) {
    if (
      importSpecifiers.some(
        (specifier) =>
          specifier.includes("apps/api") ||
          specifier.includes("apps/web") ||
          isApiSpecifier(specifier) ||
          isWebSpecifier(specifier)
      )
    ) {
      violations.push("shared package imports app internals by specifier");
    }
    if (
      relativeImports.some(
        (specifier) => specifier.includes("/apps/api/") || specifier.includes("/apps/web/")
      )
    ) {
      violations.push("shared package relative import resolves to app internals");
    }
  }

  return violations;
}

describe("Phase 0 architecture and scope guards", () => {
  it("detects frontend to backend import violations in fixtures", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "skillmatch-guard-import-"));
    const webFile = resolve(fixtureRoot, "apps/web/src/illegal.ts");

    mkdirSync(resolve(webFile, ".."), { recursive: true });

    writeFileSync(
      webFile,
      'import { createApp } from "@skillmatch/api";\nimport "@skillmatch/api/internal";\nawait import("@skillmatch/api/runtime");\n'
    );

    try {
      const violations = fileContainsForbiddenCrossImport(webFile);
      expect(violations).toContain("frontend imports backend package/internal path");
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("detects backend to frontend import violations in fixtures", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "skillmatch-guard-import-"));
    const apiFile = resolve(fixtureRoot, "apps/api/src/illegal.ts");

    mkdirSync(resolve(apiFile, ".."), { recursive: true });

    writeFileSync(
      apiFile,
      'import { App } from "@skillmatch/web";\nimport "@skillmatch/web/internal";\nawait import("@skillmatch/web/runtime");\n'
    );

    try {
      const violations = fileContainsForbiddenCrossImport(apiFile);
      expect(violations).toContain("backend imports frontend package/internal path");
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("detects shared package to app import violations in fixtures", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "skillmatch-guard-import-"));
    const sharedFile = resolve(fixtureRoot, "packages/shared/src/illegal.ts");

    mkdirSync(resolve(sharedFile, ".."), { recursive: true });

    writeFileSync(
      sharedFile,
      'import { createApp } from "@skillmatch/api";\nimport "@skillmatch/api/internal";\nimport { App } from "@skillmatch/web";\nawait import("@skillmatch/web/runtime");\n'
    );

    try {
      const violations = fileContainsForbiddenCrossImport(sharedFile);
      expect(violations).toContain("shared package imports app internals by specifier");
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("detects Phase 1+ workflow keywords in source-like content", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "skillmatch-guard-scope-"));
    const apiFile = resolve(fixtureRoot, "apps/api/src/module.ts");

    mkdirSync(resolve(apiFile, ".."), { recursive: true });

    writeFileSync(apiFile, "export const login = () => 'forbidden in phase 0';\n");

    try {
      const content = readFileSync(apiFile, "utf8");
      const hasForbiddenPattern = forbiddenPhaseOnePatterns.some((pattern) => pattern.test(content));
      expect(hasForbiddenPattern).toBe(true);
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("rejects forbidden frontend/backend/shared cross-boundary imports", () => {
    const allFiles = listFilesRecursively(repoRoot).filter((filePath) => {
      const normalized = normalizePath(filePath);
      return sourceExtensions.has(extname(filePath)) && normalized.includes("/src/");
    });

    const violations: string[] = [];

    for (const filePath of allFiles) {
      const fileViolations = fileContainsForbiddenCrossImport(filePath);
      for (const violation of fileViolations) {
        violations.push(`${normalizePath(filePath)} -> ${violation}`);
      }
    }

    expect(violations).toEqual([]);
  });

  it("keeps product workflow areas placeholder-only during Phase 0", () => {
    const placeholderRoots = [
      resolve(repoRoot, "apps/api/src/modules"),
      resolve(repoRoot, "apps/web/src/areas/public"),
      resolve(repoRoot, "apps/web/src/areas/contributor"),
      resolve(repoRoot, "apps/web/src/areas/ngo"),
      resolve(repoRoot, "apps/web/src/areas/admin")
    ];

    const violations: string[] = [];

    for (const root of placeholderRoots) {
      for (const filePath of listFilesRecursively(root)) {
        const normalized = normalizePath(filePath);
        const isReadme = normalized.endsWith("/README.md");
        if (!isReadme) {
          violations.push(`${normalized} -> non-placeholder file in Phase 0-only area`);
          continue;
        }

        const stats = statSync(filePath);
        if (!stats.isFile()) {
          violations.push(`${normalized} -> placeholder entry must be a file`);
        }
      }
    }

    const sourceTargets = [resolve(repoRoot, "apps/api/src"), resolve(repoRoot, "apps/web/src")]
      .flatMap((directoryPath) => listFilesRecursively(directoryPath))
      .filter((filePath) => sourceExtensions.has(extname(filePath)));

    for (const filePath of sourceTargets) {
      const content = readFileSync(filePath, "utf8");
      for (const pattern of forbiddenPhaseOnePatterns) {
        if (pattern.test(content)) {
          violations.push(`${normalizePath(filePath)} -> matches forbidden phase 1+ pattern ${pattern}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
