<img src="https://repository-images.githubusercontent.com/421865817/f23da96c-d88b-4ebb-bd6c-bf881ba99110">

<h1 align="center">lerna-templater</h1>
<p align="center">Generate packages from templates in a Lerna monorepo</p>

<p align="center">
  <a href="https://npmjs.com/package/lerna-templater/" target="_blank">
    <img src="https://img.shields.io/npm/v/lerna-templater.svg" alt="npm version" />
  </a>

  <a href="https://github.com/rdarida/lerna-templater" target="_blank">
    <img src="https://img.shields.io/badge/-repository-222222?style=flat&logo=github" alt="GitHub repository" />
  </a>

  <a href="https://sonarcloud.io/dashboard?id=rdarida_lerna-templater" target="_blank">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rdarida_lerna-templater&metric=coverage" alt="Coverage" />
  </a>

  <img src="https://img.shields.io/librariesio/release/npm/lerna-templater" alt="Libraries.io dependency status" />
</p>
<hr>

## Installation
Install **`lerna-templater`** via **[npm](https://npmjs.org/package/lerna-templater)**:

```sh
npm i -D lerna-templater
```

## Usage
### Importing in a script
```ts
import { TemplaterOptions, templater } from 'lerna-templater';

/**
 * @param {string} cwd - The current working directory.
 * @param {TemplaterOptions} options - Configuration options for the templater.
 */
templater(cwd, options);
```

### Using as a CLI tool
```sh
npx lerna-templater -n "New Package Name" -d "Package Description"
```

Alternatively, add it to your `package.json` scripts:
```json
"scripts": {
  "create": "lerna-templater"
}
```

Then run:
```sh
npm run create -- -n "New Package Name" -d "Package Description"
```

## API
### `templater(cwd, options)`
Generates a new package using a template. The package is created in the directory **`cwd`/`options.packages`/`options.name`**, using the template from **`cwd`/`options.template`**.

### `TemplaterOptions`
- **`name`** (**string**, **required**) - The name of the new package.
- **`description`** (**string**, optional) - A description for the package.
- **`scope`** (**string**, optional) - The package scope. Defaults to the scope in the main `package.json`.
- **`packages`** (**string**, optional) - The relative path to the packages directory. Defaults to the first entry in `lerna.json`'s `packages` array.
- **`template`** (**string**, optional) - The relative path to the template directory. Defaults to `__template__`.

## Templating with Mustache
**lerna-templater** uses [Mustache.js](https://npmjs.org/package/mustache) for templating. Files with the `.mustache` extension in the template directory are rendered and saved without the extension. For example, `package.json.mustache` becomes `package.json`.

### Available template variables
- `{{{name}}}` - The package name.
- `{{{description}}}` - The package description.
- `{{{scope}}}` - The package scope.
- `{{{packages}}}` - The relative path to the packages directory.
- `{{{template}}}` - The relative path to the template directory.
- `{{{version}}}` - The package version.
- `{{{repoDir}}}` - The package's relative path in the repository.

## Example
### Directory structure
```
.
├── __template__/
│   ├── package.json.mustache
│   └── README.md.mustache
├── packages/
├── lerna.json
└── package.json
```

### Template files
#### `__template__/package.json.mustache`
```json
{
  "name": "{{{scope}}}{{{name}}}",
  "description": "{{{description}}}",
  "version": "{{{version}}}",
  "repository": {
    "directory": "{{{repoDir}}}"
  }
}
```

#### `__template__/README.md.mustache`
```md
# {{{name}}}

{{{description}}}
```

#### `lerna.json`
```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

#### `package.json`
```json
{
  "name": "@examplescope/example-monorepo"
}
```

### Output
Running:
```sh
npx lerna-templater -n "example-newpackage" -d "Description for the new example package"
```
Generates:
- `packages/example-newpackage/`
- `package.json` and `README.md` inside `packages/example-newpackage`

#### `package.json`
```json
{
  "name": "@examplescope/example-newpackage",
  "description": "Description for the new example package",
  "version": "0.0.0",
  "repository": {
    "directory": "packages/example-newpackage"
  }
}
```

#### `README.md`
```md
# example-newpackage

Description for the new example package
```

## Documentation
See the full documentation [here](https://rdarida.github.io/lerna-templater/).

<hr>

<p align="center">
  <a href="LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  </a>
</p>
