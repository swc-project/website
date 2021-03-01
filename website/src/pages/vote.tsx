import React from "react";
import Layout from "@theme/Layout";
import { VoteHelpMessage } from "../components/Vote/Help";

const VoteApp: React.FC = () => {
  return (
    <Layout>
      <div>
        <VoteHelpMessage></VoteHelpMessage>
      </div>
      <div></div>
    </Layout>
  );
};

export default VoteApp;
