/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <img
          src={siteConfig.twitterImage}
          width="200"
        />
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
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
            <Button href={docUrl("installation")} style={{ display: "block" }}>
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

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            title: "Transcompile",
            content:
              "swc is a typescript / javascript compiler. It consumes a javascript or typescript file which uses recently added features like async-await and emits javascript code which can be executed on old browsers."
          },
          {
            title: "Super fast",
            content: "It's 20x faster than babel on single thread, and 70x faster on 4 core benchmark"
          }
        ]}
      </Block>
    );

    const Showcase = () => {
      // const showcase = siteConfig.sponsors.map(sponsor => (
      //   <a href={sponsor.infoLink} key={sponsor.infoLink}>
      //     <img
      //       src={sponsor.image}
      //       alt={sponsor.caption}
      //       title={sponsor.caption}
      //     />
      //   </a>
      // ));

      // const pageUrl = page => baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <div>
            <h2 id="gold-sponsers" align="center">
              Gold Sponsors
            </h2>
            <a href="https://opencollective.com/swc">
              <img src="https://opencollective.com/swc/tiers/gold-sponsers.svg?avatarHeight=64" />
            </a>

            <h2 id="silver-sponsers" align="center">
              Silver Sponsors
            </h2>
            <a href="https://opencollective.com/swc">
              <img src="https://opencollective.com/swc/tiers/silver-sponsers.svg?avatarHeight=64" />
            </a>

            <h2 id="bronze-sponsers" align="center">
              Bronze Sponsors
            </h2>
            <a href="https://opencollective.com/swc">
              <img src="https://opencollective.com/swc/tiers/bronze-sponsers.svg?avatarHeight=64" />
            </a>

            <h2 id="backers" align="center">
              Backers
            </h2>
            <a href="https://opencollective.com/swc">
              <img src="https://opencollective.com/swc/tiers/backer.svg?avatarHeight=64" />
            </a>
          </div>
          <div className="more-users">
            <a className="button" href="https://opencollective.com/swc">
              Donate
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
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
