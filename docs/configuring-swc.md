---
id: configuring-swc
title: Configuring swc
sidebar_label: Configuring swc
---

# .swcrc

Swc can be configured with `.swcrc`.

## jsc


### jsc.parser

`typescript`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": false
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
      "numericSeparator": false,
      "classPrivateProperty": false,
      "privateMethod": false,
      "classProperty": false,
      "functionBind": false,
      "decorators": false,
      "decoratorsBeforeExport": false
    }
  }
}
```

### jsc.transform

Exmaple

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

#### jsc.transform.react

 - `pragma`
 Replace the function used when compiling JSX expressions.

Defaults to `React.createElement`.

 - `pragmaFrag`
Replace the component used when compiling JSX fragments.

Defaults to `React.Fragment`


 - `throwIfNamespace`
 Toggles whether or not to throw an error if a XML namespaced tag name is used. For example: `<f:image />`

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

 - `development`
 Toggles plugins that aid in development, such as `jsx-self` and `jsx-source`.

 - `useBuiltins`
 Use `Object.assign()` instead of `_extends`. Defaults to false.


#### jsc.transform.optimizer
 - Setting this to `undefined` skips optimizer pass

##### jsc.transform.optimizer.globals

 - `vars`
Variables to inline.

e.g.
`,swcrc`:
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
true
```