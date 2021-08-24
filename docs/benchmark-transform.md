---
id: benchmark-transform
title: Transforms
sidebar_label: Transforms
---

See [kdy1/benchmark-done-right](https://github.com/kdy1/benchmark-done-right) for the benchmark source code.

## Things to note

> babel does not same work. It does only little bit of works, but I didn't bother to configure it because it's slow even it does tiny amounts of work.

> babel does not support parellel transforms.

> esbuild does not support `es3`.

## How to interpret result.

For most users, most important test result is parallel benchmark.
It's because build tool authors are smart enough to use `await Promise.all(tasks)` and the benchmark scenario which is most close to it is `parallel`.

If you are not lucky enough and you need to apply transforms synchronously, `synchronous` benchmark matters.

## Parallel

Performance of babel and tsc is identical as them of sychronous benchmark.

### es3

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es3.png)

### es5

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es5.png)

### es2015

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2015.png)

### es2016

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2016.png)

### es2017

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2017.png)

### es2018

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2018.png)

### es2019

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2019.png)

### es2020

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/parallel/es2020.png)

## Synchronous

### es3

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es3.png)

### es5

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es5.png)

### es2015

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2015.png)

### es2016

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2016.png)

### es2017

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2017.png)

### es2018

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2018.png)

### es2019

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2019.png)

### es2020

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/sync/es2020.png)

## Asynchronous

This benchmark suite does not use all cpu cores.

For swc, the benchmark stores only one task on node.js thread pool at a time.

### es3

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es3.png)

### es5

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es5.png)

### es2015

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2015.png)

### es2016

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2016.png)

### es2017

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2017.png)

### es2018

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2018.png)

### es2019

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2019.png)

### es2020

![Images](https://raw.githubusercontent.com/kdy1/benchmark-done-right/main/images/transform/async/es2020.png)
