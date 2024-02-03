import { publicProcedure } from "../../lib/trpc";
import { goUpADirectory } from '../../state';
import z from "zod";

export function goPreviousDirectoryProcedure() {
    return publicProcedure
        .mutation(() => {
            goUpADirectory();
        });
}
