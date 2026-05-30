import { importWasmPluginCompatRanges } from "@/lib/import-compat-ranges";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const secret = process.env.CRON_SECRET;

  return !!secret && req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { ranges } = await importWasmPluginCompatRanges();

  return NextResponse.json({
    ok: true,
    ranges,
  });
}
