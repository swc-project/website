import { createCaller } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CoreVersionSchema = z.object({
    version: z.string(),
    pluginRunnerReq: z.string(),
});

const BodySchema = z.object({
    coreVersions: z.array(CoreVersionSchema),
    pluginRunnerVersions: z.array(z.string()),
});

export async function POST(req: NextRequest) {
    const api = await createCaller();
    const { coreVersions, pluginRunnerVersions } = BodySchema.parse(
        await req.json()
    );

    await api.compatRange.addCacheForCrates({
        coreVersions,
        pluginRunnerVersions,
    });

    return NextResponse.json({
        ok: true,
    });
}
