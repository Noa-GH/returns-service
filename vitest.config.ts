import { defineConfig } from 'vitest/config';

// One `npm test` runs every workspace's tests. Each project keeps its own environment:
// Node for shared + API, jsdom (a simulated browser) for the web app.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'shared',
          root: './packages/shared',
          environment: 'node',
          include: ['tests/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'returns-api',
          root: './services/returns-api',
          environment: 'node',
          include: ['tests/**/*.test.ts'],
        },
      },
      // The web app's test settings live in its vite.config.ts (test block).
      './apps/returns-web',
    ],
  },
});
