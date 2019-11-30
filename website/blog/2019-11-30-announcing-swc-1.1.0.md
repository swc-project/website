---
title: Announcing swc v1.1.0
author: DongYoon Kang
authorURL: http://github.com/kdy1
authorFBID: 100024888122318
---


## Plugin

`swc` now supports custom plugins written in javascript and friends! Note that `.d.ts` file for ast nodes and `Visitor` is provided.

### Performance

One of difference of `swc` with `babel` is performance. I optimized `swc` binary in many ways and here's the benchmark result ran on my MacBook Pro (2.3GHz, 16GB Memory)

```
[plugin]
  parse x 3,156 ops/sec ±0.43% (89 runs sampled)
  parse + print x 740 ops/sec ±0.35% (88 runs sampled)
  parse + transform x 734 ops/sec ±0.22% (88 runs sampled)
  plugin x 720 ops/sec ±0.32% (87 runs sampled)
[transform]
  swc (es3) x 761 ops/sec ±0.23% (89 runs sampled)
  swc (es2015) x 800 ops/sec ±1.02% (87 runs sampled)
  swc (es2016) x 2,123 ops/sec ±0.84% (88 runs sampled)
  swc (es2017) x 2,131 ops/sec ±1.13% (90 runs sampled)
  swc (es2018) x 2,981 ops/sec ±0.25% (90 runs sampled)
  swc-optimize (es3) x 712 ops/sec ±0.21% (86 runs sampled)
  babel (es5) x 41.75 ops/sec ±8.07% (56 runs sampled)
[typescript]
  swc (es3) x 646 ops/sec ±2.25% (87 runs sampled)
  swc (es5) x 703 ops/sec ±0.55% (89 runs sampled)
  swc (es2015) x 708 ops/sec ±0.26% (87 runs sampled)
  swc (es2016) x 1,656 ops/sec ±0.17% (90 runs sampled)
  swc (es2017) x 1,661 ops/sec ±0.33% (91 runs sampled)
  swc (es2018) x 2,135 ops/sec ±0.25% (88 runs sampled)
  swc-optimize (es3) x 631 ops/sec ±0.13% (88 runs sampled)
  babel (es5) x 41.89 ops/sec ±4.62% (54 runs sampled)
```

`:babel` does same tasks as "swc (es5)" while `:plugin` does tasks of "swc (es3)" and javsacript-based traversal of all ast nodes. `swc` is much faster than babel even though `swc` does more work.


### Example plugin

Let's write a transform which removes console calls such as `console.log()`.

```ts
import { CallExpression, Expression } from '@swc/core';
import Visitor from '@swc/core/Visitor'

export default class ConsoleStripper extends Visitor {
    visitCallExpression(e: CallExpression): Expression {
        if (e.callee.type !== 'MemberExpression') {
            return e;
        }

        if (e.callee.object.type === 'Identifier' && e.callee.object.value === 'console') {
            if (e.callee.property.type === 'Identifier') {
                return {
                    type: "UnaryExpression",
                    span: e.span,
                    operator: 'void',
                    argument: {
                        type: 'NumericLiteral',
                        span: e.span,
                        value: 0
                    }
                }
            }
        }

        return e
    }
}
```

You are done. You can turn on swc's optimizer with `jsc.transform.optimizer` to remove void 0.

See: https://github.com/swc-project/plugin-strip-console



## Parser

### Performance

Again, `swc` is fast.


```
test angular          ... bench:  30,891,704 ns/iter (+/- 772,962) = 23 MB/s
test backbone         ... bench:   4,373,650 ns/iter (+/- 180,866) = 13 MB/s
test colors           ... bench:      51,904 ns/iter (+/- 18,036) = 22 MB/s
test jquery           ... bench:  24,994,575 ns/iter (+/- 859,167) = 10 MB/s
test jquery_mobile    ... bench:  38,977,299 ns/iter (+/- 1,264,947) = 11 MB/s
test mootools         ... bench:  20,026,818 ns/iter (+/- 552,056) = 8 MB/s
test underscore       ... bench:   3,628,824 ns/iter (+/- 101,667) = 12 MB/s
test yui              ... bench:  18,176,174 ns/iter (+/- 213,133) = 18 MB/s
```


### Optional chaining ([#442](https://github.com/swc-project/swc/issues/442))

`swc` now supports optional chaining from [typescript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html).

```ts
let foo = a?.b?.c;
```

As this is official syntax, this is enabled by default if you configure `{ syntax: "typescript" }` in `.swcrc`.


### Error recovery

`swc_ecma_parser` did not supported any error recovert when `v1.0.0` was released. As it made debugging hard, I implemented lot of error recovery logic. Note that I'll keep improving error recovery while `swc` matches the grade of tsc.

I stored reference errors of each file in [ecmascript parser's test suite](https://github.com/swc-project/swc/tree/master/ecmascript/parser/tests/test262-error-references/fail). 

```
error: Unexpected token Some(Comma)
 --> $DIR/tests/test262-parser/fail/0557c70da3f698b5.module.js:1:11
  |
1 | import {b,,c} from 'a';
  |           ^

```

This is an exmaple of reference.

### Span

Span of error becomes much more accurate. Swc has an error reporting test which tests many tests from [test262][], the official ecmascript test suite.




## .swcrc

`.swcrc` file is improved.


### Multiple entries

Starting with `v1.0.47`, you can specify multiple entries in `.swcrc`. 

```json
[
  {
    "test": ".*.js$",
    "module": {
      "type": "commonjs"
    }
  },
  {
    "test": ".*.ts$",
    "module": {
      "type": "amd"
    }
  }
]
```

This make swc compile javascript files as common js module (uses `require('foo')`) and compile typescript files as amd modules.



[test262]:https://github.com/tc39/test262