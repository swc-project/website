---
id: usage-core
title: swc api
sidebar_label: swc (core)
---

*Note: If you are **not** developing build tools, you can skip this.*

```js
const swc = require('swc');

const output = swc.transformSync('source code', {
    // Equivalent to .swcrc
    jsc: {
        parser: {
            syntax: "ecmascript",
        },
        transform: {
            
        }
    }
});
output.code; // transformed code
output.map; // source map (in string)

const output2 = swc.transformFileSync('path_to_file', {
    // Equivalent to .swcrc
    // ...    
})
output2.code; // transformed code
output2.map; // source map (in string)

```