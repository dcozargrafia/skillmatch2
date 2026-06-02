import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const sharedIgnores = [
  "**/node_modules/**",
  "**/dist/**",
  "**/coverage/**",
  "**/.turbo/**",
  "**/.vite/**",
  "**/.pnpm-store/**",
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
];

const codeFiles = ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"];
const browserFiles = ["apps/web/**/*.{ts,tsx}"];
const nodeFiles = [
  "apps/api/**/*.{ts,js,mjs,cjs}",
  "packages/**/*.{ts,js,mjs,cjs}",
  "*.{js,mjs,cjs}",
  "*.{ts,mts,cts}",
  "**/*.{config,test}.{js,mjs,cjs,ts,mts,cts}",
];

const vitestGlobals = {
  afterAll: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  beforeEach: "readonly",
  describe: "readonly",
  expect: "readonly",
  it: "readonly",
  test: "readonly",
  vi: "readonly",
};

export default tseslint.config(
  {
    ignores: sharedIgnores,
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: codeFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    files: browserFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: nodeFiles,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/tests/**/*.{ts,tsx,js,mjs,cjs}", "**/*.test.{ts,tsx,js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...vitestGlobals,
      },
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);
