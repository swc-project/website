import { BrowserOnly } from "@rspress/core/runtime";
import { lazy, Suspense } from "react";

const Benchmark = lazy(() => import("./benchmark"));

export default function DynamicBenchmark() {
  return (
    <BrowserOnly fallback={<span>Loading...</span>}>
      {() => (
        <Suspense fallback={<span>Loading...</span>}>
          <Benchmark />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
