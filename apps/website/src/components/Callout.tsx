import type { ReactNode } from "react";

const DEFAULT_EMOJI: Record<string, string> = {
  default: "💡",
  warning: "⚠️",
};

/**
 * Drop-in replacement for Nextra's `<Callout>` component so migrated MDX
 * keeps its original authoring shape (`type` and `emoji` props).
 * Styled in src/styles/index.css (.swc-callout).
 */
export default function Callout({
  type = "default",
  emoji,
  children,
}: {
  type?: "default" | "warning";
  emoji?: string;
  children: ReactNode;
}) {
  const variant = type in DEFAULT_EMOJI ? type : "default";
  return (
    <div className={`swc-callout swc-callout--${variant}`}>
      <span className="swc-callout__emoji" aria-hidden>
        {emoji ?? DEFAULT_EMOJI[variant]}
      </span>
      <div className="swc-callout__content">{children}</div>
    </div>
  );
}
