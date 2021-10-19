---
id: configuring-swc
title: Configuring swc
sidebar_label: Configuring swc
---

`swc` can be configured with `.swcrc` file.

## preset-env

See [preset-env](/docs/preset-env) for using swc with `browserslist`.

# jsc

This is optional and defaults to

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "topLevelAwait": false,
      "importMeta": false
    },
    "transform": null,
    "target": "es5",
    "loose": false,
    "externalHelpers": false,
    // Requires v1.2.50 or upper and requires target to be es2016 or upper.
    "keepClassNames": false
  }
}
```

## jsc.externalHelpers

The output code may depend on helper functions to support the target environment. By default a helper function is inlined into the output files where it is required.

You can use helpers from an external module by enabling `externalHelpers` and the helpers code will be imported by the output files from `node_modules/@swc/helpers`.

While bundling, this option will greatly reduce your file size.

_Note: you must add [`@swc/helpers`](https://www.npmjs.com/package/@swc/helpers) as a dependency in addition to `@swc/core`._

```json
{
  "jsc": {
    "externalHelpers": true
  }
}
```

## jsc.parser

`typescript`:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": false,
      "dynamicImport": false
    }
  }
}
```

`ecmascript`:

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "dynamicImport": false,
      "privateMethod": false,
      "functionBind": false,
      "classPrivateProperty": false,
      "exportDefaultFrom": false,
      "exportNamespaceFrom": false,
      "decorators": false,
      "decoratorsBeforeExport": false,
      "importMeta": false
    }
  }
}
```

## jsc.target

Starting from `@swc/core` v1.0.27, you can specify the target environment by using the field.

```json
{
  "jsc": {
    // Disable es3 / es5 / es2015 transforms
    "target": "es2016"
  }
}
```

## jsc.loose

Starting from `@swc/core` v1.1.4, you can enable "loose" transformations by enabling `jsc.loose` which works like `babel-preset-env` loose mode.

See https://2ality.com/2015/12/babel6-loose-mode.html

```json
{
  "jsc": {
    "loose": true
  }
}
```

## jsc.transform

Example

```json
{
  "jsc": {
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false
      },
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}
```

### jsc.transform.legacyDecorator

You can use the legacy (stage 1) class decorators syntax and behaviour.

To enable legacy decorators, set `jsc.transform.legacyDecorator` and `jsc.parser.decorators` to true.

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "decorators": true
    },
    "transform": {
      "legacyDecorator": true
    }
  }
}
```

### jsc.transform.decoratorMetadata

If you are using typescript and decorators with `emitDecoratorMetadata` enabled, you can use `swc` for faster iteration like

e.g.

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    }
  }
}
```

Note: This feature requires `v1.2.13+`.

### jsc.transform.react

#### jsc.transform.react.runtime

Possible values: `automatic`, `classic`. This affects how JSX source code will be compiled.

- Use `runtime: automatic` to use a JSX runtime module (e.g. `react/jsx-runtime` introduced in React 17).
- Use `runtime: classic` to use `React.createElement` instead - with this option, you must ensure that `React` is in scope when using JSX.

See https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

#### jsc.transform.react.importSource

When using `runtime: automatic`, determines the runtime library to import.

Defaults to `react`.

This option can be overrided with `@jsxImportSource foo`.

#### jsc.transform.react.pragma

When using `runtime: classic`, replaces the function used when compiling JSX expressions.

Defaults to `React.createElement`.

This option can be overrided with `@jsx foo`.

#### jsc.transform.react.pragmaFrag

Replace the component used when compiling JSX fragments.

Defaults to `React.Fragment`

This option can be overrided with `@jsxFrag foo`.

#### jsc.transform.react.throwIfNamespace

Toggles whether or not to throw an error if an XML namespaced tag name is used. For example: `<f:image />`

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### jsc.transform.react.development

Toggles debug props `__self` and `__source` on elements generated from JSX, which are used by development tooling such as React Developer Tools.

This option is set automatically based on the Webpack `mode` setting when used with `swc-loader`. See [Using swc with webpack](/docs/usage-swc-loader/).

#### jsc.transform.react.useBuiltins

Use `Object.assign()` instead of `_extends`. Defaults to false.

#### jsc.transform.react.refresh

Enable [react-refresh](https://www.npmjs.com/package/react-refresh) related transform. Defaults to false as it's considered experimental.

Pass `refresh: true` to enable this feature, or an object with the following:

```ts
interface ReactRefreshConfig {
  /** @default "$RefreshReg$" */
  refreshReg: String;
  /** @default "$RefreshSig$" */
  refreshSig: String;
  /** @default false */
  emitFullSignatures: boolean;
}
```

### jsc.transform.constModules

`.swcrc`:

```json
{
  "jsc": {
    "transform": {
      "constModules": {
        "globals": {
          "@ember/env-flags": {
            "DEBUG": "true"
          },
          "@ember/features": {
            "FEATURE_A": "false",
            "FEATURE_B": "true"
          }
        }
      }
    }
  }
}
```

```js
import { DEBUG } from "@ember/env-flags";
import { FEATURE_A, FEATURE_B } from "@ember/features";

console.log(DEBUG, FEATURE_A, FEATURE_B);
```

becomes

```js
console.log(true, false, true);
```

### `jsc.transform.optimizer`

**Note**: Optimizer of the swc assumes

- It's a module or wrapped in an iife.

* Accessing (get) global variables does not have a side-effect.

It is the same assumption as the google closure compiler.

- You don't add fields to literals like a numeric literal, regular expression or a string literal.

* Files are served as gzipped.

It means that swc will not focus on reducing the size of non-gzipped file size.

Setting this to `undefined` skips optimizer pass

#### jsc.transform.optimizer.simplify

Starting from `v1.2.101`, you can set this value to false to use `inline_globals` while skipping optimizations.

e.g.
`.swcrc`:

```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "simplify": false,
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}
```

#### jsc.transform.optimizer.globals

- `vars`
  Variables to inline.

- `typeofs`
  If you set `{ "window": "object" }`, `typeof window` will be replaced with `"object"`.

This option requires `v1.2.101` or upper.

e.g.
`.swcrc`:

```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}
```

`npx swc '__DEBUG__' --filename input.js`:

```js
true;
```

#### jsc.transform.optimizer.jsonify

**Note:** This feature requires `v1.1.1`+

- `minCost`
  If cost of parsing a pure object literal is larger than this value, the object literal is converted to `JSON.parse('{"foo": "bar"}')`. Defaults to 1024.

e.g.
`.swcrc`:

```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "jsonify": {
          "minCost": 0
        }
      }
    }
  }
}
```

This will change all **pure** object literals to `JSON.parse("")`.

## jsc.keepClassNames

Requires v1.2.50 or upper and requires target to be es2016 or upper.

Enabling this option will make swc preserve original class names.

## `jsc.paths`

> Requires swc@1.2.62

Syntax is identical as it of `tsconfig.json`.

See https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping for more details.

Requires `jsc.baseUrl`. See below.

## `jsc.baseUrl`

See https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url

## `jsc.minify`

> Requires swc@1.2.67

See [the documentation for minification](/docs/config-js-minify) for more details.

## `jsc.experimental`

> Experimental features can be removed, or modified with a semver-incompatible way.
> Use at your own risk.

Currently there's no experimental options.

## module

To configure module system, see the [docs](/docs/config-js-module) for it.

## minify

To get minified output, you can configure swc by

`.swcrc`:

```json
{
  "minify": true
}
```

## Multiple entries

Starting with `v1.0.47`, you can specify multiple entries. For example,

```json
[
  {
    "test": ".*.js$",
    "module": {
      "type": "commonjs"
    }
  },
  {
    "test": ".*.ts$",
    "module": {
      "type": "amd"
    }
  }
]
```

this make swc compile javascript files as common js module (uses `require('foo')`) and compile typescript files as amd modules.

Note that `test` option can be used to transcompile only typescript files, like

```json
{
  "test": ".*.ts$",
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
      "dynamicImport": true
    }
  }
}
```

### test

Type: Regex / Regex[]

Usage:

`.swcrc`:

```json
{
  "test": ".*.ts$",
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
      "dynamicImport": true
    }
  }
}
```

### exclude

Type: Regex / Regex[]

`.swcrc`:

```json
{
  "exclude": [".*.js$", ".*.map$"],
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
      "dynamicImport": true
    }
  }
}
```

## `sourceMaps`

Starting from `v1.2.50`, you can enable source map by adding `sourceMaps: true` or `sourceMaps: 'inline'` to the `.swcrc`.

Example:

```json
{
  "sourceMaps": true
}
```

## `inlineSourcesContent`

Starting from `v1.2.101`, this is true by default.

If you want to make `swc` store contents of files into sourcemap, you can set `inlineSourcesContent` to true.

Example:

```json
{
  "sourceMaps": true,
  "inlineSourcesContent": true
}
```
