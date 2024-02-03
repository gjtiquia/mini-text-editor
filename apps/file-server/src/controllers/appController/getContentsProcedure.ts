import { publicProcedure } from "../../lib/trpc";
import { getDirectoriesAndFilesAsync } from '../../utils';
import { getCurrectDirectory } from '../../state';

export function getContentsProcedure() {
    return publicProcedure
        .query(async () => {

            const currentDirectory = getCurrectDirectory();
            const contents = await getDirectoriesAndFilesAsync(currentDirectory);

            return {
                path: currentDirectory,
                contents: {
                    directories: contents.directoryContents,
                    files: contents.fileContents,
                }
            };
        });
}
