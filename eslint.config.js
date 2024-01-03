import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import solid from "eslint-plugin-solid/configs/typescript.js";
import globals from "globals";

/** @type { import("eslint").Linter.FlatConfig } */
const baseConfig = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const tsConfig = {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    "@typescript-eslint": ts,
  },
  languageOptions: {
    parser: tsParser,
  },
  rules: {
    ...ts.configs.recommended.rules,
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const solidConfig = {
  files: ["src/**/*.{ts,tsx}"],
  ...solid,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: "tsconfig.json",
    },
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const srcConfig = {
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    parserOptions: {
      sourceType: "module",
      project: "tsconfig.json",
    },
    globals: { ...globals.browser, ...globals.es2021 },
  },
  rules: {
    ...ts.configs["recommended-type-checked"].rules,
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const configConfig = {
  files: ["*.config.*"],
  languageOptions: {
    globals: { ...globals.node },
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const scriptConfig = {
  files: ["scripts/**/*"],
  languageOptions: {
    globals: { ...globals.node },
  },
};

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    ignores: [".output/*", ".wxt/*"],
  },
  js.configs.recommended,
  baseConfig,
  tsConfig,
  solidConfig,
  srcConfig,
  configConfig,
  scriptConfig,
  prettier,
];
