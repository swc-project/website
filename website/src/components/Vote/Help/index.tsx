import React from "react";
import { PointStatusButton } from "../Auth/PointStatus";
import { PointDescription } from "./Point/Description";
import styles from "./styles.module.css";

export const VoteHelpMessage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Vote</h1>
        <PointStatusButton></PointStatusButton>
      </div>
      <div className={styles.textContainer}>
        The swc project uses a voting system to focus on what actual users need.
        You can login with your github account and vote for the feature you
        need. We have two kind of points.
      </div>

      <div style={{ marginTop: 24 }}></div>

      <div className={styles.textContainer}>
        <PointDescription title={`Normal point`}>
          You will receive one <i>normal point</i> per day starting from
          2021/01/01, based on your github account.
        </PointDescription>
        <PointDescription title={`Gold point`}>
          Gold point is equal to 100 <i>normal points</i> You can obtain by
          being a backer or sponsor on our{" "}
          <a href="https://opencollective.com/swc">open collective page</a>
        </PointDescription>
      </div>

      <hr></hr>

      <h2 className={styles.title}>Topics</h2>
      <p></p>
    </div>
  );
};
