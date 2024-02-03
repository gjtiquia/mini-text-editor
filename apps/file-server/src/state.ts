let currentDirectory = "";

export function initState() {
    currentDirectory = process.cwd();
}

export function getCurrectDirectory() {
    return currentDirectory;
}