import * as path from "node:path";
import { defineConfig } from "@rspress/core";
import { pluginClientRedirects } from "@rspress/plugin-client-redirects";
import { pluginTwoslash } from "@rspress/plugin-twoslash";
import ts from "typescript";

export default defineConfig({
  plugins: [
    // Legacy URL redirects carried over from the Nextra site's next.config.mjs
    pluginClientRedirects({
      redirects: [
        { from: "^/docs/?$", to: "/docs/getting-started" },
        { from: "^/docs/usage-swc-cli/?$", to: "/docs/usage/cli" },
        { from: "^/docs/usage-swc-wasm/?$", to: "/docs/usage/wasm" },
        { from: "^/docs/usage-spack-cli/?$", to: "/docs/usage/bundling" },
        { from: "^/docs/usage-swc-loader/?$", to: "/docs/usage/swc-loader" },
        { from: "^/docs/usage-swc-jest/?$", to: "/docs/usage/jest" },
        { from: "^/docs/usage-core/?$", to: "/docs/usage/core" },
        {
          from: "^/docs/usage-plugin/?$",
          to: "/docs/plugin/selecting-swc-core",
        },
        { from: "^/docs/installation/?$", to: "/docs/getting-started" },
        { from: "^/docs/configuring-swc/?$", to: "/docs/configuration/swcrc" },
        {
          from: "^/docs/preset-env/?$",
          to: "/docs/configuration/supported-browsers",
        },
        {
          from: "^/docs/config-js-module/?$",
          to: "/docs/configuration/modules",
        },
        {
          from: "^/docs/config-js-minify/?$",
          to: "/docs/configuration/minification",
        },
        { from: "^/docs/spack-basic/?$", to: "/docs/configuration/bundling" },
        {
          from: "^/docs/spack-multi-bundle/?$",
          to: "/docs/configuration/bundling",
        },
        {
          from: "^/docs/migrating-from-babel-core/?$",
          to: "/docs/migrating-from-babel",
        },
        {
          from: "^/docs/migrating-from-babel-cli/?$",
          to: "/docs/migrating-from-babel",
        },
        {
          from: "^/docs/comparison-babel/?$",
          to: "/docs/migrating-from-babel",
        },
        { from: "^/docs/benchmark-autogen/?$", to: "/docs/benchmarks" },
        { from: "^/docs/benchmark-transform/?$", to: "/docs/benchmarks" },
        { from: "^/docs/online-repl/?$", to: "/playground/" },
        { from: "^/blog/2019/02/08/Introducing-swc-1.0/?$", to: "/blog/swc-1" },
        {
          from: "^/blog/2020/02/16/why-is-swc-fast/?$",
          to: "/blog/perf-swc-vs-babel",
        },
      ],
    }),
    // Twoslash type-hover annotations for fences tagged `ts twoslash`
    pluginTwoslash({
      twoslashOptions: {
        compilerOptions: {
          types: ["node"],
          // Snippets use top-level await and JSX
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          moduleResolution: ts.ModuleResolutionKind.Bundler,
          jsx: ts.JsxEmit.ReactJSX,
        },
      },
    }),
  ],
  root: path.join(__dirname, "docs"),
  title: "SWC",
  description:
    "SWC is an extensible Rust-based platform for the next generation of fast developer tools. It's used by tools like Next.js, Parcel, and Deno, as well as companies like Vercel, ByteDance, Tencent, Shopify, Trip.com, and more.",
  icon: "/favicon.ico",
  logo: "/logo.png",
  logoText: "SWC",
  globalStyles: path.join(__dirname, "src/styles/index.css"),
  route: {
    cleanUrls: true,
  },
  builderConfig: {
    resolve: {
      alias: {
        "@components": path.join(__dirname, "src/components"),
      },
    },
    html: {
      tags: [
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon/favicon-16x16.png",
          },
        },
        {
          tag: "link",
          attrs: { rel: "manifest", href: "/favicon/site.webmanifest" },
        },
        {
          tag: "link",
          attrs: {
            rel: "mask-icon",
            href: "/favicon/safari-pinned-tab.svg",
            color: "#000000",
          },
        },
        {
          tag: "meta",
          attrs: { name: "msapplication-TileColor", content: "#fafafa" },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            media: "(prefers-color-scheme: light)",
            content: "#fafafa",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            media: "(prefers-color-scheme: dark)",
            content: "#111111",
          },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
        },
        { tag: "meta", attrs: { name: "twitter:site", content: "@kdy1dev" } },
        {
          tag: "meta",
          attrs: { name: "apple-mobile-web-app-title", content: "SWC" },
        },
      ],
    },
  },
  themeConfig: {
    // NOTE: nav is defined in docs/_nav.json. Do not add `nav` here —
    // setting themeConfig.nav disables the auto-nav-sidebar plugin entirely,
    // which leaves every docs page without a sidebar.
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
    editLink: {
      docRepoBaseUrl:
        "https://github.com/swc-project/website/tree/main/apps/website/docs",
      text: "Edit this page on GitHub",
    },
    enableScrollToTop: true,
  },
});
