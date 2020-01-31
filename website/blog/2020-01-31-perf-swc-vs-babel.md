---
title: "Performance comparison of swc and babel"
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
draft: true
---

## Single core world

JavaScript is single-threaded. The js thread is not a good place to do heavy computation. Let's talk about `babel` and `swc`, which are both compute-heavy.

swc repository: [swc][]
babel homepage: [babel]([https://babeljs.io/)

### Benchmark

Let's do a benchmark for the single-core workload. Note that this uses `transformSync`, which is rarely useful in the wild.

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
Although `swc (es3)` do more work than `babel (es5)`, `swc (es3)` is faster than `babel (es5)`.

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

I ran benchmarks on my old desktop. It has E3-v1275 and 24GB of ram.

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

Now, we need to multiply it by 4, as we do 4 operations per iteration.

```sh
swc (es3) x 1704 ops/sec ±3.75% (73 runs sampled)
swc (es2015) x 1688 ops/sec ±3.57% (74 runs sampled)
swc (es2016) x 3948 ops/sec ±2.53% (75 runs sampled)
swc (es2017) x 3948 ops/sec ±3.44% (75 runs sampled)
swc (es2018) x 4884 ops/sec ±2.46% (77 runs sampled)
swc-optimize (es3) x 1716 ops/sec ±1.94% (82 runs sampled)
babel (es5) x 27.28 ops/sec ±17.18% (40 runs sampled)
```

This is an actual result.

The performance of `babel (es5)` is dropped. Async is not free. Even though, `34.05 ops/sec` => `27.28 ops/sec` is much more than I expected,

### Benchmark for many works

I modified the benchmark file slightly to make it creates 100 promises per iteration.

```sh
CPU Core: 8; Parallelism: 100
Note that output of this benchmark should be multiplied by 100 as this test uses Promise.all
[multicore]
  swc (es3) x 21.99 ops/sec ±1.83% (54 runs sampled)
  swc (es2015) x 19.11 ops/sec ±3.39% (48 runs sampled)
  swc (es2016) x 55.80 ops/sec ±6.97% (71 runs sampled)
  swc (es2017) x 62.59 ops/sec ±2.12% (74 runs sampled)
  swc (es2018) x 81.08 ops/sec ±5.22% (75 runs sampled)
  swc-optimize (es3) x 18.60 ops/sec ±2.13% (50 runs sampled)
  babel (es5) x 0.32 ops/sec ±19.10% (6 runs sampled)
```

It must be multiplied by 100 as above.

```sh
  swc (es3) x 2199 ops/sec ±1.83% (54 runs sampled)
  swc (es2015) x 1911 ops/sec ±3.39% (48 runs sampled)
  swc (es2016) x 5580 ops/sec ±6.97% (71 runs sampled)
  swc (es2017) x 6259 ops/sec ±2.12% (74 runs sampled)
  swc (es2018) x 8108 ops/sec ±5.22% (75 runs sampled)
  swc-optimize (es3) x 1860 ops/sec ±2.13% (50 runs sampled)
  babel (es5) x 32 ops/sec ±19.10% (6 runs sampled)
```

You may be curious why does the performance of swc does not drop drastically. The secret is node js. node js internally manages a worker thread pool, and swc runs on it. Thus, even though you create 100 promises at once, the number of worker threads is much smaller than it.

## Conclusion

Hmm... We need a table.

|        name        | 1 core, sync  |  4 promises   | 100 promises |
| :----------------: | :-----------: | :-----------: | :----------: |
|     swc (es3)      |  616 ops/sec  | 1704 ops/sec  | 2199 ops/sec |
|    swc (es2015)    |  677 ops/sec  | 1688 ops/sec  | 1911 ops/sec |
|    swc (es2016)    | 1963 ops/sec  | 3948 op s/sec | 5580 ops/sec |
|    swc (es2017)    | 1971 ops/sec  | 3948 ops/sec  | 6259 ops/sec |
|    swc (es2018)    | 2555 ops/sec  | 4884 ops/sec  | 8108 ops/sec |
| swc-optimize (es3) |  645 ops/sec  | 1716 ops/sec  | 1860 ops/sec |
|    babel (es5)     | 34.05 ops/sec | 27.28 ops/sec |  32 ops/sec  |

`swc` scales well, as it does almost all work in the worker thread. From the fact that the throughput of `100 promises` was better than `4 promises`, we can conclude that the worker thread pool of node js utilizes hyperthreading.

For the conclusion, `swc` scales up with the number of cpu cores. `Promise.all` is enough for scaling. No additional process. I recommend trying it.

Repository: [swc][]

---

[swc]: https://github.com/swc-project/swc
