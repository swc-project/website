import { NextResponse } from "next/server";
import { locales } from "nextra/locales";

export const middleware = (req) => {
  const { nextUrl } = req;

  if (nextUrl.pathname === "/playground") return NextResponse.next();

  return locales(req);
};
