"use client";

import { ApiRouter } from "@/lib/api/router";
import { createTRPCReact } from "@trpc/react-query";

export const apiClient = createTRPCReact<ApiRouter>({});
