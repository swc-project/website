module.exports = {
  title: "swc",
  tagline: "Super fast javascript / typescript compiler",
  url: "https://swc.rs",
  baseUrl: "/",
  organizationName: "swc-project",
  projectName: "swc",
  scripts: ["https://buttons.github.io/buttons.js"],
  favicon: "img/favicon.png",
  customFields: {
    blogSidebarCount: "ALL",
    users: [
      {
        caption: "ByteDance",
        image: "/img/users/byte-dance.png",
        infoLink: "https://www.bytedance.com",
        pinned: true,
      },
      {
        caption: "Deno",
        image: "/img/users/deno.svg",
        infoLink: "https://deno.land",
        pinned: true,
      },
      {
        caption: "Fundamentei",
        image: "/img/users/fundamentei.png",
        infoLink: "https://fundamentei.com/",
        pinned: true,
      },
      {
        caption: "Framer",
        image: "/img/users/framer.svg",
        infoLink: "https://framer.com/",
        pinned: true,
      },
      {
        caption: "strapi",
        image: "/img/users/strapi.svg",
        infoLink: "https://strapi.io/",
        pinned: true,
      },
      {
        caption: "octopol",
        image: "/img/users/octopol.jpeg",
        infoLink: "https://octopol.io/",
        pinned: true,
      },
    ],
    sponsors: [],
    repoUrl: "https://github.com/swc-project/swc",
    facebookAppId: "3577925395580880",
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "../src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: "swc",
      items: [
        { to: "docs", label: "Docs", position: "left" },
        { to: "help", label: "Help", position: "left" },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://opencollective.com/swc",
          label: "Donate",
          position: "left",
        },
        {
          href: "https://github.com/swc-project/swc",
          label: "GitHub",
          position: "left",
        },
      ],
    },
    image: "img/swc.png",
    footer: {
      links: [],
      copyright: "Copyright © 2020 The swc project developers",
      logo: {
        src:
          "https://raw.githubusercontent.com/swc-project/logo/master/swc.png",
      },
    },
    algolia: {
      apiKey: "5b6acdf7dc8baaa86317236bb5e2bb9e",
      indexName: "swc-project",
      algoliaOptions: {},
    },
    gtag: {
      trackingID: "UA-81467907-3",
    },
  },
};
