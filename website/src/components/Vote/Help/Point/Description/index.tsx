import React from "react";

interface Props {
  title: string;
}

export const PointDescription: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>

      <div>{children}</div>
    </div>
  );
};
