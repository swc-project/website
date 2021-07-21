import React from "react";

import Layout from "@theme/Layout";
import { Repl } from "../components/Repl";

export default (props) => (
  <Layout>
    <p>
      Because swc can be easily compiled into wasm, it can also run on the web.
      You can try it out here.
    </p>
    <Repl />
  </Layout>
);
