import { protectedProcedure, router } from "@/lib/base";
import { z } from "zod";

export const userRouter = router({
    me: protectedProcedure
        .input(z.void())
        .output(z.object({}))
        .query(({ ctx }) => {
            return ctx.user;
        }),
});
