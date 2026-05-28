import { importWasmPluginCompatRanges } from "@/lib/import-compat-ranges";

export default async function Page() {
  if (process.env.NODE_ENV === "production") {
    return <div>Not allowed</div>;
  }

  const { ranges } = await importWasmPluginCompatRanges();

  return <div>Imported {ranges} ranges</div>;
}

export const dynamic = "force-dynamic";
