/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  // {
  //   caption: 'kdy1',
  //   // You will need to prepend the image path with your baseUrl
  //   // if it is not '/', like: '/test-site/img/docusaurus.svg'.
  //   image: '/img/docusaurus.svg',
  //   infoLink: 'https://www.facebook.com',
  //   pinned: true,
  // },
  {
    caption: 'ByteDance',
    image: '/img/users/byte-dance.png',
    infoLink: 'https://www.bytedance.com',
    pinned: true,
  },
  {
    caption: 'Deno',
    image: '/img/users/deno.svg',
    infoLink: 'https://deno.land',
    pinned: true,
  },
  {
    caption: 'Fundamentei',
    image: '/img/users/fundamentei.png',
    infoLink: 'https://fundamentei.com/',
    pinned: true,
  },
  {
    caption: 'Framer',
    image: '/img/users/framer.svg',
    infoLink: 'https://framer.com/',
    pinned: true,
  },
  {
    caption: 'strapi',
    image: '/img/users/strapi.svg',
    infoLink: 'https://strapi.io/',
    pinned: true,
  },
  {
    caption: 'octopol',
    image: '/img/users/octopol.jpeg',
    infoLink: 'https://octopol.io/',
    pinned: true,
  }
];

const sponsors = [];

const siteConfig = {
  title: "swc", // Title for your website.
  tagline: "Super fast javascript / typescript compiler",
  url: "https://swc.rs", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "swc",
  organizationName: "swc-project",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "installation", label: "Docs" },
    { page: "help", label: "Help" },
    { blog: true, label: "Blog" },
    { href: "https://opencollective.com/swc", label: "Donate" },
    { href: "https://github.com/swc-project/swc", label: "GitHub" },
    { search: true }
  ],

  blogSidebarCount: "ALL",

  // If you have users set above, you add it here:
  users,
  sponsors,

  /* path to images for header/footer */
  // headerIcon: 'img/swc-without-extra.png',
  footerIcon:
    "https://raw.githubusercontent.com/swc-project/logo/master/swc.png",
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#2E8555",
    secondaryColor: "#205C3B"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} The swc project developers`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/swc.png",
  twitterImage: "img/swc.png",

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: "https://github.com/swc-project/swc",

  gaTrackingId: "UA-81467907-3",
  facebookAppId: "3577925395580880",
  facebookComments: true,

  algolia: {
    apiKey: "5b6acdf7dc8baaa86317236bb5e2bb9e",
    indexName: "swc-project",
    algoliaOptions: {}
  }
};

module.exports = siteConfig;
