import React from "react";
import { DocusaurusProps, SWCSiteConfig } from "../../pages";
import { GithubButton } from "../GithubButton";
import { LinkButton } from "../LinkButton";
import styles from "../../pages/common.module.css";

export class HomeSplash extends React.Component<DocusaurusProps> {
  render() {
    const { siteConfig } = this.props;

    const SplashContainer = (props: { children: React.ReactNode }) => (
      <div className={styles.flexRowCenter}>{props.children}</div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = (props: { siteConfig: SWCSiteConfig }) => (
      <h2 className={styles.flexColumnCenter}>
        <img
          src={siteConfig.customFields.twitterImage}
          width="200"
          className="padding-bottom--md"
        />
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className={`padding-vert--md ${styles.flexRowCenter}`}>
        {props.children}
      </div>
    );

    return (
      <SplashContainer>
        <div className={`inner padding-vert--lg`}>
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <LinkButton href="/docs/installation">Getting started</LinkButton>
          </PromoSection>
          <PromoSection>
            <div className="margin-right--sm">
              <GithubButton
                title="Star"
                href="https://github.com/swc-project/swc"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star swc-project/swc on GitHub"
              />
            </div>

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
