import { resolve } from 'path';
import { getScope } from '../src/get-scope';

describe('Test getScope', () => {
  test('should return with empty string: !exists', () => {
    const received = getScope(resolve(__dirname, 'wrong'));
    expect(received).toEqual('');
  });

  test('should return with empty string: !readJSONSync', () => {
    const received = getScope(resolve(__dirname, 'scope'));
    expect(received).toEqual('');
  });

  test('should return with empty string: !array', () => {
    const received = getScope(resolve(__dirname, '..'));
    expect(received).toEqual('');
  });

  test('should return with "@scope"', () => {
    const received = getScope(resolve(__dirname));
    expect(received).toEqual('@scope');
  });
});
