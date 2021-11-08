const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_stork: true,
  unstable_staticImage: true,
});

module.exports = withNextra({
  redirects: () => {
    return [
      {
        source: "/blog",
        destination: "/blog/type-checker",
        statusCode: 301,
      },
      {
        source: "/docs/usage-swc-cli",
        destination: "/docs/usage/cli",
      },
      {
        source: "/docs/usage-swc-wasm",
        destination: "/docs/usage/wasm",
      },
      {
        source: "/docs/usage-spack-cli",
        destination: "/docs/usage/bundling",
      },
      {
        source: "/docs/usage-swc-loader",
        destination: "/docs/usage/swc-loader",
      },
      {
        source: "/docs/usage-swc-jest",
        destination: "/docs/usage/jest",
      },
      {
        source: "/docs/usage-core",
        destination: "/docs/usage/core",
      },
      {
        source: "/docs/usage-plugin",
        destination: "/docs/usage/plugins",
      },
      {
        source: "/docs/installation",
        destination: "/docs/getting-started",
      },
      {
        source: "/docs/configuring-swc",
        destination: "/docs/configuration/swcrc",
      },
      {
        source: "/docs/preset-env",
        destination: "/docs/configuration/supported-browsers",
      },
      {
        source: "/docs/config-js-module",
        destination: "/docs/configuration/modules",
      },
      {
        source: "/docs/config-js-minify",
        destination: "/docs/configuration/minification",
      },
      {
        source: "/docs/spack-basic",
        destination: "/docs/configuration/bundling",
      },
      {
        source: "/docs/spack-multi-bundle",
        destination: "/docs/configuration/bundling",
      },
      {
        source: "/docs/migrating-from-babel-core",
        destination: "/docs/migrating-from-babel",
      },
      {
        source: "/docs/migrating-from-babel-cli",
        destination: "/docs/migrating-from-babel",
      },
      {
        source: "/docs/benchmark-autogen",
        destination: "/docs/benchmarks",
      },
      {
        source: "/docs/benchmark-transform",
        destination: "/docs/benchmarks",
      },
      {
        source: "/docs/online-repl",
        destination: "/playground",
      },
    ];
  },
});
