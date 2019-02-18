---
id: usage-core
title: swc api
sidebar_label: swc (core)
---


## APIs

*Note: If you are **not** developing build tools, you can skip this.*

### transform
Returns `Promise<{ code: string, map?: string }>`

```js
const swc = require('@swc/core');

swc.transform('source code', {
    // Some options cannot be specified in .swcrc
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

