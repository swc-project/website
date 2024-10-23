import { FC } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import SWCLogo from "./swc.svg";

export const Logo: FC<{ className?: string }> = ({ className }) => (
    <Image
        src={SWCLogo}
        alt="SWC Logo"
        width={80}
        height={28}
        className={cn("h-7 w-auto", className)}
    />
);
