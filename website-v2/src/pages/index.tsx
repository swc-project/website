/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Layout from "@theme/Layout";
import Features from "../components/Features";
import Sponsors from "../components/Sponsors";
import { DocusaurusConfig } from "@docusaurus/types";

interface SWCSiteConfig extends DocusaurusConfig {
  docsUrl?: string;
  twitterImage: string;
  users: User[];
}
interface User {
  caption: string;
  image: string;
  infoLink: string;
  pinned: boolean;
}

interface DocusaurusProps {
  siteConfig: SWCSiteConfig;
  language: string;
}

class HomeSplash extends React.Component<DocusaurusProps> {
  render() {
    const { siteConfig } = this.props;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = (props: { siteConfig: SWCSiteConfig }) => (
      <h2 className="projectTitle">
        <img src={siteConfig.twitterImage} width="200" />
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/* <Logo img_src='https://raw.githubusercontent.com/swc-project/logo/master/swc.png' /> */}
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="/docs" style={{ display: "block" }}>
              Getting started
            </Button>
          </PromoSection>
          <PromoSection>
            <a
              className="github-button"
              href="https://github.com/swc-project/swc"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star swc-project/swc on GitHub"
            >
              Star
            </a>

            <a
              className="github-button"
              href="https://github.com/swc-project/swc/fork"
              data-icon="octicon-repo-forked"
              data-size="large"
              data-show-count="true"
              aria-label="Fork swc-project/swc on GitHub"
            >
              Fork
            </a>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

interface IndexProps {
  config: SWCSiteConfig;
  language: string;
}

class Index extends React.Component<IndexProps> {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Showcases = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter((user) => user.pinned)
        .map((user) => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = (page) =>
        baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl("users.html")}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <Showcases />
          <Sponsors />
        </div>
      </div>
    );
  }
}

export default (props) => (
  <Layout>
    <Index {...props} />
  </Layout>
);
