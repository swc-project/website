---
id: installation
title: Installation
---

You can install `swc` with

```sh
npm i -D @swc/core @swc/cli
```

or

```sh
yarn add --dev @swc/core @swc/cli
```

This will download a prebuilt binary instead of building swc if possible.
Currently prebuilt binaries are provided only for `mac (x64)` / `linux (x86_64)` / `win32-x64` / `pple silicon` / `linux aarch64` / `- linux armv7` / `android aarch64`.

To use on Alpine Linux, also install the `@swc/core-linux-musl` npm package.
