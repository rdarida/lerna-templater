import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getScope } from '../src/get-scope';

describe('Test getScope', () => {
  it.each([
    { path: resolve(__dirname, 'wrong'), expected: '' },
    { path: resolve(__dirname, 'scope'), expected: '' },
    { path: resolve(__dirname, '..'), expected: '' },
  ])('should return with empty string for $path', ({ path, expected }) => {
    const received = getScope(path);
    expect(received).toEqual(expected);
  });

  it('should return with "@scope"', () => {
    const received = getScope(resolve(__dirname));
    expect(received).toEqual('@scope');
  });
});
