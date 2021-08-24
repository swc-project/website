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

You can use helpers from an external module named `@swc/helpers`.

While bundling, this option will greatly reduce your file size.

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

Starting from `@swc/core` v1.1.4, you can enable loose mode by

```json
{
  "jsc": {
    "loose": true
  }
}
```

In loose mode, swc generates more efficient code.

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

You can use legacy decorators with `swc`. To enable legacy decorator, set `jsc.transform.legacyDecorator` and `jsc.parser.decorators` to true.

e.g.

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

- `runtime`

Possible values: `automatic`, `classic`.

Use `automatic` to use new jsx runtimes.

- `importSource`

Only for `runtime: automatic`. `react` by default.

This option can be overrided with `@jsxImportSource foo`.

Determines the runtime library to import.

- `pragma`
  Replace the function used when compiling JSX expressions.

This option can be overrided with `@jsx foo`.

Defaults to `React.createElement`.

- `pragmaFrag`
  Replace the component used when compiling JSX fragments.

This option can be overrided with `@jsxFrag foo`.

Defaults to `React.Fragment`

- `throwIfNamespace`
  Toggles whether or not to throw an error if an XML namespaced tag name is used. For example: `<f:image />`

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

- `development`
  Toggles plugins that aid in development, such as `jsx-self` and `jsx-source`. Automatically read `webpack` mode when used with `swc-loader`

- `useBuiltins`
  Use `Object.assign()` instead of `_extends`. Defaults to false.

- `refresh`
  Enable [react-refresh](https://www.npmjs.com/package/react-refresh) related transform. Defaults to false as it's considered experimental. Pass true or object to enable this feature.

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

### jsc.transform.optimizer

**Note**: Optimizer of the swc assumes

- It's a module or wrapped in an iife.

* Accessing (get) global variables does not have a side-effect.

It is the same assumption as the google closure compiler.

- You don't add fields to literals like a numeric literal, regular expression or a string literal.

* Files are served as gzipped.

It means that swc will not focus on reducing the size of non-gzipped file size.

Setting this to `undefined` skips optimizer pass

#### jsc.transform.optimizer.globals

- `vars`
  Variables to inline.

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

## jsc.paths

> Requires swc@1.2.62

Syntax is identical as it of `tsconfig.json`.

See https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping for more details.

## `jsc.minify`

> Requires swc@1.2.67

See [the documentation for minification](./config-js-minify) for more details.

## `jsc.experimental`

> Experimental features can be removed, or modified with a semver-incompatible way.
> Use at your own risk.

### `jsc.experimental.optimizeHygiene`

Reduce variable renaming of swc.

## module

To configure module system, see the [docs](./config-js-module) for it.

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

# sourceMaps

Starting from `v1.2.50`, you can enable source map by adding `sourceMaps: true` or `sourceMaps: 'inline'` to the `.swcrc`.

Example:

```json
{
  "sourceMaps": true
}
```
