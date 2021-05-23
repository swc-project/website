import React from "react";
import { LinkButton } from "../LinkButton";
import styles from "../../pages/common.module.css";

export function Sponsors() {
  return (
    <div>
      <div className={styles.flexColumnCenter}>
        <h2>Gold Sponsors</h2>
        <a href="https://opencollective.com/swc">
          <object
            type="image/svg+xml"
            data="https://opencollective.com/swc/tiers/gold-sponsors.svg?avatarHeight=36&width=600"
          ></object>
        </a>

        <h2>Silver Sponsors</h2>
        <a href="https://opencollective.com/swc">
          <object
            type="image/svg+xml"
            data="https://opencollective.com/swc/tiers/silver-sponsors.svg?avatarHeight=36&width=600"
          ></object>
        </a>

        <h2>Bronze Sponsors</h2>
        <a href="https://opencollective.com/swc">
          <object
            type="image/svg+xml"
            data="https://opencollective.com/swc/tiers/bronze-sponsors.svg?avatarHeight=36&width=600"
          ></object>
        </a>

        <h2>Backers</h2>
        <a href="https://opencollective.com/swc">
          <object
            type="image/svg+xml"
            data="https://opencollective.com/swc/tiers/backer.svg?avatarHeight=36&width=600"
          ></object>
        </a>
      </div>
      <div className={`padding-vert--lg ${styles.flexRowCenter}`}>
        <LinkButton href="https://opencollective.com/swc">Donate</LinkButton>
      </div>
    </div>
  );
}
