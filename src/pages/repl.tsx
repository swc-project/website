import React from "react";

import styles from "../pages/common.module.css";
import Layout from "@theme/Layout";
import { Repl } from "../components/Repl";

export default (props) => (
  <Layout>
    <div className={`padding-vert--lg ${styles.flexColumnCenter}`}>
      <p>
        Because swc can be easily compiled into wasm, it can also run on the
        web. You can try it out here.
      </p>
    </div>

    <Repl />
  </Layout>
);
