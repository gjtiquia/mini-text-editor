import fs from "fs";
import fsAsync from "fs/promises";

export async function getContentNamesAsync(directoryPath: string) {

    const pathExists = fs.existsSync(directoryPath);
    if (!pathExists)
        throw new Error(`Path '${directoryPath}' does not exist!`);

    const isPathDirectory = isDirectory(directoryPath);
    if (!isPathDirectory)
        throw new Error(`Path '${directoryPath}' is not a directory!`);

    const files = await fsAsync.readdir(directoryPath);
    return files;
}

export function isDirectory(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}