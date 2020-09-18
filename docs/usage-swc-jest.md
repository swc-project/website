---
id: usage-swc-jest
title: Using swc with jest
sidebar_label: @swc/jest
---

## Installation

```
npm i -D jest @swc/jest
```

## Usage

`jest.config.js`:

```js
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
```
