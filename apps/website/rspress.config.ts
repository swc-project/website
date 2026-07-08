import path from "node:path";
import { defineConfig } from "@rspress/core";
import { pluginClientRedirects } from "@rspress/plugin-client-redirects";
import { withZephyr } from "zephyr-rspress-plugin";

const exactPath = (path: string) =>
  `^${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\.html)?/?$`;

const redirects = [
  {
    from: exactPath("/docs/getting-started/getting-started"),
    to: "/docs/getting-started.html",
  },
  { from: exactPath("/docs"), to: "/docs/getting-started.html" },
  { from: exactPath("/docs/usage-swc-cli"), to: "/docs/usage/cli.html" },
  { from: exactPath("/docs/usage-swc-wasm"), to: "/docs/usage/wasm.html" },
  { from: exactPath("/docs/usage-spack-cli"), to: "/docs/usage/bundling.html" },
  {
    from: exactPath("/docs/usage-swc-loader"),
    to: "/docs/usage/swc-loader.html",
  },
  { from: exactPath("/docs/usage-swc-jest"), to: "/docs/usage/jest.html" },
  { from: exactPath("/docs/usage-core"), to: "/docs/usage/core.html" },
  {
    from: exactPath("/docs/usage-plugin"),
    to: "/docs/plugin/registering-plugins.html",
  },
  { from: exactPath("/docs/installation"), to: "/docs/getting-started.html" },
  {
    from: exactPath("/docs/configuring-swc"),
    to: "/docs/configuration/swcrc.html",
  },
  {
    from: exactPath("/docs/preset-env"),
    to: "/docs/configuration/supported-browsers.html",
  },
  {
    from: exactPath("/docs/config-js-module"),
    to: "/docs/configuration/modules.html",
  },
  {
    from: exactPath("/docs/config-js-minify"),
    to: "/docs/configuration/minification.html",
  },
  {
    from: exactPath("/docs/spack-basic"),
    to: "/docs/configuration/bundling.html",
  },
  {
    from: exactPath("/docs/spack-multi-bundle"),
    to: "/docs/configuration/bundling.html",
  },
  {
    from: exactPath("/docs/migrating-from-babel-core"),
    to: "/docs/migrating-from-babel.html",
  },
  {
    from: exactPath("/docs/migrating-from-babel-cli"),
    to: "/docs/migrating-from-babel.html",
  },
  {
    from: exactPath("/docs/comparison-babel"),
    to: "/docs/migrating-from-babel.html",
  },
  { from: exactPath("/docs/benchmark-autogen"), to: "/docs/benchmarks.html" },
  { from: exactPath("/docs/benchmark-transform"), to: "/docs/benchmarks.html" },
  { from: exactPath("/docs/online-repl"), to: "/playground.html" },
  {
    from: exactPath("/blog/2019/02/08/Introducing-swc-1.0"),
    to: "/blog/swc-1.html",
  },
  {
    from: exactPath("/blog/2020/02/16/why-is-swc-fast"),
    to: "/blog/perf-swc-vs-babel.html",
  },
];

export default defineConfig({
  root: path.join(__dirname, "content"),
  outDir: "doc_build",
  // Zephyr's Rspress plugin switches to static-file deployment only when
  // SSG is explicitly enabled here. Rspress still uses an internal SSR
  // renderer at build time to produce these static HTML files.
  ssg: true,
  title: "SWC",
  description:
    "SWC is an extensible Rust-based platform for the next generation of fast developer tools.",
  icon: "/favicon/favicon.ico",
  logo: "/logo.png",
  logoText: "SWC",
  globalStyles: path.join(__dirname, "styles.css"),
  plugins: [pluginClientRedirects({ redirects }), withZephyr()],
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/favicon/site.webmanifest" }],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#ffffff" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["meta", { httpEquiv: "Content-Language", content: "en" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@kdy1dev" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "SWC" }],
  ],
  builderConfig: {
    resolve: {
      alias: {
        components: path.join(__dirname, "components"),
      },
    },
  },
  themeConfig: {
    editLink: {
      docRepoBaseUrl:
        "https://github.com/swc-project/website/tree/main/apps/website/content",
    },
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/swc-project/swc",
      },
      {
        icon: "discord",
        mode: "link",
        content: "https://discord.gg/GnHbXTdZz6",
      },
    ],
  },
});
