import react from '@vitejs/plugin-react';
// Importing defineConfig from vitest/config (instead of vite) adds types for the `test` block.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail loudly instead of silently moving to 5174, which would break WEB_ORIGIN / CORS.
    strictPort: true,
  },
  test: {
    name: 'returns-web',
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
