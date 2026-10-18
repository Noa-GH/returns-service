import { describe, expect, it } from 'vitest';
import { API_BASE_PATH, CUSTOMER_ID_HEADER } from '../src/index.js';

describe('shared constants', () => {
  it('match the design doc', () => {
    expect(API_BASE_PATH).toBe('/api/v1');
    expect(CUSTOMER_ID_HEADER).toBe('x-customer-id');
  });
});
