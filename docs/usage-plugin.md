---
id: usage-plugin
title: Using custom plugins with swc
sidebar_label: Plugin
---

> Warning: Plugin apis are going to be deprecated in v2.
> With v2, swc will provide a rust-based plugin api instead.

## Helpers

There are some helpers to help writing a transform.

### Visitor

See: https://github.com/swc-project/plugin-strip-console

```ts
import { CallExpression, Expression } from "@swc/core";
import Visitor from "@swc/core/Visitor";

class ConsoleStripper extends Visitor {
  visitCallExpression(e: CallExpression): Expression {
    if (e.callee.type !== "MemberExpression") {
      return e;
    }

    if (
      e.callee.object.type === "Identifier" &&
      e.callee.object.value === "console"
    ) {
      if (e.callee.property.type === "Identifier") {
        return {
          type: "UnaryExpression",
          span: e.span,
          operator: "void",
          argument: {
            type: "NumericLiteral",
            span: e.span,
            value: 0,
          },
        };
      }
    }

    return e;
  }
}

const out = transformSync(
  `
if (foo) {
    console.log("Foo")
} else {
    console.log("Bar")
}`,
  {
    plugin: (m) => new ConsoleStripper().visitProgram(m),
  }
);

out.code ===
  `if (foo) {
    void 0;
} else {
    void 0;
}`;
```

You can turn on optimizer with [`jsc.transform.optimizer`](/docs/configuring-swc#jsctransformoptimizer) to remove `void 0`.

### Using multiple plugins

```ts
import { transformSync, plugins } from "@swc/core";

const out = transformSync(src, {
  plugin: plugins(pluginA, pluginB),
});
```
