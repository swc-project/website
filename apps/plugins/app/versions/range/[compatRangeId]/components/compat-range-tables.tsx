"use client";

import { TableContainer } from "@/components/table-container";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { apiClient } from "@/lib/trpc/web-client";
import { parseAsBoolean, useQueryState } from "next-usequerystate";
import { FC } from "react";

type CompatRangeTablesProps = {
    compatRangeId: string;
};

export const CompatRangeTables: FC<CompatRangeTablesProps> = ({
    compatRangeId,
}) => {
    const [includePrerelease] = useQueryState(
        "includePrerelease",
        parseAsBoolean.withDefault(false)
    );
    const [compatRange] = apiClient.compatRange.get.useSuspenseQuery({
        id: BigInt(compatRangeId),
        includePrerelease,
    });

    return (
        <>
            <TableContainer title="Runtime Version Ranges">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Runtime</TableHead>
                            <TableHead className="w-[200px]">
                                Minimum Version
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Maximum Version
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {compatRange.runtimes.map((runtime) => (
                            <TableRow key={runtime.name}>
                                <TableCell className="font-medium">
                                    {runtime.name}
                                </TableCell>
                                <TableCell className="w-[200px]">
                                    {runtime.minVersion}
                                </TableCell>
                                <TableCell className="w-[200px]">
                                    {runtime.maxVersion}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer title="Compatible Plugins">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plugin</TableHead>
                            <TableHead className="w-[200px]">
                                Minimum Version
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Maximum Version
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {compatRange.plugins.map((plugin) => (
                            <TableRow key={plugin.name}>
                                <TableCell className="font-medium">
                                    {plugin.name}
                                </TableCell>
                                <TableCell className="w-[200px]">
                                    {plugin.minVersion}
                                </TableCell>
                                <TableCell className="w-[200px]">
                                    {plugin.maxVersion}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
