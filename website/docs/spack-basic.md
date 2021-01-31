---
id: spack-basic
title: Configuring spack
sidebar_label: Configuring spack
---

## Config file

spack can be configured with `spack.config.js`. Config file for the spack is almost simillar to webpack. In future, I'll add a webpack-compatible plugin system.

Currently configuration items should be exported as common js exports, like

```js
module.exports = {
  entry: {
    web: __dirname + "/src/index.ts",
  },
  output: {
    path: __dirname + "/lib",
  },
  module: {},
};
```

> Note: In future, exporting config using ES modules will be supported.

If you want autocompletion or type checking for configuration, you can wrap with `config` function from `@swc/core/spack`. It's an identity function with type annotation.

```ts
const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    web: __dirname + "/src/index.ts",
  },
  output: {
    path: __dirname + "/lib",
  },
  module: {},
});
```

### `mode`

Possible values: `production`, `debug`, `none`.

Currently this value is not used, but it will behave similarly to one of webpack.

### `entry`

Determines the entry of bundling.
You may specify a file or a map of bundle name to file path.

> Note: Currently this should be absolute path. You can use `__dirname` to create one.
> But in future, spack will support using relative path and will resolve files relative to `spack.config.js`.

#### Example

`named`:

```ts
const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    web: __dirname + "/src/index.ts",
  },
});
```

### `output`

### `module`

### `optimization`

### `resolve`

### `options`

## Examples

- [Basic usage](https://github.com/swc-project/cli/tree/master/examples/spack-basic)
