---
title: Introducing swc 1.0
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
---

## Introduction

### What is swc?

[swc](https://github.com/swc-project/swc)(speedy web compiler) is a super-fast javascript to javascript compiler.

### What can swc do?

It can transpile typescript / jsx / ecmascript 2019 to browser-compatible javascript.

`input.js`:

```js
class Foo {
  set foo(v) {}
}
class Bar extends Foo {
  get bar1() {}
  async bar2() {}
}
```

### How fast is swc?

It's 16x - 20x faster than babel even on single-core synchronous benchmark. Note that actual performance gap is larger because swc works on worker thread while babel works on event loop thread.

## Installation

You can install `swc` with

```sh
npm install --save-dev @swc/core
```

or

```sh
yarn add --dev @swc/core
```

See [installation guide](/docs) for more details.

## What is included in swc 1.0.0?

Swc implements almost all babel plugins. As of 1.0.0, swc can understand various dialects of ecmascript and compiles them into es5.

### ECMAScript 2019 support

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

### React (with jsx)

`.swcrc`:

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    }
  }
}
```

### Typescript support

Swc can also compile typescript / tsx to ecmascript. Note that it does not type-check at the time of writing. Type checking is tracked at [#126](https://github.com/swc-project/swc/issues/126).

`.swcrc`:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false
    }
  }
}
```

See [docs](/docs/configuring-swc) for more details.

### Various transforms

- es3

  - member-expression-literals
  - property-literals
  - reserved-words

- es2015

  - arrow-functions
  - block-scoped-functions
  - block-scoping
  - classes
  - computed-properties
  - destructuring
  - duplicate-keys
  - for-of
  - function-name
  - instanceof
  - literals
  - new-target
  - parameters
  - shorthand-properties
  - spread
  - sticky regex (`y` flag)
  - template-literals
  - typeof-symbol

- es2016

  - exponentiation-operator

- es2017

  - async-to-generator

- es2018

  - object-rest-spread

- react
  - jsx

## Migrating from babel

### @babel/core

Run `npm i --save-dev @swc/core` or `yarn add --dev @swc/core`.

Swc enables all passes by default. So if you are using only standard ecmascript, you can just delete `.babelrc` and change `babel.transform()` to `swc.transform()`.

See [usage docs](/docs/usage-core) and [migration docs](/docs/migrating-from-babel-core) for more details.
Also note that swc does not support custom plugin yet.

### @babel/cli

Run `npm i --save-dev @swc/core @swc/cli` or `yarn add --dev @swc/core @swc/cli` to install. CLI apis of `@swc/cli` is almost equivalent to it of `@babel/cli`. So if you are using standard ecmascript, you can just replace `npx babel` to `npx swc`. If it results in an error, please [report an error][issues].

See [usage docs](/docs/usage-swc-cli) and [migration docs](/docs/migrating-from-babel-cli) for more details. Also note that swc does not support custom plugin yet.

[issues]: https://github.com/swc-project/swc/issues
