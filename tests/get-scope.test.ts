import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getScope } from '../src/get-scope';

import { FIXTURES_DIR } from './constants';

describe('Test getScope', () => {
  it.each([
    { path: join(FIXTURES_DIR, 'wrong'), expected: '' },
    { path: join(FIXTURES_DIR, 'scope'), expected: '' },
    { path: join(FIXTURES_DIR, '..'), expected: '' }
  ])('should return with empty string for $path', ({ path, expected }) => {
    const received = getScope(path);
    expect(received).toEqual(expected);
  });

  it('should return with "@scope"', () => {
    const received = getScope(FIXTURES_DIR);
    expect(received).toEqual('@scope');
  });
});
