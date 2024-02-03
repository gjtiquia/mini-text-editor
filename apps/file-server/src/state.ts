import path from "path"

let rootDirectory = "";
let currentDirectory = "";

export function initState() {
    rootDirectory = process.cwd();
    currentDirectory = rootDirectory;
}

export function getCurrectDirectory() {
    return currentDirectory;
}

export function changeCurrentDirectory(newDirectory: string) {
    currentDirectory = newDirectory;
}

export function goUpADirectory() {
    const newDirectory = path.dirname(currentDirectory);
    currentDirectory = newDirectory;
}