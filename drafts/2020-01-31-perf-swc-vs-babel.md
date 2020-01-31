---
title: "Real-world performance benchmark"
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
draft: true
---

## Single core world

### Benchmark

JavaScript is single-threaded.

```sh

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

## Benchmark for real world

However, `transformSync` and `transformFileSync` are rarely used int the real world, as it blocks the current thread and everything stops. Also, `await Promise.all()` is frequently used, as it's much better than

```js
for (const promise in promises) {
  await promise;
}
```

So let's create a benchmark for actual usages. It should involve `Promise.all()`.

### Ideal case

First, I created a benchmark for the _ideal_ case. It invokes n promises at once where n is the number of physical cpu core. See [node-swc repository](https://github.com/swc-project/node-swc/blob/bf7718049d67148e2094d0e431d71d4a21993ec7/benches/multicore.js) for the full code.

```js
const os = require("os");
const cpuCount = os.cpus().length;

const SOURCE = `
  // See the link above
`;

const SUITES = [
  // ...
  // See the link above
];

const arr = [];
for (let i = 0; i < cpuCount / 2; i++) {
  arr.push(0);
}

console.info(`CPU Core: ${cpuCount}; Parallelism: ${arr.length}`);
console.info(
  `Note that output of this benchmark should be multiplied by ${arr.length} as this test uses Promise.all`
);

SUITES.map(args => {
  const [name, requirePath, fn] = args;
  const func = fn.bind(null, require(requirePath));
  bench(name, async done => {
    await Promise.all(arr.map(v => func()));
    done();
  });
});
```

I ran benchmarks on my old desktop. It has E3-v1275, 24GB of ram.

The output below is copied as-is from benchmark output.

```sh

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
