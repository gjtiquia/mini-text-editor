import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, publicProcedure, router } from "../lib/trpc";
import { z } from 'zod';
import { getDirectoriesAndFilesAsync } from '../utils';
import { getCurrectDirectory } from '../state';

const trpcAppRouter = router({
    getContentsInCurrentDirectory: publicProcedure
        .query(async () => {

            console.log("getContentsInCurrentDirectory query");

            const currentDirectory = getCurrectDirectory();
            const contents = await getDirectoriesAndFilesAsync(currentDirectory);

            return {
                path: currentDirectory,
                contents: {
                    directories: contents.directoryContents,
                    files: contents.fileContents,
                }
            };
        })
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export const appRouter = trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
})