# Compilation

Compilation works out of the box with SWC and does not require customization. Optionally, you can override the configuration. Here are the defaults:

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

```json
{
  "jsc": {
    "externalHelpers": true
  }
}
```

The output code may depend on helper functions to support the target environment. By default, a helper function is inlined into the output files where it is required.

You can use helpers from an external module by enabling `externalHelpers` and the helpers code will be imported by the output files from `node_modules/@swc/helpers`.

While bundling, this option will greatly reduce your file size.

You must add `@swc/helpers` as a dependency in addition to `@swc/core`.

## jsc.parser

### typescript

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

### ecmascript

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

Starting from `@swc/core` v1.1.4, you can enable "loose" transformations by enabling `jsc.loose` which works like `babel-preset-env` [loose mode](https://2ality.com/2015/12/babel6-loose-mode.html).

```json
{
  "jsc": {
    "loose": true
  }
}
```

## jsc.transform

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

You can use the legacy (stage 1) class decorators syntax and behavior.

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

This feature requires `v1.2.13+`.

If you are using typescript and decorators with `emitDecoratorMetadata` enabled, you can use `swc` for faster iteration:

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

### jsc.transform.react

#### jsc.transform.react.runtime

Possible values: `automatic`, `classic`. This affects how JSX source code will be compiled.

- Use `runtime: automatic` to use a JSX runtime module (e.g. `react/jsx-runtime` introduced in React 17).
- Use `runtime: classic` to use `React.createElement` instead - with this option, you must ensure that `React` is in scope when using JSX.

[Learn more here](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

#### jsc.transform.react.importSource

- Defaults to `react`.
- When using `runtime: automatic`, determines the runtime library to import.
- This option can be overrided with `@jsxImportSource foo`.

#### jsc.transform.react.pragma

- Defaults to `React.createElement`.
- When using `runtime: classic`, replaces the function used when compiling JSX expressions.
- This option can be overrided with `@jsx foo`.

#### jsc.transform.react.pragmaFrag

- Defaults to `React.Fragment`
- Replace the component used when compiling JSX fragments.
- This option can be overrided with `@jsxFrag foo`.

#### jsc.transform.react.throwIfNamespace

Toggles whether or not to throw an error if an XML namespaced tag name is used. For example: `<f:image />`

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

#### jsc.transform.react.development

Toggles debug props `__self` and `__source` on elements generated from JSX, which are used by development tooling such as React Developer Tools.

This option is set automatically based on the Webpack `mode` setting when used with `swc-loader`. See [Using swc with webpack](/docs/usage-swc-loader/).

#### jsc.transform.react.useBuiltins

Use `Object.assign()` instead of `_extends`. Defaults to false.
