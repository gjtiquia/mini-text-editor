import express from "express"
import cors from "cors";
import { initState } from "./state";
import { rootHandler } from "./controllers";
import { appRouter } from "./routes";

console.log("Running @mini-text-editor/file-server...")

// Initialize state
initState();

const app = express();
const PORT = 3000;

// Global Middleware
app.use(cors()); // Enable all origins

// Set Routes
app.get("/", rootHandler)
app.use("/app", appRouter)

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
