import React from "react";
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
