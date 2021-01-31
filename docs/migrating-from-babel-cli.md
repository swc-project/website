---
id: migrating-from-babel-cli
title: Migrating from babel cli
sidebar_label: "@babel/cli"
---

## Installation

Run

```sh
npm i --save-dev @swc/cli @swc/core
```

or

```sh
yarn add --dev @swc/cli @swc/core
```

CLI apis of `@swc/cli` are intentionally almost same as it of `@babel/cli`. So you can just replace `npx babel` to `npx swc`. If it results in an error, please [report an error][issues].
