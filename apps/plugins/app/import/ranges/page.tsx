import { db } from "@/lib/prisma";
import fs from "node:fs/promises";

export default async function Page() {
  if (process.env.NODE_ENV === "production") {
    return <div>Not allowed</div>;
  }

  const ranges: { min: string; max: string }[] = JSON.parse(
    await fs.readFile("./data/ranges.json", "utf8")
  );

  for (const { min, max } of ranges) {
    await db.compatRange.upsert({
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
    });
  }

  const runtimes = ["@swc/core", "next", "rspack", "farm"];

  for (const runtime of runtimes) {
    await db.swcRuntime.upsert({
      where: {
        name: runtime,
      },
      update: {},
      create: {
        name: runtime,
      },
    });
  }

  return <div>Done</div>;
}

export const dynamic = "force-dynamic";
