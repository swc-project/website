---
id: usage-cli
title: Using cli
sidebar_label: cli
---

## Installation

```sh
npm i --save-dev @swc/cli @swc/core
```

## Usage

```sh
# Transpile one file and emit to stdout.
npx swc FILE

# Transpile one file and emit to `output.js`.
npx swc FILE -o output.js

# Transpile and write output to dir
npx swc DIR -d dir
```
