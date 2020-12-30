import React from "react";
import { CommonProps } from "./index";
import { HomeSplash } from "./HomeSplash";
import { User } from "./users";
import { Sponsors } from "../components/Sponsors";
import { Features } from "../components/Features";

export class IndexPage extends React.Component<CommonProps> {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Showcases = () => {
      console.log(siteConfig);

      if (((siteConfig.customFields?.users as User[]) || []).length === 0) {
        return null;
      }

      const showcase = (siteConfig.customFields.users as User[])
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
            <a className="button" href="/users">
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
