import { createCaller } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page(
  props: {
    params: Promise<{ version: string }>;
  }
) {
  const params = await props.params;

  const {
    version
  } = params;

  const api = await createCaller();
  const compatRange = await api.compatRange.byPluginRunnerVersion({
    version,
  });

  if (compatRange) {
    return redirect(`/versions/range/${compatRange.id}`);
  }

  return <div>No compat range found for swc_plugin_runner@{version}</div>;
}
