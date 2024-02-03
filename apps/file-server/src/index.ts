import express from "express"
import cors from "cors";
import { getDirectoriesAndFilesAsync } from "./getDirectoriesAndFiles";

console.log("Running @mini-text-editor/file-server...")

const app = express();
const PORT = 3000;

// Global Middleware
app.use(cors()); // Enable all origins

// Set Routes
// app.use("/app", appRouter)
app.get("/", (req, res) => res.send("Hello World!"))

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

async function main() {
    const directoryPath = process.cwd();
    const { directoryContents, fileContents } = await getDirectoriesAndFilesAsync(directoryPath);

    console.log("path", directoryPath);
    console.log("directories", directoryContents.map(x => x.name))
    console.log("files", fileContents.map(x => x.name))
}
