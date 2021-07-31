---
id: config-js-minify
title: Configuring js minifier
sidebar_label: Minification
---

**Note:** Currently it's far from perfect. I decided to focus on real-world usages and I implemented rules used by some famous open source libraries. If the bundle size of your project is not good enough, please let me know. Feel free to file an issue or email me if it's a secret. ([kdy1997.dev@gmail.com](mailto:kdy1997.dev@gmail.com))

---

## Configuring

### via .swcrc

You can configure javascript minifier using `.swcrc`.

Example `.swcrc` looks like:

```json
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

## Using

### `minify(code, options)`

    ### `minifySync(code, options)`

### Replacing terser without waiting for library developers

If you want to reduce build time without waiting for libraries developers to update their dependency, you can use `resolution` of [yarn][] to override terser.

Add the code below to the `package.json` file.

```json
  "resolutions": {
    "terser": "npm:@swc/core"
  }
```

This will allow using the minifier of swc instead of terser for all nested dependencies.

After patching `package.json`, you should remove lockfile and reinstall dependencies.

```sh
$ rm -rf node_modules yarn.lock
$ yarn
```

[yarn]: https://yarnpkg.com/
