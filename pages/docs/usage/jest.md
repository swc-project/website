# @swc/jest

To make your Jest tests run faster, you can swap out the default JavaScript-based runner (`ts-jest`) for a [drop-in Rust replacement](https://github.com/swc-project/jest) using SWC.

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
