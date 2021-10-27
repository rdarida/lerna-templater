import { sync as rimraf } from 'rimraf';
import { mkdirSync, readFileSync, BaseEncodingOptions } from 'fs-extra';
import { resolve, join } from 'path';
import { templater, TemplaterOptions } from '../src';

const TMPL = resolve(__dirname, '__template__');
const DIST = resolve(__dirname, 'dist');
const COVE = resolve(__dirname, 'coverage');

const FILES = [
  ['package.json', 'package.test.json'],
  ['README.md', 'README.test.md'],
  ['src/index.js', 'src/index_test.js'],
  ['package.test.json', 'package.test.json'],
  ['src/index_test.js', 'src/index_test.js'],
  ['README.test.md', 'README.test.md']
];

const FILE_OPTS:{ encoding: BufferEncoding; flag: string; } = {
  encoding: 'utf-8',
  flag: 'r'
};

describe('Test index', () => {
  beforeEach(() => {
    rimraf(DIST);
    mkdirSync(DIST);
  });

  test('should throw "Could not find lerna.json!"', () => {
    const options: TemplaterOptions = {
      name: 'name'
    };

    const expected = 'Could not find lerna.json!';
    expect(() => {
      templater(join(__dirname, '..'), options);
    }).toThrow(expected);
  });

  test('should copy files', () => {
    const options: TemplaterOptions = {
      name: 'name',
      description: 'Description',
      scope: '@scope'
    };

    templater(__dirname, options);

    FILES.forEach((v) => {
      const received = readFileSync(join(DIST, options.name, v[0]), FILE_OPTS);

      const expected = readFileSync(join(TMPL, v[1]), FILE_OPTS);
      expect(received).toEqual(expected);
    });
  });

  test('should throw "The package arleady exists!"', () => {
    const options: TemplaterOptions = {
      name: 'error'
    };

    mkdirSync(join(DIST, options.name));
    expect(() => {
      templater(__dirname, options);
    }).toThrow('The package already exists!');
  });

  test('should handle package parameter', () => {
    const options: TemplaterOptions = {
      name: 'name',
      scope: '@scope',
      description: 'Description',
      packages: 'coverage'
    };

    templater(__dirname, options);

    FILES.forEach((v) => {
      const received = readFileSync(join(COVE, options.name, v[0]), FILE_OPTS);

      const expected = readFileSync(join(TMPL, v[1]), FILE_OPTS);
      expect(received).toEqual(expected);
    });
  });

  test('should throw "The template folder is not found!"', () => {
    const options: TemplaterOptions = {
      name: 'name',
      template: 'wrongtemplate'
    };

    const expected = `The template folder is not found!\n${options.template}`;
    expect(() => {
      templater(__dirname, options);
    }).toThrow(expected);
  });

  afterAll(() => {
    rimraf(DIST);
    rimraf(COVE);
  });
});
