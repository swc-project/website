import "server-only";

import { TRPCError, initTRPC } from "@trpc/server";
import { AsyncLocalStorage } from "async_hooks";
import superjson from "superjson";
import { z } from "zod";

export { default as superjson } from "superjson";

export const UserRoleSchema = z.enum(["USER", "ADMIN"]);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`;

export const UserSchema = z.object({
    role: UserRoleSchema,
    id: z.string(),
    email: z.string(),
    emailVerified: z.date().nullable(),
    name: z.string().nullable(),
    image: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export type Abilities = {
    isAdmin: boolean;
    isTeamMember: (teamId: string) => Promise<boolean>;
    isTeamOwner: (teamId: string) => Promise<boolean>;
    requireTeamMember: (teamId: string) => Promise<void>;
    requireTeamOwner: (teamId: string) => Promise<void>;
};

export type Context = {
    /**
     * Get the access token from the request header. (Authorization: Bearer $token)
     */
    getAccessToken(): Promise<string | undefined>;

    user: User | null;
    abilities: Abilities;
    responseHeaders: Headers | null;
    isAdmin: boolean;
};

export const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

/**
 * Create a router
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

export const createCallerFactory = t.createCallerFactory;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/procedures
 **/
export const publicProcedure = t.procedure.use(async (opts) => {
    const start = Date.now();

    const result = await contextStore.run(
        opts.ctx,
        async () => await opts.next()
    );

    if (result.ok) {
        // Drop 'undefined'
        result.data = removeUndefinedRecursively(result.data);
    }

    const durationMs = Date.now() - start;
    const meta = { path: opts.path, type: opts.type, durationMs };

    if (process.env.NODE_ENV !== "test") {
        result.ok
            ? console.log("OK request timing:", meta)
            : console.error("Non-OK request timing", meta);

        if (!result.ok) {
            console.error("Error:", result.error);
        }
    }

    return result;
});

/**
 * @see https://trpc.io/docs/merging-routers
 */
export const mergeRouters = t.mergeRouters;

export const middleware = t.middleware;

const isAuthenticated = t.middleware(({ ctx, next }) => {
    if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({
        ctx: {
            ...ctx,
            user: ctx.user,
        },
    });
});

export const protectedProcedure = publicProcedure.use(isAuthenticated);

export const contextStore = new AsyncLocalStorage<Context>();

function removeUndefinedRecursively<T = any>(data: T): NonNullable<T> | null {
    if (data === null || data === undefined) return null;
    if (typeof data !== "object") {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(removeUndefinedRecursively) as NonNullable<T>;
    }

    if (data instanceof Date) return data;

    const obj: any = data;
    const newObj: any = {};
    Object.keys(data).forEach((key) => {
        if (obj[key] === undefined) return;

        const value = removeUndefinedRecursively(obj[key]);

        newObj[key] = value;
    });
    return newObj;
}
