import { UpdateWasmPluginsInputSchema } from "@/lib/api/updater/router";
import { createCaller } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = UpdateWasmPluginsInputSchema.parse(await req.json());

    const api = await createCaller();

    await api.updater.updateWasmPlugins(body);

    return NextResponse.json({ ok: true });
};
