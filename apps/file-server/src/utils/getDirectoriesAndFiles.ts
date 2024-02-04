import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export interface Content {
    id: string,
    path: string,
    name: string,
    isDirectory: boolean
}

export async function getDirectoriesAndFilesAsync(directoryPath: string) {
    const contentNames = await getContentNamesAsync(directoryPath);

    const contents: Content[] = contentNames
        .map((name, index) => {

            const contentPath = path.join(directoryPath, name);

            return {
                id: index.toString(),
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

    const files = await fsPromises.readdir(directoryPath);
    return files;
}

function isDirectory(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}