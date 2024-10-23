"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { ApiClientProvider } from "./api-client-provider";

export function ClientProviders({ children }: PropsWithChildren) {
    return (
        <ThemeProvider attribute="class">
            <ApiClientProvider>{children}</ApiClientProvider>
        </ThemeProvider>
    );
}
