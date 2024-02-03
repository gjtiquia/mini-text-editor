import { getDirectoriesAndFilesAsync } from "./getDirectoriesAndFiles";

main();

async function main() {
    console.log("Running @mini-text-editor/file-server...")

    const directoryPath = process.cwd();

    const { directoryContents, fileContents } = await getDirectoriesAndFilesAsync(directoryPath);

    console.log("path", directoryPath);
    console.log("directories", directoryContents.map(x => x.name))
    console.log("files", fileContents.map(x => x.name))
}
