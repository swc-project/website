import { NextResponse } from "next/server";
import { locales } from "nextra/locales";

export const middleware = (req) => {
  const { nextUrl } = req;

  // Playground component breaks when browsing to it.
  // Since it's not a language dynamic page, we ignore
  // the locales middleware and run with Next default one.
  if (nextUrl.pathname === "/playground") return NextResponse.next();

  return locales(req);
};
