---
title: "Performance comparison of swc and babel"
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
---

# Single core world

JavaScript is single-threaded.

```
[transform]
  swc (es3) x 616 ops/sec ±4.36% (88 runs sampled)
  swc (es2015) x 677 ops/sec ±2.01% (90 runs sampled)
  swc (es2016) x 1,963 ops/sec ±0.45% (93 runs sampled)
  swc (es2017) x 1,971 ops/sec ±0.35% (94 runs sampled)
  swc (es2018) x 2,555 ops/sec ±0.35% (93 runs sampled)
  swc-optimize (es3) x 645 ops/sec ±0.40% (90 runs sampled)
  babel (es5) x 34.05 ops/sec ±1.15% (58 runs sampled)

```

Well, swc is very fast. It is an expected result.

# Real world

However, we don't use `transformSync`, as it blocks the current thread and everything stops.

(The output below is copied as-is from benchmark output)

```
CPU Core: 8; Parallelism: 4
Note that output of this benchmark should be multiplied by 4 as this test uses Promise.all
[multicore]
  swc (es3) x 426 ops/sec ±3.75% (73 runs sampled)
  swc (es2015) x 422 ops/sec ±3.57% (74 runs sampled)
  swc (es2016) x 987 ops/sec ±2.53% (75 runs sampled)
  swc (es2017) x 987 ops/sec ±3.44% (75 runs sampled)
  swc (es2018) x 1,221 ops/sec ±2.46% (77 runs sampled)
  swc-optimize (es3) x 429 ops/sec ±1.94% (82 runs sampled)
  babel (es5) x 6.82 ops/sec ±17.18% (40 runs sampled)

```
