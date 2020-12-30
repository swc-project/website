import React from "react";
import styles from "./styles.module.css";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <a
      {...props}
      className={`button button--outline button--primary ${styles.uppercase}`}
    >
      {props.children}
    </a>
  );
}
