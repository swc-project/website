import { z } from "zod";

export const VersionRangeSchema = z.object({
    name: z.string(),
    minVersion: z.string(),
    maxVersion: z.string(),
});
export type VersionRange = z.infer<typeof VersionRangeSchema>;
