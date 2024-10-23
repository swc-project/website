import { Abilities, User } from "@/lib/base";
import {
    TeamMemberRoleSchema,
    TeamMembership,
    UserRoleSchema,
} from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export function defineAbilitiesFor({
    user,
    teamMemberships,
}: {
    user: User | null;
    teamMemberships: TeamMembership[] | null;
}): Abilities {
    const isAdmin = user?.role === UserRoleSchema.Values.ADMIN;

    // == here is intentional
    const getTeamRole = async (teamId: string) =>
        teamMemberships?.find((m) => m.teamId == teamId)?.role ?? null;

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
