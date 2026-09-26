import { join } from 'node:path';

import { mkdirSync, readFileSync } from 'fs-extra';
import { sync as rimraf } from 'rimraf';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { templater, TemplaterOptions } from '../src';

import { FIXTURES_DIR } from './constants';

const TMPL = join(FIXTURES_DIR, '__template__');
const DIST = join(FIXTURES_DIR, 'dist');
const COVE = join(FIXTURES_DIR, 'coverage');

const FILES = [
  ['package.json', 'package.test.json'],
  ['README.md', 'README.test.md'],
  ['src/index.js', 'src/index_test.js'],
  ['package.test.json', 'package.test.json'],
  ['src/index_test.js', 'src/index_test.js'],
  ['README.test.md', 'README.test.md']
];

const FILE_OPTS: { encoding: BufferEncoding; flag: string } = {
  encoding: 'utf-8',
  flag: 'r'
};

describe('Test index', () => {
  beforeEach(() => {
    rimraf(DIST);
    mkdirSync(DIST);
  });

  it('should throw "Could not find lerna.json!"', () => {
    const options: TemplaterOptions = {
      name: 'name'
    };

    expect(() => {
      templater(join(FIXTURES_DIR, '..'), options);
    }).toThrow('Could not find lerna.json!');
  });

  it('should copy files', () => {
    const options: TemplaterOptions = {
      name: 'name',
      description: 'Description',
      scope: '@scope'
    };

    templater(FIXTURES_DIR, options);

    FILES.forEach(v => {
      const received = readFileSync(join(DIST, options.name, v[0]), FILE_OPTS);
      const expected = readFileSync(join(TMPL, v[1]), FILE_OPTS);

      expect(received).toEqual(expected);
    });
  });

  it('should throw "The package arleady exists!"', () => {
    const options: TemplaterOptions = {
      name: 'error'
    };

    mkdirSync(join(DIST, options.name));

    expect(() => {
      templater(FIXTURES_DIR, options);
    }).toThrow('The package already exists!');
  });

  it('should handle package parameter', () => {
    const options: TemplaterOptions = {
      name: 'name',
      scope: '@scope',
      description: 'Description',
      packages: 'coverage'
    };

    templater(FIXTURES_DIR, options);

    FILES.forEach(v => {
      const received = readFileSync(join(COVE, options.name, v[0]), FILE_OPTS);
      const expected = readFileSync(join(TMPL, v[1]), FILE_OPTS);

      expect(received).toEqual(expected);
    });
  });

  it('should throw "The template folder is not found!"', () => {
    const options: TemplaterOptions = {
      name: 'name',
      template: 'wrongtemplate'
    };

    expect(() => {
      templater(FIXTURES_DIR, options);
    }).toThrow(`The template folder is not found!\n${options.template}`);
  });

  afterAll(() => {
    rimraf(DIST);
    rimraf(COVE);
  });
});
