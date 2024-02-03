import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, publicProcedure, router } from "../lib/trpc";
import { z } from 'zod';

const trpcAppRouter = router({
    greeting: publicProcedure
        .query(() => {
            console.log("Server received greeting query!");
            return { message: "hello world!" };
        }),
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})