---
id: usage-cli
title: Using cli
sidebar_label: CLI
---

## Installation
```sh
npm i --save-dev swc-cli swc
```

## Usage

```sh
# Trnanspile one file and emit to stdout.
npx swc FILE

# Trnanspile one file and emit to output.
npx swc FILE -o output

# Transpile and merge into one file
npx swc DIR -o lib.js

# Transpile and write output to dir
npx swc DIR -d dir
```