import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, router } from "../lib/trpc";
import { changeDirectoryProcedure, getContentsProcedure, goPreviousDirectoryProcedure, overwriteFileProcedure, readFileProcedure } from '../controllers/appController';

const trpcAppRouter = router({
    // Explorer
    getContentsInCurrentDirectory: getContentsProcedure(),
    changeCurrentDirectory: changeDirectoryProcedure(),
    goPreviousDirectory: goPreviousDirectoryProcedure(),

    // Editor
    readFile: readFileProcedure(),
    overwriteFile: overwriteFileProcedure(),
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})
