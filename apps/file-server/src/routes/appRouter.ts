import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, router } from "../lib/trpc";
import { changeDirectoryProcedure, getContentsProcedure, goPreviousDirectoryProcedure } from '../controllers/appController';

const trpcAppRouter = router({
    getContentsInCurrentDirectory: getContentsProcedure(),
    changeCurrentDirectory: changeDirectoryProcedure(),
    goPreviousDirectory: goPreviousDirectoryProcedure()
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})
