import { publicProcedure } from "../../lib/trpc";
import { getDirectoriesAndFilesAsync } from '../../utils';
import { getCurrectDirectory, getRootDirectory } from '../../state';
import path from "path";

export function getContentsProcedure() {
    return publicProcedure
        .query(async () => {

            const rootDirectory = getRootDirectory();
            const currentDirectory = getCurrectDirectory();

            const contents = await getDirectoriesAndFilesAsync(currentDirectory);

            const relativePath = path.relative(rootDirectory, currentDirectory);
            const rootName = path.basename(rootDirectory);
            const displayRelativePath = path.join(rootName, relativePath);

            return {
                rootPath: rootDirectory,
                path: currentDirectory,
                relativePath: displayRelativePath,
                contents: {
                    directories: contents.directoryContents,
                    files: contents.fileContents,
                }
            };
        });
}
