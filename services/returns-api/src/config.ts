import { z } from 'zod';

/**
 * Every environment variable the API needs, validated at startup.
 * If one is missing or malformed the process stops with a clear message
 * instead of failing later with a confusing error deep inside Mongoose or Express.
 */
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGO_URI: z
    .string({ error: 'MONGO_URI is required (see .env.example)' })
    .startsWith('mongodb', 'MONGO_URI must start with mongodb:// or mongodb+srv://'),
  WEB_ORIGIN: z.url({ error: 'WEB_ORIGIN must be a URL, e.g. http://localhost:5173' }),
});

export type Config = z.infer<typeof EnvSchema>;

/**
 * Pure function: takes an env object, returns typed config or throws.
 * Taking `env` as a parameter (instead of reading process.env here) keeps it unit-testable.
 */
export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${problems}`);
  }
  return result.data;
}
