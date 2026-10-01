import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
  type Mock
} from 'vitest';

describe('Test cli', () => {
  let originalArgv: string[];
  let templaterMock: Mock;

  beforeEach(() => {
    vi.resetModules();

    originalArgv = process.argv;
    vi.clearAllMocks();

    templaterMock = vi.fn();

    vi.doMock('../src', () => ({
      templater: templaterMock
    }));
  });

  it('should execute lerna-templater with the basic command line options', async () => {
    process.argv = ['node', 'lerna-templater', '--name', 'my-awesome-package'];

    await import('../src/cli.js');

    expect(templaterMock).toHaveBeenCalledTimes(1);

    expect(templaterMock).toHaveBeenCalledWith(process.cwd(), {
      $0: 'lerna-templater',
      _: [],
      d: '',
      description: '',
      n: 'my-awesome-package',
      name: 'my-awesome-package'
    });
  });

  it('should execute lerna-templater with all provided command line options', async () => {
    process.argv = [
      'node',
      'lerna-templater',
      '--name',
      'my-awesome-package',
      '--description',
      'This is my awesome package',
      '--scope',
      '@scope',
      '--packages',
      './packages',
      '--template',
      '__template__'
    ];

    await import('../src/cli.js');

    expect(templaterMock).toHaveBeenCalledTimes(1);

    expect(templaterMock).toHaveBeenCalledWith(process.cwd(), {
      $0: 'lerna-templater',
      _: [],
      d: 'This is my awesome package',
      description: 'This is my awesome package',
      n: 'my-awesome-package',
      name: 'my-awesome-package',
      p: './packages',
      packages: './packages',
      s: '@scope',
      scope: '@scope',
      t: '__template__',
      template: '__template__'
    });
  });

  afterEach(() => {
    process.argv = originalArgv;
    vi.restoreAllMocks();
    vi.doUnmock('../src');
  });
});
