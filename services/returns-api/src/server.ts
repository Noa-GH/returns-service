import express from 'express';
import { API_BASE_PATH } from '@returns/shared';
import { loadConfig } from './config.js';

// Placeholder entry point so `npm run dev:api` has something to run.
// RET-6 replaces this: move app creation into app.ts (exported, no listen) and add GET /api/v1/health.
const config = loadConfig(process.env);
const app = express();

app.listen(config.PORT, (error) => {
  if (error) throw error;
  console.log(
    `returns-api listening on http://localhost:${config.PORT}${API_BASE_PATH} (${config.NODE_ENV})`,
  );
});
