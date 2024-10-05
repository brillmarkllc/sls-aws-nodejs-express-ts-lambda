import { errorHandler } from "@/error";
import express from "express";
import cors from "cors";
import routes from "@/routes";

const app = express();

app.use(cors()); // Enable CORS for all incoming requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse incoming JSON requests

// Use the imported routes for handling incoming API requests
app.use(routes);

// Error handling middleware is attached at the end to catch errors thrown during route handling.
// The custom errorHandler will manage and format the error responses.
app.use(errorHandler);

// Placeholder for connecting to the database, can be uncommented when used
// databaseConnection();

// Export the app object for use in other parts of the project (e.g., in handler.js)
export default app;
