import { UpdateRuntimesInputSchema } from "@/lib/api/updater/router";
import { createCaller } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = UpdateRuntimesInputSchema.parse(await req.json());

    const api = await createCaller();

    await api.updater.updateRuntimes(body);

    return NextResponse.json({ ok: true });
};
