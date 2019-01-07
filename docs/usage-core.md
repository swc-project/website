---
id: usage-core
title: swc api
sidebar_label: swc (core)
---

*Note: If you are **not** developing build tools, you can skip this.*

```js
const swc = require('swc');

const output = swc.transform('source code', {
    
});
output.code; // transformed code
output.map; // source map (in string)

const output2 = swc.transformFileSync(pathToFile, {
    
})
output2.code; // transformed code
output2.map; // source map (in string)

```