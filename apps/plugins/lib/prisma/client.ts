import { PrismaClient } from "@/lib/generated/prisma";
export { Prisma } from "@/lib/generated/prisma";

declare let global: { prisma: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
}

export { prisma as db };
