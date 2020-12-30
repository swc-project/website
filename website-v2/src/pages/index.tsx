/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Layout from "@theme/Layout";
import { DocusaurusConfig } from "@docusaurus/types";
import { IndexPage } from "./IndexPage";
import { User } from "./users";

export interface SWCSiteConfig extends DocusaurusConfig {
  docsUrl?: string;
  customFields: {
    twitterImage: string;
    users: User[];
  };
}
export interface DocusaurusProps {
  siteConfig: SWCSiteConfig;
  language: string;
}

export interface CommonProps {
  config: SWCSiteConfig;
  language: string;
}

export default (props: CommonProps) => (
  <Layout>
    <IndexPage {...props} />
  </Layout>
);
