import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, router } from "../lib/trpc";
import { getContentsProcedure } from '../controllers/appController';

const trpcAppRouter = router({
    getContentsInCurrentDirectory: getContentsProcedure()
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})
