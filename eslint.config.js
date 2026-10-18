// ESLint flat config for the whole monorepo. Run with `npm run lint`.
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['**/dist/', '**/coverage/', '**/node_modules/']),

  // Every JS/TS file: core rules + TypeScript rules that use type information
  // (e.g. catching a forgotten `await` on a Mongoose query).
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        // Finds the right tsconfig for each file automatically, including the
        // tsconfig.test.json / tsconfig.node.json files behind each workspace's tsconfig.json.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow intentionally unused arguments when prefixed with _, e.g. Express's (_req, res).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Node code: the API, shared package, and root config files.
  {
    files: ['services/**/*.ts', 'packages/**/*.ts', '*.{js,ts}', 'apps/*/vite.config.ts'],
    languageOptions: { globals: globals.node },
  },

  // React code in the web app.
  {
    files: ['apps/returns-web/src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: { globals: globals.browser },
  },

  // Root config files (this file, vitest.config.ts) aren't part of any tsconfig,
  // so type-aware rules are switched off for them.
  {
    files: ['*.{js,ts}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
]);
