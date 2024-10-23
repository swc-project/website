import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

type TableContainerProperties = {
    readonly title: string;
    readonly children: ReactNode;
    readonly className?: string;
};

export const TableContainer: FC<TableContainerProperties> = ({
    title,
    children,
    className,
}) => (
    <div className="bg-secondary flex flex-col rounded-2xl p-1">
        <p className="text-foreground m-0 block shrink-0 px-4 py-2 text-sm font-medium">
            {title}
        </p>
        <div
            className={cn(
                "relative flex-1 overflow-hidden rounded-xl border shadow-sm",
                "bg-background",
                className
            )}
        >
            {children}
        </div>
    </div>
);
