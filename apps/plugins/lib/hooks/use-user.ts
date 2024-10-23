"use client";

import { userContext } from "@/lib/auth/user-context";
import { useContext } from "react";

export function useUser() {
    const context = useContext(userContext);
    return context;
}
