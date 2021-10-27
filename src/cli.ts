#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { TemplaterOptions, templater } from '.';

type ArgvType = {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
} & TemplaterOptions;

((argv: ArgvType): void => {
  try {
    templater(process.cwd(), argv);
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }

  process.exit();
})(
  yargs(process.argv.slice(2))
    .option('name', {
      alias: 'n',
      demandOption: true,
      describe: 'The name of the new package',
      type: 'string'
    })
    .option('description', {
      alias: 'd',
      default: '',
      describe: 'The description of the new package',
      type: 'string'
    })
    .option('scope', {
      alias: 's',
      describe: 'The scope of the new package',
      type: 'string'
    })
    .options('packages', {
      alias: 'p',
      describe: 'The path of the destination folder',
      type: 'string'
    })
    .options('template', {
      alias: 't',
      describe: 'The path of the template folder',
      type: 'string'
    })
    .help().argv
);
