import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";

export interface Content {
    path: string,
    name: string,
    isDirectory: boolean
}

export async function getDirectoriesAndFilesAsync(directoryPath: string) {
    const contentNames = await getContentNamesAsync(directoryPath);

    const contents: Content[] = contentNames
        .map(name => {

            const contentPath = path.join(directoryPath, name);

            return {
                path: contentPath,
                name,
                isDirectory: isDirectory(contentPath)
            };
        });

    const directoryContents = contents.filter(x => x.isDirectory);
    const fileContents = contents.filter(x => !x.isDirectory);
    return { directoryContents, fileContents };
}

async function getContentNamesAsync(directoryPath: string) {

    const pathExists = fs.existsSync(directoryPath);
    if (!pathExists)
        throw new Error(`Path '${directoryPath}' does not exist!`);

    const isPathDirectory = isDirectory(directoryPath);
    if (!isPathDirectory)
        throw new Error(`Path '${directoryPath}' is not a directory!`);

    const files = await fsAsync.readdir(directoryPath);
    return files;
}

function isDirectory(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}