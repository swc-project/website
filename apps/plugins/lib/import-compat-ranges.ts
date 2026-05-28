import { db } from "@/lib/prisma";
import { z } from "zod";

const WASM_PLUGIN_COMPAT_RANGES_URL =
  "https://raw.githubusercontent.com/swc-project/swc/main/data/wasm-plugin-compat-ranges.json";

const RuntimeNames = ["@swc/core", "next", "rspack", "farm"] as const;

const WasmPluginCompatRangeSchema = z.object({
  min: z.string(),
  max: z.string(),
});

const WasmPluginCompatRangesSchema = z.array(WasmPluginCompatRangeSchema);

async function fetchWasmPluginCompatRanges() {
  const response = await fetch(WASM_PLUGIN_COMPAT_RANGES_URL, {
    cache: "no-store",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch wasm plugin compatibility ranges: ${response.status} ${response.statusText}`
    );
  }

  return WasmPluginCompatRangesSchema.parse(await response.json());
}

export async function importWasmPluginCompatRanges() {
  const ranges = await fetchWasmPluginCompatRanges();

  await db.$transaction([
    ...ranges.map(({ min, max }) =>
      db.compatRange.upsert({
        where: {
          from: min,
        },
        update: {
          to: max,
        },
        create: {
          from: min,
          to: max,
        },
      })
    ),
    ...RuntimeNames.map((runtime) =>
      db.swcRuntime.upsert({
        where: {
          name: runtime,
        },
        update: {},
        create: {
          name: runtime,
        },
      })
    ),
  ]);

  return {
    ranges: ranges.length,
  };
}
