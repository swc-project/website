"use client";

import { apiClient } from "@/lib/trpc/web-client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Select } from "./select";

export const RuntimeVersionSelector: FC = () => {
    const [runtimes] = apiClient.runtime.list.useSuspenseQuery();
    const [selectedRuntime, setSelectedRuntime] = useState<bigint>();
    const [selectedVersion, setSelectedVersion] = useState<string>();
    const router = useRouter();
    const versions = apiClient.runtime.listVersions.useQuery({
        runtimeId: selectedRuntime ?? BigInt(0),
    });

    const handleRuntimeChange = (runtimeId: string) => {
        setSelectedRuntime(BigInt(runtimeId));
    };

    const handleVersionChange = (version: string) => {
        const selected = versions.data?.find((v) => v.version === version);
        setSelectedVersion(version);
        router.push(`/versions/range/${selected?.compatRangeId}`);
    };

    return (
        <div className="flex w-full items-center gap-2">
            <Select
                value={selectedRuntime?.toString()}
                data={runtimes.map((runtime) => ({
                    value: runtime.id.toString(),
                    label: runtime.name,
                }))}
                onChange={handleRuntimeChange}
                type="runtime"
            />
            <Select
                value={selectedVersion}
                onChange={handleVersionChange}
                disabled={!selectedRuntime}
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
