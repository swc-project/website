import React from "react";
import { LinkButton } from "../LinkButton";

export function Sponsors() {
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
        <LinkButton href="https://opencollective.com/swc">Donate</LinkButton>
      </div>
    </div>
  );
}
