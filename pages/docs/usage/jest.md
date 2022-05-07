# @swc/jest

To make your Jest tests run faster, you can swap out the default JavaScript-based runner (`ts-jest`) for a [drop-in Rust replacement](https://github.com/swc-project/jest) using SWC.

## Installation

```shell
# if you use npm
npm i -D jest @swc/core @swc/jest

# if you use yarn
yarn add -D jest @swc/core @swc/jest
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
