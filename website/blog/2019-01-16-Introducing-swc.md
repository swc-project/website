---
title: Introducing swc
author: DongYoon Kang
authorURL: http://github.com/kdy1
authorFBID: 100024888122318
---

## Introduction

### What is swc?
[swc](https://github.com/swc-project/swc) is a super-fast alternative for [babel](https://babeljs.io/).

### What can swc do?

It allows you to use esnext features now.

`input.js`:
```js
class Foo {
    set foo(v) { }
}
class Bar extends Foo {
    get bar1() {}
    async bar2() {}
}
```

### How fast is swc?

It's 13x faster than babel even on single-core benchmark.


# Installation

You can install `swc` with

```
npm install --save-dev swc
```
or
```
yarn add --dev swc
```
See [installation guide](/docs/installation) for more details.


## Frontends
Swc understands various dialects of ecmascript and compiles them into es5.

### ECMAScript 2019

`.swcrc`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript"
    }
  }
}
```


### React jsx

`.swcrc`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsc": true
    }
  }
}
```

### Typescript
swc can transpile typescript / tsx to ecmascript.


`.swcrc`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    }
  }
}
```



## Transcompilers

swc implements almost all babel plugins.


## Migrating from babel


