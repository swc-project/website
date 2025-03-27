import { getCurrentUser } from "@/lib/api/auth";
import { apiRouter } from "@/lib/api/router";
import {
    Abilities,
    Context,
    User,
    UserRoleSchema,
    createCallerFactory,
} from "@/lib/base";
import { TeamMemberRoleSchema, TeamMemberRoleType, db } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import {
    FetchCreateContextFnOptions,
    fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { memoize } from "lodash-es";
import { headers } from "next/headers";

export const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        router: apiRouter,
        req,
        createContext,
    });

async function createContext(
    params?: FetchCreateContextFnOptions | { isAdmin: boolean }
): Promise<Context> {
    if (!params) {
        console.warn("No params provided to createContext");
        return {
            async getAccessToken() {
                return undefined;
            },
            user: null,
            abilities: defineAbilitiesFor({ user: null }),
            responseHeaders: null,
            isAdmin: false,
        };
    }

    if ("isAdmin" in params) {
        return {
            async getAccessToken() {
                return undefined;
            },
            user: null,
            abilities: defineAbilitiesFor({ user: null }),
            responseHeaders: null,
            isAdmin: !!("isAdmin" in params && params.isAdmin),
        };
    }

    const user: User | null = await getCurrentUser();

    const abilities = defineAbilitiesFor({
        user,
    });

    return {
        async getAccessToken() {
            const h = await headers();
            const auth = h.get("authorization");
            return auth ? auth.replace("Bearer ", "") : undefined;
        },
        user,
        abilities,
        responseHeaders: null,
        isAdmin: false,
    };
}

export function defineAbilitiesFor({ user }: { user: User | null }): Abilities {
    const isAdmin = user?.role === UserRoleSchema.Values.ADMIN;

    // == here is intentional
    const getTeamRole = memoize(
        async (teamId: string): Promise<TeamMemberRoleType | null> => {
            if (!user) {
                return null;
            }

            const membership = await db.teamMembership.findUnique({
                where: {
                    userPerTeam: {
                        teamId: teamId,
                        userId: user.id,
                    },
                },
                select: {
                    role: true,
                },
            });

            return membership?.role ?? null;
        }
    );

    const isTeamOwner = async (teamId: string) =>
        isAdmin ||
        (await getTeamRole(teamId)) === TeamMemberRoleSchema.Values.OWNER;

    const isTeamMember = async (teamId: string) =>
        (await isTeamOwner(teamId)) ||
        (await getTeamRole(teamId)) === TeamMemberRoleSchema.Values.MEMBER;

    const requireTeamMember = async (teamId: string) => {
        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Authentication required",
            });
        }

        if (await isTeamMember(teamId)) {
            return;
        }

        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found",
        });
    };

    const requireTeamOwner = async (teamId: string) => {
        if (!user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Authentication required",
            });
        }

        if (await isTeamOwner(teamId)) {
            return;
        }
        if (await isTeamMember(teamId)) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Permission denied",
            });
        }

        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found",
        });
    };

    return {
        isAdmin,
        isTeamMember,
        isTeamOwner,
        requireTeamMember,
        requireTeamOwner,
    };
}

const factory = createCallerFactory(apiRouter);

export const createCaller = async () => {
    const user: User | null = await getCurrentUser();

    const abilities = defineAbilitiesFor({
        user,
    });

    const ctx: Context = {
        async getAccessToken() {
            const h = await headers();
            const auth = h.get("authorization");
            return auth ? auth.replace("Bearer ", "") : undefined;
        },
        user,
        abilities,
        responseHeaders: null,
        isAdmin: false,
    };
    return factory(ctx);
};
