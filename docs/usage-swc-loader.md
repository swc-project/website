---
id: usage-swc-loader
title: Using swc with webpack
sidebar_label: swc-loader (Webpack)
---

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        // `.swcrc` can be used to configure swc
        loader: 'swc-loader',
      }
    }
  ]
}

```