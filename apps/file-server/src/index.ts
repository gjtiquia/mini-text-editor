import path from "path"
import { getContentNamesAsync, isDirectory } from "./utils";

main();

interface Content {
    path: string,
    name: string,
    isDirectory: boolean
}

async function main() {
    console.log("Running @mini-text-editor/file-server...")

    const directoryPath = process.cwd();

    const contentNames = await getContentNamesAsync(directoryPath);

    const contents: Content[] = contentNames
        .map(name => {

            const contentPath = path.join(directoryPath, name);

            return {
                path: contentPath,
                name,
                isDirectory: isDirectory(contentPath)
            }
        })

    const directoryContents = contents.filter(x => x.isDirectory);
    const fileContents = contents.filter(x => !x.isDirectory);

    console.log("path", directoryPath);
    console.log("directories", directoryContents.map(x => x.name))
    console.log("files", fileContents.map(x => x.name))
}

