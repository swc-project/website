import { Dynamic } from "@/components/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { fontBody, fontHeading } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { FC, PropsWithChildren } from "react";
import { ClientProviders } from "./client-providers";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body
            className={cn(
                "antialiased",
                fontHeading.variable,
                fontBody.variable
            )}
        >
            <NextTopLoader color={"var(--colors-primary)"} />
            <SessionProvider>
                <ClientProviders>
                    <Dynamic>{children}</Dynamic>
                </ClientProviders>
            </SessionProvider>
            <Toaster />
        </body>
    </html>
);

export default RootLayout;
