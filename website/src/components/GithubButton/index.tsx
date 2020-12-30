import React, { useEffect, useRef } from "react";
import { render as renderGH } from "github-buttons";

interface GHButtonProps {
  title: string;
  href: string;
}

export function GithubButton(props: GHButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    renderGH(ref.current, function (element: HTMLElement) {
      if (!ref.current) {
        return;
      }
      ref.current.parentNode.replaceChild(element, ref.current);
    });
  }, []);

  return (
    <a {...props} ref={ref}>
      {props.title}
    </a>
  );
}
