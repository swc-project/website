# @swc/jest

To make your Jest tests run faster, you can swap out the default JavaScript-based runner for a drop-in Rust replacement with SWC.

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
