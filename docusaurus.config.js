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
      // Pin only open source projects
      //
      //
      // Order: 
      //
      // 1. Open source projects which uses swc thoughtfully. (Ordered by financial contribution)
      // 2. Companies who use swc, sorted by the company size.
      //
      // lightImage is used for light theme
      // darkImage is used for dark theme
      // If both light and dark theme logos are same, use image:
      {
        caption: "Next.js",
        lightImage: "/img/users/nextjs-logotype-light.svg",
        darkImage: "/img/users/nextjs-logotype-dark.svg",
        infoLink: "https://nextjs.org/",
        pinned: true,
      },
      {
        caption: "Parcel",
        lightImage: "/img/users/parceljs.png",
        darkImage: "/img/users/parceljs.png",
        infoLink: "https://parceljs.org/",
        pinned: true,
      },
      {
        caption: "Deno",
        lightImage: "/img/users/deno.svg",
        darkImage: "/img/users/deno.svg",
        infoLink: "https://deno.land",
        pinned: true,
      },
      {
        caption: "Tencent",
        image: "/img/users/tencent.svg",
        infoLink: "https://www.tencent.com",
        pinned: false,
      },
      {
        caption: "Shopify",
        image: "/img/users/shopify.svg",
        infoLink: "https://www.shopify.com/",
        pinned: false,
      },
      {
        caption: "ByteDance",
        image: "/img/users/byte-dance.png",
        infoLink: "https://www.bytedance.com",
        pinned: false,
      },
      {
        caption: "Framer",
        image: "/img/users/framer.svg",
        infoLink: "https://framer.com/",
        pinned: false,
      },
      {
        caption: "Fundamentei",
        image: "/img/users/fundamentei.png",
        infoLink: "https://fundamentei.com/",
        pinned: false,
      },
      {
        caption: "strapi",
        lightImage: "/img/users/strapi.svg",
        darkImage: "/img/users/strapi-dark.svg",
        infoLink: "https://strapi.io/",
        pinned: true,
      },
      {
        caption: "octopol",
        image: "/img/users/octopol.jpeg",
        infoLink: "https://octopol.io/",
        pinned: false,
      },
      {
        caption: "Pollen",
        image: "/img/users/pollen.png",
        infoLink: "https://team.pollen.co/",
        pinned: false,
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
          sidebarPath: require.resolve('./sidebars.json'),
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
        { to: "docs/installation", label: "Docs", position: "right" },
        {
          href: "https://rustdoc.swc.rs/swc/",
          label: "Rustdocs",
          position: "right",
        },
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
