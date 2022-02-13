# @swc/jest

To make your Jest tests run faster, you can swap out the default JavaScript-based test runner for a [drop-in Rust replacement](https://github.com/swc-project/jest) using SWC.

## Installation

```plaintext
npm i -D jest @swc/jest
```

## Usage

Inside `jest.config.js`, configure Jest to use SWC:

```js
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
```

### Usage with Next.js

If you're using SWC as part of Next.js, you do _not_ need to manually install this. Instead, you should use `next/jest`.

[Learn how to use Jest with Next.js.](https://nextjs.org/docs/advanced-features/compiler#jest)
