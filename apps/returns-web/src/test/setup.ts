// Runs before every web test file (see test.setupFiles in vite.config.ts).
// Adds DOM matchers like toBeInTheDocument() and their TypeScript types.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Unmount rendered components between tests so they don't leak into each other.
afterEach(() => {
  cleanup();
});
