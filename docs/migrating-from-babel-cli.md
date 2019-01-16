---
id: migrating-from-babel-cli
title: Migrating from babel cli
sidebar_label: @babel/cli
---

## Installation
```sh
npm i --save-dev swc-cli swc
```


## Usage

```sh
# from
npx babel FILE
# to
npx swc FILE


# from
npx babel FILE -o output.js
# to
npx swc FILE -o output.js

# from
npx babel DIR -d out
# to
npx swc DIR -d out
```