import React from "react";
import styles from "./styles.module.css";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

export function UserComponent(props) {
  return (
    <a href={props.infoLink} className={styles.logo}>
      <ThemedImage
        alt={props.caption}
        title={props.caption}
        className={styles.image}
        sources={{
          light: useBaseUrl(
            props.lightImage === undefined ? props.image : props.lightImage
          ),
          dark: useBaseUrl(
            props.darkImage === undefined ? props.image : props.darkImage
          )
        }}
      />
    </a>
  );
}
