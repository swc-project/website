"use client";

import { apiClient } from "@/lib/trpc/web-client";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { useQueryState } from "next-usequerystate";
import { Select } from "./select";

type BuildRangeUrlParams = {
  compatRangeId?: string;
  runtime?: string;
  version?: string;
};

function buildRangeUrl({
  compatRangeId,
  runtime,
  version,
}: BuildRangeUrlParams) {
  const params = new URLSearchParams();

  if (runtime) {
    params.set("runtime", runtime);
  }

  if (version) {
    params.set("version", version);
  }

  const queryString = params.size > 0 ? `?${params.toString()}` : "";

  if (!compatRangeId) {
    return `/versions/range${queryString}`;
  }

  return `/versions/range/${compatRangeId}${queryString}`;
}

export const RuntimeVersionSelector: FC = () => {
  const [runtimes] = apiClient.runtime.list.useSuspenseQuery();
  const router = useRouter();
  const [runtimeQuery, setRuntimeQuery] = useQueryState("runtime");
  const [versionQuery, setVersionQuery] = useQueryState("version");

  const runtimeByName = useMemo(
    () =>
      new Map(runtimes.map((runtime) => [runtime.name.toLowerCase(), runtime])),
    [runtimes]
  );

  const activeRuntime = runtimeQuery
    ? runtimeByName.get(runtimeQuery.toLowerCase())
    : undefined;

  const versions = apiClient.runtime.listVersions.useQuery(
    {
      runtimeId: activeRuntime?.id ?? BigInt(0),
    },
    {
      enabled: Boolean(activeRuntime?.id),
    }
  );

  useEffect(() => {
    if (!runtimeQuery) {
      return;
    }

    if (!activeRuntime) {
      void setRuntimeQuery(null, { history: "replace" });
    }
  }, [activeRuntime, runtimeQuery, setRuntimeQuery]);

  useEffect(() => {
    if (!versionQuery || !versions.data) {
      return;
    }

    const isValid = versions.data.some(
      (version) => version.version === versionQuery
    );

    if (!isValid) {
      void setVersionQuery(null, { history: "replace" });
    }
  }, [setVersionQuery, versionQuery, versions.data]);

  useEffect(() => {
    if (activeRuntime || !versionQuery) {
      return;
    }

    void setVersionQuery(null, { history: "replace" });
  }, [activeRuntime, setVersionQuery, versionQuery]);

  const handleRuntimeChange = async (runtimeName: string) => {
    router.replace(
      buildRangeUrl({
        runtime: runtimeName,
        version: undefined,
      })
    );
    await setRuntimeQuery(runtimeName, { history: "replace" });
    await setVersionQuery(null, { history: "replace" });
  };

  const handleVersionChange = async (version: string) => {
    const selected = versions.data?.find((v) => v.version === version);

    await setVersionQuery(version, { history: "replace" });

    if (!selected) {
      return;
    }

    router.push(
      buildRangeUrl({
        compatRangeId: selected.compatRangeId.toString(),
        runtime: activeRuntime?.name ?? runtimeQuery ?? undefined,
        version,
      })
    );
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Select
        value={runtimeQuery ?? undefined}
        data={runtimes.map((runtime) => ({
          value: runtime.name,
          label: runtime.name,
        }))}
        onChange={handleRuntimeChange}
        type="runtime"
      />
      <Select
        value={versionQuery ?? undefined}
        onChange={handleVersionChange}
        disabled={!activeRuntime}
        data={
          versions.data?.map((version) => ({
            value: version.version,
            label: version.version,
          })) ?? []
        }
        type="version"
      />
    </div>
  );
};
