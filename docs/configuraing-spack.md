---
id: configuring-spack
title: Configuring spack
sidebar_label: Configuring spack
---


## Basics

spack can be configured with `spack.config.js`. Config file for the spack is almost simillar to webpack. In future, I'll add a webpack-compatible plugin system.

Basic example:

```js
const { config } = require('@swc/core/spack')

module.exports = config({
    entry: {
        'web': __dirname + '/src/index.ts',
    },
    output: {
        path: __dirname + '/lib'
    },
    module: {},
});
```

### entry

```js

```

### output

### module

TODO: rules


## Using array

## Examples

 - [Basic usage](https://github.com/swc-project/cli/tree/master/examples/spack-basic)
 - [Multiple entry](https://github.com/swc-project/cli/tree/master/examples/spack-multiple-entry)