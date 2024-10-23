"use client";

import { ApiOutput } from "@/lib/api/router";
import { apiClient } from "@/lib/trpc/web-client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type User = ApiOutput["users"]["me"] | null;
// TODO
// type TeamMembership = NonNullable<ApiOutput["teams"]["myTeams"][number]>;
type TeamMembership = any;

type UserContext = {
    user: User;
    reloadUser: () => Promise<void>;
    logout: () => Promise<void>;
    loaded: boolean;
    teamId: string | null;
    teamSlug: string | "_";
    teamMembership: TeamMembership | null;
};

const authBroadcastChannel = new BroadcastChannel("auth");
type AuthEvent = {
    type: "loaded" | "logout";
    user: User | null;
};

export const userContext = createContext<UserContext>({
    user: null,
    reloadUser: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    loaded: false,
    teamSlug: "_",
    teamId: null,
    teamMembership: null,
});

export function UserContextProvider({
    children,
    initialUser,
    teamMembership,
    teamSlug,
}: PropsWithChildren<{
    initialUser: User;
    teamMembership?: TeamMembership;
    teamSlug?: string;
}>) {
    const router = useRouter();
    const [loaded, setLoaded] = useState(!!initialUser);
    const [user, setUser] = useState<User>(initialUser);
    const userQuery = apiClient.users.me.useQuery(undefined, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !initialUser,
    });

    const reloadUser = async () => {
        await userQuery.refetch();
    };

    const logout = async () => {
        router.replace("/api/auth/signout");
    };

    useEffect(() => {
        if (userQuery.data) setUser(userQuery.data);
    }, [userQuery.data]);

    useEffect(() => {
        if (userQuery.isSuccess) setLoaded(true);
    }, [userQuery.isSuccess]);

    useEffect(() => {
        if (user && loaded)
            authBroadcastChannel.postMessage({
                type: "loaded",
                user: user,
            });
    }, [user, loaded]);

    useEffect(() => {
        const handleAuthEvent = async (event: MessageEvent<AuthEvent>) => {
            if (JSON.stringify(event.data.user) !== JSON.stringify(user)) {
                if (event.data.type === "logout") {
                    //eslint-disable-next-line
                    userQuery.refetch();
                    setUser(null);
                    router.replace("/");
                } else {
                    setUser(event.data.user);
                }
            }
        };

        authBroadcastChannel.addEventListener("message", handleAuthEvent);

        return () =>
            authBroadcastChannel.removeEventListener(
                "message",
                handleAuthEvent
            );
    }, [router, user, userQuery]);

    return (
        <userContext.Provider
            value={{
                user,
                reloadUser,
                logout,
                loaded,
                teamId: teamMembership?.team.id ?? null,
                teamSlug: teamSlug ?? "_",
                teamMembership: teamMembership ?? null,
            }}
        >
            {children}
        </userContext.Provider>
    );
}
