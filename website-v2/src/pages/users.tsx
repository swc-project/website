/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import Layout from "@theme/Layout";
import { CommonProps } from ".";
import styles from "../pages/common.module.css";
import { UserComponent } from "../components/UserComponent";
import { LinkButton } from "../components/LinkButton";

export interface User {
  caption: string;
  image: string;
  infoLink: string;
  pinned: boolean;
}

class Users extends React.Component<CommonProps> {
  render() {
    const { config: siteConfig } = this.props;
    if (((siteConfig.customFields.users as User[]) || []).length === 0) {
      return null;
    }

    const editUrl = `https://github.com/swc-project/website/edit/master/website/siteConfig.js`;

    const showcase = (siteConfig.customFields.users as User[]).map((user) => (
      <UserComponent key={user.infoLink} {...user} />
    ));

    return (
      <div className={`padding-vert--lg ${styles.flexColumnCenter}`}>
        <div className={styles.flexColumnCenter}>
          <h1>Who is Using This?</h1>
          <p>This project is used by many folks</p>
        </div>
        <div className="padding-vert--lg">{showcase}</div>
        <p>Are you using this project?</p>
        <LinkButton href={editUrl}>Add your company</LinkButton>
      </div>
    );
  }
}

export default (props) => (
  <Layout>
    <Users {...props} />
  </Layout>
);
