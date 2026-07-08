import React from "react";
import {
  Callout as RspressCallout,
  Tab as RspressTab,
  Tabs as RspressTabs,
} from "@rspress/core/theme";

const calloutTypes = new Set([
  "tip",
  "note",
  "important",
  "warning",
  "caution",
  "danger",
  "info",
  "details",
]);

export function Callout({ children, emoji, type = "info", ...props }) {
  const normalizedType = calloutTypes.has(type) ? type : "info";

  return (
    <RspressCallout type={normalizedType} {...props}>
      {emoji ? <span className="mr-2 inline-block">{emoji}</span> : null}
      {children}
    </RspressCallout>
  );
}

export function Tab(props) {
  return <RspressTab {...props} />;
}

export function Tabs({ children, items, ...props }) {
  const tabValues = Array.isArray(items)
    ? items.map((item) => ({
        label: item,
        value: String(item),
      }))
    : undefined;

  const tabChildren = Array.isArray(items)
    ? React.Children.toArray(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          value: String(items[index]),
        });
      })
    : children;

  return (
    <RspressTabs values={tabValues} {...props}>
      {tabChildren}
    </RspressTabs>
  );
}

Tabs.Tab = Tab;
