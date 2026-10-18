import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

const validEnv = {
  MONGO_URI: 'mongodb://localhost:27017/returns',
  WEB_ORIGIN: 'http://localhost:5173',
};

describe('loadConfig', () => {
  it('parses a valid environment and applies defaults', () => {
    const config = loadConfig(validEnv);
    expect(config.PORT).toBe(4000);
    expect(config.NODE_ENV).toBe('development');
  });

  it('coerces PORT from a string to a number', () => {
    expect(loadConfig({ ...validEnv, PORT: '5000' }).PORT).toBe(5000);
  });

  it('throws a clear error when MONGO_URI is missing', () => {
    expect(() => loadConfig({ WEB_ORIGIN: validEnv.WEB_ORIGIN })).toThrow(/MONGO_URI is required/);
  });

  it('rejects a non-mongodb URI', () => {
    expect(() => loadConfig({ ...validEnv, MONGO_URI: 'postgres://x' })).toThrow(/MONGO_URI/);
  });
});
