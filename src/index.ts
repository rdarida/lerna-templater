import { join } from 'node:path';
import { lstatSync } from 'node:fs';

import {
  existsSync,
  copySync,
  readJSONSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'fs-extra';

import mustache from 'mustache';
import { rimrafSync } from 'rimraf';

import { getScope } from './get-scope';

export type TemplaterOptions = {
  /** The name of the new package. */
  name: string;
  /** The description of the new pacakge. */
  description?: string;
  /** The scope of the new package.  */
  scope?: string;
  /** The path of the package (output) directory. */
  packages?: string;
  /** The path of the template (input) directory. */
  template?: string;
};

type Lerna = {
  packages: string[];
  version: string;
};

function getDefaults({
  name,
  scope = '',
  description = '',
  ...props
}: TemplaterOptions): TemplaterOptions {
  return {
    name,
    scope: scope.length ? `${scope}/` : undefined,
    description,
    ...props
  };
}

function getLerna(cwd: string): Lerna {
  const path = join(cwd, 'lerna.json');

  if (!existsSync(path)) {
    throw new Error('Could not find lerna.json!');
  }

  const lerna = readJSONSync(path) as Lerna;
  lerna.packages = lerna.packages?.map(p => p.replace('/*', '')) ?? [];

  return lerna;
}

function copyTemplate(cwd: string, template: string, target: string): boolean {
  cwd = join(cwd, template);

  if (!existsSync(cwd)) {
    return false;
  }

  copySync(cwd, target);

  return true;
}

const flatten = (array: Array<any>): Array<any> =>
  array.reduce(
    (flattened, entry) =>
      flattened.concat(Array.isArray(entry) ? flatten(entry) : entry),
    []
  );

function getMustacheFiles(target: string, relative = ''): string[] {
  return flatten(
    readdirSync(target).map(f => {
      if (lstatSync(join(target, f)).isFile()) {
        if (f.endsWith('.mustache')) {
          return relative ? join(relative, f) : f;
        }
        return [];
      }

      return getMustacheFiles(
        join(target, f),
        relative ? join(relative, f) : f
      );
    })
  );
}

/**
 * Generates a new package from cwd/options.template directory into
 * cwd/options.packages/options.name directory.
 * @param cwd The current working directory.
 * @param options The options for templater.
 */
export function templater(cwd: string, options: TemplaterOptions): void {
  options = getDefaults(options);
  const lerna = getLerna(cwd);

  if (!options.scope) {
    options.scope = getScope(cwd);
  }

  if (!options.packages) {
    options.packages = lerna.packages[0];
  }

  if (!options.template) {
    options.template = '__template__';
  }

  const target = join(cwd, options.packages, options.name);

  if (existsSync(target)) {
    throw new Error(`The package already exists!\n${target}`);
  }

  if (!copyTemplate(cwd, options.template, target)) {
    throw new Error(`The template folder is not found!\n${options.template}`);
  }

  const templates = getMustacheFiles(target);

  for (const t of templates) {
    const name = t.replace('.mustache', '');
    const file = join(target, name);

    const template = readFileSync(join(target, t), {
      encoding: 'utf-8',
      flag: 'r'
    });

    const content = mustache.render(template, {
      ...options,
      version: lerna.version,
      repoDir: `${options.packages}/${options.name}`
    });

    writeFileSync(file, content);
  }

  for (const t of templates) {
    rimrafSync(join(target, t));
  }
}
