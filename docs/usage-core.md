---
id: usage-core
title: swc api
sidebar_label: swc (core)
---

*Note: If you are **not** developing build tools, you can skip this.*

## transform
Returns `Promise<{ code: string, out: string }>`

```js
const swc = require('swc');

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

## transformSync
Returns `{ code: string, out: string }`

## transformFile
Returns `Promise<{ code: string, out: string }>`

## transformFileSync
Returns `{ code: string, out: string }`


