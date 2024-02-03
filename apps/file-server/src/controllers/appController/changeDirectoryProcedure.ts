import { publicProcedure } from "../../lib/trpc";
import { changeCurrentDirectory } from '../../state';
import z from "zod";

export function changeDirectoryProcedure() {
    return publicProcedure
        .input(z.object({
            path: z.string()
        }))
        .mutation((opts) => {

            const { input } = opts;

            changeCurrentDirectory(input.path);
        });
}
