import { publicProcedure, router } from "@/lib/base";
import { db } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import semver from "semver";
import { z } from "zod";
import { matchRange } from "../compatRange/router";

function validateToken(token: string) {
  if (token === process.env.CRAWL_SECRET) {
    return;
  }

  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Invalid token",
  });
}

const PackageVersionSchema = z.object({
  version: z.string(),
  swcCoreVersion: z.string(),
});

const PackageSchema = z.object({
  name: z.string(),
  versions: z.array(PackageVersionSchema),
});

export const UpdateWasmPluginsInputSchema = z.object({
  token: z.string(),
  pkgs: z.array(PackageSchema),
});

export const UpdateRuntimesInputSchema = z.object({
  token: z.string(),
  pkgs: z.array(PackageSchema),
});

export const updaterRouter = router({
  updateWasmPlugins: publicProcedure
    .input(UpdateWasmPluginsInputSchema)
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      validateToken(input.token);

      const api = await (await import("@/lib/api/server")).createCaller(ctx);

      for (const pkg of input.pkgs) {
        try {
          const plugin = await db.swcPlugin.upsert({
            where: {
              name: pkg.name,
            },
            create: {
              name: pkg.name,
            },
            update: {},
          });

          for (const version of pkg.versions) {
            const swcCoreVersion = version.swcCoreVersion;
            const compatRange = await api.compatRange.byCoreVersion({
              version: swcCoreVersion,
            });

            if (!compatRange) {
              console.error(
                `Compat range not found for SWC core version ${swcCoreVersion}`
              );
              continue;
            }

            await db.swcPluginVersion.upsert({
              where: {
                pluginId_version: {
                  pluginId: plugin.id,
                  version: version.version,
                },
              },
              create: {
                pluginId: plugin.id,
                version: version.version,
                compatRangeId: compatRange.id,
                swcCoreVersion,
              },
              update: {
                compatRangeId: compatRange.id,
                swcCoreVersion,
              },
            });
          }
        } catch (e) {
          console.error(`Error updating wasm plugins for ${pkg.name}`, e);
        }
      }
    }),

  updateRuntimes: publicProcedure
    .input(UpdateRuntimesInputSchema)
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      validateToken(input.token);

      const compatRanges = await db.compatRange.findMany({
        select: {
          id: true,
          from: true,
          to: true,
        },
      });

      // Runtimes has so many versions so we need a faster logic.
      function byVersion(swcCoreVersion: string) {
        for (const range of compatRanges) {
          if (matchRange(range, swcCoreVersion)) {
            return range;
          }
        }
      }

      for (const pkg of input.pkgs) {
        try {
          const runtime = await db.swcRuntime.upsert({
            where: {
              name: pkg.name,
            },
            create: {
              name: pkg.name,
            },
            update: {},
          });

          for (const version of pkg.versions) {
            const swcCoreVersion = version.swcCoreVersion;
            const compatRange = byVersion(swcCoreVersion);

            if (!compatRange) {
              console.error(
                `Compat range not found for SWC core version ${swcCoreVersion}`
              );
              continue;
            }

            await db.swcRuntimeVersion.upsert({
              where: {
                runtimeId_version: {
                  runtimeId: runtime.id,
                  version: version.version,
                },
              },
              create: {
                runtimeId: runtime.id,
                version: version.version,
                compatRangeId: compatRange.id,
                swcCoreVersion,
              },
              update: {
                compatRangeId: compatRange.id,
                swcCoreVersion,
              },
            });
          }
        } catch (e) {
          console.error(`Error updating runtimes for ${pkg.name}`, e);
        }
      }
    }),
});
