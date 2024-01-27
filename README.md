<img src="https://repository-images.githubusercontent.com/421865817/f23da96c-d88b-4ebb-bd6c-bf881ba99110">
<h1 align="center">lerna-templater</h1>
<p align="center">Generates package from template for a Lerna Monorepo Project</p>
<p align="center">
  <a href="https://github.com/rdarida/lerna-templater" target="_blank">
    <img src="https://img.shields.io/badge/-repository-222222?style=flat&logo=github" />
  </a>

  <a href="https://github.com/rdarida/lerna-templater/actions/workflows/release.yml" target="_blank" alt="GitHub Actions">
    <img src="https://github.com/rdarida/lerna-templater/actions/workflows/release.yml/badge.svg" alt="Release">
  </a>
  
  <a href="https://sonarcloud.io/dashboard?id=rdarida_lerna-templater" target="_blank" alt="SonarCloud">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rdarida_lerna-templater&metric=coverage" alt="coverage">
  </a>
  
  <img src="https://img.shields.io/librariesio/release/npm/lerna-templater">

  <a href="https://www.patreon.com/rdarida" target="_blank">
    <img src="https://img.shields.io/badge/-patreon-222222?style=flat&logo=patreon" />
  </a>
</p>
<hr>

## Installing
You can get **`lerna-templater`** via **[npm](https://npmjs.org/package/lerna-templater)**.
```
npm i -D lerna-templater
```

## Usage
### As an import
```ts
import { TemplaterOptions, templater } from 'lerna-template';

/**
 * @param {string} cwd The current working directory.
 * @param {TemplaterOptions} options The options for templater.
 */
templater(cwd, options);
```
### As a commandline tool
```
npx lerna-templater -n "Name of the new package" -d "Description of the new package"
```

or

```json
"scripts": {
  "create": "lerna-templater"
}
```

```
npm run create -- -n "Name of the new package" -d "Description of the new package"
```

## API
### `templater(cwd, optioins)`
Generates a new package from **`cwd`/`options.template`** directory into **`cwd`/`options.packages`/`options.name`** directory. The **`cwd`** argument is the current working directory.

### `TemplaterOptions`
- **`name`** **string**, **required**  
  The name of the new package
- **`description`** **string**, **optional**  
  The description of the new package.
- **`scope`** **string**, **optional**  
  The scope of the new package. Default value is the scope of the *main package.json*.
- **`packages`** **string**, **optional**  
  The relative path of the packages directory. Default value is the first element of the *lerna.json's packages array*.
- **`template`** **string**, **optional**  
  The relative path of the template directory. Default values is *\_\_template\_\_*.

### Mustache templating
The **lerna-templater** uses [Mustache.js](https://npmjs.org/packages/mustache) for templating. If the *template* directory contains files which ends with **.mustache**, the templater will render them with Mustache.js. After the rendering, the **.mustache** extension will be removed from the filename. For example: `package.json.mustache` will be saved as `package.json`.

#### Available tags:
- `{{{name}}}` - The name of the new package.
- `{{{description}}}` - The description of the new package.
- `{{{scope}}}` - The scope of the new package.
- `{{{packages}}}` - The relative path of the packages (output) directory.
- `{{{template}}}` - The relative path of the template (input) directory.
- `{{{version}}}` - The version of the new package.
- `{{{repoDir}}}` - The relative path of the new package in the repository.

### Example
#### Directory structure
    .
    ├── __template__/
    |   ├── package.json.mustache
    |   └── README.md.mustache
    ├── packages/
    ├── lerna.json
    └── package.json

#### Content of the files
- \_\_template\_\_/**package.json.mustache**:  
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
- \_\_template\_\_/**README.md.mustache**:  
  ```md
  # {{{name}}}
  {{{description}}}
  ```
- **lerna.json**:  
  ```json
  {
    "packages": [
      "packages/*"
    ],
    "version": "0.0.0"
  }
  ```
- **package.json**:  
  ```json
  {
    "name": "@examplescope/example-monorepo"
  }
  ```

#### Output
Running the  `npx lerna-templater -n "example-newpackage" -d "Description for the new example package"` command will result this output:
- **packages/example-newpackage** directory
- **package.json** and **README.md** in the *packages/example-newpackage* directory
- package.json:  
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
- README.md:  
  ```md
  # example-newpackage
  Description of the new example package
  ```

<hr>
<details>
  <summary>
    <strong>Resources</strong>
  </summary>

- Add resources here
</details>
<hr>

<p align="center">
  <a href="LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-green" />
  </a>
</p>
