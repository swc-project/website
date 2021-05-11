import React from "react";
import { CommonProps } from "../../pages";
import { User } from "../../pages/users";
import { Features } from "../Features";
import { HomeSplash } from "../HomeSplash";
import { LinkButton } from "../LinkButton";
import { Sponsors } from "../Sponsors";
import { UserComponent } from "../UserComponent";
import styles from "../../pages/common.module.css";

export class IndexPage extends React.Component<CommonProps> {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Showcases = () => {
      if (((siteConfig.customFields?.users as User[]) || []).length === 0) {
        return null;
      }

      const showcase = (siteConfig.customFields.users as User[])
        .filter((user) => user.pinned)
        .map((user) => <UserComponent key={user.infoLink} {...user} />);

      const pageUrl = (page) =>
        baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className={styles.flexColumnCenter}>
          <h2 className="padding-vert--lg">Who is Using This?</h2>
          <div className={styles.flexRowCenter}>{showcase}</div>
          <div className={`padding-vert--lg ${styles.flexRowCenter}`}>
            <LinkButton href="/users">More {siteConfig.title} Users</LinkButton>
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
          <iframe
            src="https://opencollective.com/embed/swc/donate"
            style={{
              width: "100%",
              minHeight: "100vh",
            }}
          ></iframe>

          <Sponsors />
        </div>
      </div>
    );
  }
}
