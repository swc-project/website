import type { ReactNode } from "react";

export default function TypeDeclarations({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <details>
      <summary>Type Declarations</summary>
      {children}
    </details>
  );
}
