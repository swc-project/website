import { auth } from "@/lib/auth";
import { User } from "@/lib/base";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/prisma";

export async function getCurrentUser(): Promise<User | null> {
    const session = await auth();

    if (!session?.user) return null;

    const uid = session.user?.id;
    if (!uid) {
        throw new Error("No user id found in session");
    }

    const u = await db.user.upsert({
        where: {
            id: uid,
        },

        create: {
            id: uid,
            email: session.user.email!,
            name: session.user.name,
            image: session.user.image,
            role: UserRole.USER,
        },

        update: {},

        select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            image: true,
            role: true,
        },
    });

    return u;
}
