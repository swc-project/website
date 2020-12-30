import React from "react";
import { GithubButton } from "../components/GithubButton";
import { LinkButton } from "../components/LinkButton";
import { DocusaurusProps, SWCSiteConfig } from "./index";

export class HomeSplash extends React.Component<DocusaurusProps> {
  render() {
    const { siteConfig } = this.props;

    const SplashContainer = (props: { children: React.ReactNode }) => (
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
        <img src={siteConfig.customFields.twitterImage} width="200" />
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

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <LinkButton href="/docs">Getting started</LinkButton>
          </PromoSection>
          <PromoSection>
            <GithubButton
              title="Star"
              href="https://github.com/swc-project/swc"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star swc-project/swc on GitHub"
            />

            <GithubButton
              title="Fork"
              href="https://github.com/swc-project/swc/fork"
              data-icon="octicon-repo-forked"
              data-size="large"
              data-show-count="true"
              aria-label="Fork swc-project/swc on GitHub"
            />
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}
