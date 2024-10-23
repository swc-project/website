"use client";

import { apiClient } from "@/lib/trpc/web-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import superjson from "superjson";

export function ApiClientProvider({ children }: PropsWithChildren<{}>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        queryKeyHashFn: (queryKey) =>
                            superjson.stringify(queryKey),
                    },
                },
            })
    );
    const [trpcClient] = useState(() =>
        apiClient.createClient({
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                    transformer: superjson,
                }),
            ],
        })
    );
    return (
        <apiClient.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </apiClient.Provider>
    );
}
