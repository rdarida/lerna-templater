import { join } from 'node:path';

import { existsSync, readJSONSync } from 'fs-extra';

/**
 * Parses the scope value from package.json file.
 * @param cwd The current working directory.
 * @return The scope of the package.json.
 */
export function getScope(cwd: string): string {
  const path = join(cwd, 'package.json');

  if (!existsSync(path)) return '';

  const name = readJSONSync(path).name as string;

  if (!name) return '';

  const array = name.split('/');

  if (array.length < 2) return '';

  return array[0];
}
