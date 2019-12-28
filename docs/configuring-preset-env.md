---
id: preset-env
title: preset-env
sidebar_label: preset-env
---

Starting with `v1.1.10`, you can now use browserslist to automaticallly configure swc.

## Usage

### Example

`.swcrc`:

```json
{
  "env": {
    "targets": {
      "chrome": "79"
    },
    "mode": "entry"
  }
}
```

### browserslist

If you want to use `browserslist` with swc, you can just omit `targets` field like

`.swcrc`:

```json
{
  "env": {}
}
```

Note that [browserlists](https://github.com/browserslist/browserslist) can be configured by multiple ways.

- `.browserslistrc`
- `browsers` field in package.json

## Options

### targets

`string | Array<string> | { [string]: string }`, defaults to `{}`.

Describes the environments you support/target for your project.

This can either be a [browserslist-compatible](https://github.com/ai/browserslist) query:

```json
{
  "targets": "> 0.25%, not dead"
}
```

Or an object of minimum environment versions to support:

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

Example environments: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`.

If `targets` is not specified, `swc` uses `browserslist` to get target information. See [browserslist](#browserslist)

### mode

Possible values: `usage`, `entry`, `undefined`
Defaults to `undefined`.

### debug

Defaults to `false`.

### dynamicImport

Defaults to `false`.

### loose

`boolean`, defaults to `false`.

Enable ["loose" transformations](http://2ality.com/2015/12/babel6-loose-mode.html) for any plugins in this preset that allow them.

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
