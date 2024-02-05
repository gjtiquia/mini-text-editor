import fsPromises from "fs/promises";
import z from "zod";
import { publicProcedure } from "../../lib/trpc";

export function readFileProcedure() {
    return publicProcedure
        .input(z.object({
            path: z.string()
        }))
        .query(async (opts) => {

            const { input } = opts;

            const text = await fsPromises.readFile(input.path, "utf-8");

            return {
                text
            }
        });
}
