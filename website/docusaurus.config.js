module.exports = {
  title: "swc",
  tagline: "Super fast javascript / typescript compiler",
  url: "https://swc.rs",
  baseUrl: "/",
  organizationName: "swc-project",
  projectName: "swc",
  favicon: "img/favicon.png",
  customFields: {
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
    repoUrl: "https://github.com/swc-project/swc",
    sponsors: [],
    twitterImage: "img/swc.png",
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
          customCss: [require.resolve("./src/css/custom.css")],
        },
        blog: { blogSidebarCount: 1000 },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: "SWC",
      items: [
        { to: "docs/", label: "Docs", position: "right" },
        {
          href: "https://swc.rs/rustdoc/swc/",
          label: "SWC RustDocs",
          position: "right",
        },
        { to: "help", label: "Help", position: "right" },
        { to: "blog", label: "Blog", position: "right" },
        {
          href: "https://opencollective.com/swc",
          label: "Donate",
          position: "right",
        },
        {
          href: "https://github.com/swc-project/swc",
          label: "GitHub",
          position: "right",
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
