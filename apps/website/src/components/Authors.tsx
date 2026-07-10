import type { ReactNode } from "react";

export default function Authors({
  date,
  children,
}: {
  date: string;
  children: ReactNode;
}) {
  return (
    <div className="swc-authors">
      {date} by {children}
    </div>
  );
}

export function Author({ name, link }: { name: string; link: string }) {
  return (
    <span className="swc-author">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </span>
  );
}
