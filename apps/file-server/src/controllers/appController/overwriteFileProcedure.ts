import fsPromises from "fs/promises"
import z from "zod";
import { publicProcedure } from "../../lib/trpc";

export function overwriteFileProcedure() {
    return publicProcedure
        .input(z.object({
            path: z.string(),
            text: z.string()
        }))
        .mutation(async (opts) => {
            const { input } = opts;
            await fsPromises.writeFile(input.path, input.text)
        });
}
