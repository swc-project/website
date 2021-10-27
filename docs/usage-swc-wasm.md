---
id: usage-swc-wasm
title: Using @swc/wasm or @swc/wasm-web
sidebar_label: "@swc/wasm"
---

## `@swc/wasm-web`

You have to initialize the module before you use it.

### Example react component

```tsx
import { useEffect, useState } from "react";
import initSwc, { transformSync } from "@swc/wasm-web";

export default function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      setInitialized(true);
    }
    importAndRunSwcOnMount();
  }, []);

  function compile() {
    if (!initialized) {
      return;
    }
    const result = transformSync(`console.log('hello')`, {});
    console.log(result);
  }

  return (
    <div className="App">
      <button onClick={compile}>Compile</button>
    </div>
  );
}
```
