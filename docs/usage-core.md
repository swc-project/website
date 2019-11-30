---
id: usage-core
title: swc core api
sidebar_label: swc (core)
---


## APIs

*Note: If you are **not** developing build tools, you can skip this.*


### transform

*Note:*
 - Package `@swc/core` provides appropriate `.d.ts` file, so you may not need this document


Returns `Promise<{ code: string, map?: string }>`

```js
const swc = require('@swc/core');

swc.transform('source code', {
    // Some options cannot be specified in .swcrc
    filename: 'input.js',
    sourceMaps: true,

    // All options below can be configured via .swcrc
    jsc: {
        parser: {
            syntax: "ecmascript",
        },
        transform: {
            
        }
    }
}).then((output) => {
    output.code; // transformed code
    output.map; // source map (in string)
});
```

### transformSync
Returns `{ code: string, map?: string }`

### transformFile
Returns `Promise<{ code: string, map?: string }>`

### transformFileSync
Returns `{ code: string, map?: string }`


## Options

