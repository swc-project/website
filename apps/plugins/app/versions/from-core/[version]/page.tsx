import { createCaller } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page({
  params: { version },
}: {
  params: { version: string };
}) {
  const api = await createCaller();
  const compatRange = await api.compatRange.byCoreVersion({
    version,
  });

  if (compatRange) {
    return redirect(`/versions/range/${compatRange.id}`);
  }

  return <div>No compat range found for swc_core@{version}</div>;
}
