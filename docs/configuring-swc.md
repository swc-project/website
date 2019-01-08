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
        "pragma_frag": "React.Fragment",
        "throw_if_namespace": true,
        "development": false,
        "use_builtins": false
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