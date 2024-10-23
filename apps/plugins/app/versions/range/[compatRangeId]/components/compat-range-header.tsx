"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/trpc/web-client";
import { parseAsBoolean, useQueryState } from "next-usequerystate";
import { FC } from "react";

type CompatRangeHeaderProps = {
    compatRangeId: string;
};

export const CompatRangeHeader: FC<CompatRangeHeaderProps> = ({
    compatRangeId,
}) => {
    const [includePrerelease, setIncludePrerelease] = useQueryState(
        "includePrerelease",
        parseAsBoolean.withDefault(false)
    );
    const [compatRange] = apiClient.compatRange.get.useSuspenseQuery({
        id: BigInt(compatRangeId),
        includePrerelease,
    });

    const handleCheckedChange = (checked: boolean) => {
        setIncludePrerelease(checked);
    };

    return (
        <div className="flex flex-row justify-between">
            <h1 className="mr-10 flex flex-col font-mono text-2xl font-bold">
                <p>swc_core</p>
                <span className="text-sm">
                    @<span className="font-mono">{compatRange.from}</span> -{" "}
                    <span className="font-mono">{compatRange.to}</span>
                </span>
            </h1>

            <div className="flex flex-row items-center gap-2 text-sm font-medium">
                <Checkbox
                    checked={includePrerelease}
                    onCheckedChange={handleCheckedChange}
                />
                <label>Include Prerelease</label>
            </div>
        </div>
    );
};
