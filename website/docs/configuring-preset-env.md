---
id: preset-env
title: preset-env
sidebar_label: preset-env
---

Starting with `v1.1.10`, you can now use browserslist to automaticallly configure swc.

You need to install `browserslist` to use this feature.

## Usage

### Example

`.swcrc`:

```json
{
  "env": {
    "targets": {
      "chrome": "79"
    },
    "mode": "entry",
    "coreJs": 3
  }
}
```

### browserslist

If you want to use `browserslist` with swc, you can just omit `targets` field like

`.swcrc`:

```json
{
  "env": {
    "coreJs": 3
  }
}
```

Note that [browserlists](https://github.com/browserslist/browserslist) can be configured in multiple ways.

- `.browserslistrc`
- `browserslist` field in package.json

You can use [path](#path) to specify a custom path to load these configuration files from.

## Options

### targets

`string | Array<string> | { [string]: string }`, defaults to `{}`.

Describes the environments you support/target for your project.

This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query:

```json
{
  "env": {
    "targets": "> 0.25%, not dead"
  }
}
```

Or an object of minimum environment versions to support:

```json
{
  "env": {
    "targets": {
      "chrome": "58",
      "ie": "11"
    }
  }
}
```

Example environments: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`.

If `targets` is not specified, `swc` uses `browserslist` to get target information. See [browserslist](#browserslist)

### path

`string`, defaults to current directory.

The path specifies the directory to load the browserslist module and any browserslist configuration files
(e.g. `.browserslistrc`, `browserslist` field in package.json).

This can be useful if your build system isn't in the root of your project.

### mode

See: https://babeljs.io/docs/en/babel-preset-env#usebuiltins

Possible values: `usage`, `entry`, `undefined`
Defaults to `undefined`.

_Note:_ Currently `usage` is not efficient as one of babel. Even though, it does not matter in real world codes.

### debug

Defaults to `false`.

### dynamicImport

Defaults to `false`.

### loose

`boolean`, defaults to `false`.

Enable ["loose" transformations](http://2ality.com/2015/12/babel6-loose-mode.html) for any plugins in this preset that allow them.

### skip

Skip some es features. You can use this option to reduce bundle size.

For example, to exclude `core-js/modules/foo`, you can use

`.swcrc`:

```json
{
  "env": {
    "skip": ["core-js/modules/foo"]
  }
}
```

### include

- Type is string[]
- can be a core-js module (`es.math.sign`) or a swc pass (`transform-spread`)

### exclude

- `string[]`
- can be a core-js module (`es.math.sign`) or a swc pass (`transform-spread`)

### coreJs

The version of the used core js. Defaults to undefined, which panic when mode is configured.

### shippedProposals

- `boolean`
- Defaults to `false`.

### forceAllTransforms

- `boolean`
- Defaults to `false`.

Enable all trnasforms
