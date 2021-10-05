---
id: config-js-minify
title: Configuring js minifier
sidebar_label: Minification
---

> Requires v1.2.67

**Note:** Currently, it's far from perfect. I decided to focus on real-world usages and only rules used by famous open source libraries are implemented. If the bundle size of your project is not good enough, please let me know. Feel free to file an issue or email me if it's a secret. ([kdy1997.dev@gmail.com](mailto:kdy1997.dev@gmail.com))

---

## Config

The minifier uses options which is almost identical to it of `terser`.
Options like `ie8` are ignored, but the minifier accepts it and ignores to be compatible with `terser`.

### via .swcrc

You can configure javascript minifier using `.swcrc`.

Example `.swcrc` looks like:

```jsonc
{
  "jsc": {
    "minify": {
      "compress": {
        "unused": true
      },
      "mangle": true
    }
  },
  // Enable minification in codgen.
  "minify": true
}
```

### `jsc.minify.compress`

Type: `boolean | object`.

`true` is same as an empty object (`{}`).

```json
{
  "jsc": {
    "minify": {
      "compress": true
    }
  }
}
```

is identical to

```json
{
  "jsc": {
    "minify": {
      "compress": {}
    }
  }
}
```

Please refer to [the compress option](https://terser.org/docs/api-reference.html#compress-options) of `terser`.

#### `arguments`

Defaults to `false`.

#### `arrows`

Defaults to `true`.

#### `booleans`

Defaults to `true`.

#### `booleans_as_integers`

Defaults to `false`.

#### `collapse_vars`

Defaults to `true`.

#### `comparisons`

Defaults to `true`.

#### `computed_props`

Defaults to `false`.

#### `conditionals`

Defaults to `false`.

#### `dead_code`

Defaults to `false`.

#### `defaults`

Defaults to `true`.

#### `directives`

Defaults to `false`.

#### `drop_console`

Defaults to `false`.

#### `drop_debugger`

Defaults to `true`.

#### `ecma`

Defaults to `5`.

#### `evaluate`

Defaults to `true`.

#### `global_defs`

Defaults to `{}`.

#### `hoist_funs`

Defaults to `false`.

#### `hoist_props`

Defaults to `true`.

#### `hoist_vars`

Defaults to `false`.

#### `ie8`

Ignored.

#### `if_return`

Defaults to `true`.

#### `inline`

Defaults to ``.

#### `join_vars`

Defaults to `true`.

#### `keep_classnames`

Defaults to `false`.

#### `keep_fargs`

Defaults to `false`.

#### `keep_infinity`

Defaults to `false`.

#### `loops`

Defaults to `true`.

#### `negate_iife`

Defaults to `true`.

#### `passes`

Defaults to `0`, which means no limit.

#### `properties`

Defaults to `true`.

#### `pure_getters`

Defaults to ``.

#### `pure_funcs`

Defaults to `[]`.
Type is an array of string.

#### `reduce_funcs`

Defaults to `false`.

#### `reduce_vars`

Defaults to `false`.

#### `sequences`

Defaults to `true`.

#### `side_effects`

Defaults to `true`.

#### `switches`

Defaults to `false`.

#### `top_retain`

Defaults to ``.

#### `toplevel`

Defaults to ``.

#### `typeofs`

Defaults to `true`.

#### `unsafe`

Defaults to `false`.

#### `unsafe_arrows`

Defaults to `false`.

#### `unsafe_comps`

Defaults to `false`.

#### `unsafe_Function`

Defaults to `false`.

#### `unsafe_math`

Defaults to `false`.

#### `unsafe_symbols`

Defaults to `false`.

#### `unsafe_methods`

Defaults to `false`.

#### `unsafe_proto`

Defaults to `false`.

#### `unsafe_regexp`

Defaults to `false`.

#### `unsafe_undefined`

Defaults to `false`.

#### `unused`

Defaults to `true`.

#### `module`

Ignored. Currently, all files are treated as module.

### `jsc.minify.mangle`

Type: `boolean | object`.

`true` is same as an empty object (`{}`).

```json
{
  "jsc": {
    "minify": {
      "mangle": true
    }
  }
}
```

is identical to

```json
{
  "jsc": {
    "minify": {
      "mangle": {}
    }
  }
}
```

Please refer to [the mangle option](https://terser.org/docs/api-reference.html#mangle-options) of `terser`.

#### `properties`

Defaults to `{}`.

#### `topLevel`

Defaults to `false`.
Aliased as `toplevel` for compatibility with `terser`.

#### `keepClassNames`

Defaults to `false`.

Aliased as `keep_classnames` for compatibility with `terser`.

#### `keepFnNames`

Defaults to `false`.

#### `keepFnNames`

Defaults to `false`.

#### `keepPrivateProps`

Defaults to `false`.

Aliased as `keep_private_props` for compatibility with `terser`.

#### `ie8`

Ignored.

#### `safari10`

Not implemented yet.

## Usage

### swc.minify(code, options)

This API exists on `@swc/core`.

Returns `Promise<{ code: string, map: string }>`.

---

This API is asynchronous and all of parsing, minification and code generation will be done in background thread.
The `options` argument is same as `jsc.minify` object.
You can use it like

```js
import swc from "@swc/core";

const { code, map } = await swc.minify(
  "import foo from '@src/app'; console.log(foo)",
  {
    compress: false,
    mangle: true,
  }
);

expect(code).toMatchInlineSnapshot(`"import a from'@src/app';console.log(a);"`);
```

### swc.minifySync(code, options)

This API exists on `@swc/core`, `@swc/wasm`, `@swc/wasm-web`.

Returns `{ code: string, map: string }`.

Usage is similar to `swc.minify`.

### APIs for WASM

### Replacing terser without waiting for library developers

If you want to reduce build time without waiting for libraries developers to update their dependency, you can use `resolution` of [yarn][] to override terser.

Add the code below to the `package.json` file.

```json
 "resolutions": { "terser": "npm:@swc/core" }
```

This will allow using the minifier of swc instead of terser for all nested dependencies.

After patching `package.json`, you should remove lockfile and reinstall dependencies.

```sh
$ rm -rf node_modules yarn.lock
$ yarn
```

[yarn]: https://yarnpkg.com/
