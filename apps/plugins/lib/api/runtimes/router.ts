import { publicProcedure, router } from "@/lib/base";
import { db } from "@/lib/prisma";
import { compare } from "semver";
import { z } from "zod";

export const runtimeRouter = router({
  list: publicProcedure
    .input(z.void())
    .output(
      z.array(
        z.object({
          id: z.bigint(),
          name: z.string(),
        })
      )
    )
    .query(async () => {
      const runtimes = await db.swcRuntime.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return runtimes;
    }),

  listVersions: publicProcedure
    .input(
      z.object({
        runtimeId: z.bigint(),
      })
    )
    .output(
      z.array(
        z.object({
          version: z.string(),
          compatRangeId: z.bigint(),
        })
      )
    )
    .query(async ({ input: { runtimeId } }) => {
      const versions = await db.swcRuntimeVersion.findMany({
        where: {
          runtimeId,
        },
        select: {
          version: true,
          compatRangeId: true,
        },
        orderBy: {
          version: "desc",
        },
      });
      versions.sort((a, b) => {
        return compare(a.version, b.version);
      });

      return versions;
    }),
});
