import type { Request, Response } from "express";
import { getDirectoriesAndFilesAsync } from "../../utils";

export async function rootHandler(req: Request, res: Response) {
    const directoryPath = process.cwd();
    const { directoryContents, fileContents } = await getDirectoriesAndFilesAsync(directoryPath);

    console.log("path", directoryPath);
    console.log("directories", directoryContents.map(x => x.name))
    console.log("files", fileContents.map(x => x.name))

    res.send(JSON.stringify({ directoryContents, fileContents }))
} 