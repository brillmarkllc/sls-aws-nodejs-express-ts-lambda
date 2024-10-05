import { NextFunction, Request, Response, Router } from "express";
import { getSum } from "@/core/getSum";

const router = Router();

// Define routes for the Express application. The default "/" route responds with app information.
// Each route is wrapped in a try-catch block to handle any potential errors and forward them to the error handler middleware.

router.all("/", (_request: Request, response: Response, next: NextFunction) => {
  try {
    response
      .status(200)
      .json({ app: "AWS Lambda NodeJS Express TS App", version: "1.0.0" });
  } catch (error) {
    next(error);
  }
});

// Route that returns a simple greeting message. Used to demonstrate a GET request.

router.get(
  "/hello",
  async (_request: Request, response: Response, next: NextFunction) => {
    try {
      response.status(200).json({ app: "Hello from path", version: "1.0.0" });
    } catch (error) {
      next(error);
    }
  }
);

// Example route that utilizes a core function to return a sum.
// The function logic is abstracted in the core folder and is called asynchronously.

router.get(
  "/sum",
  async (request: Request, response: Response, next: NextFunction) => {
    await getSum(request, response, next);
  }
);

// POST route example to demonstrate handling of incoming JSON data.
// This route accepts a request body with 'a' and 'b' parameters, calculates their sum, and returns the result.
// If either 'a' or 'b' is missing, it responds with an error message.

router.post(
  "/add",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { a, b } = request.body;

      if (typeof a === "undefined" || typeof b === "undefined") {
        response.status(400).json({
          error: "Missing parameters",
          message: "Please provide both 'a' and 'b' in the request body.",
        });
      }

      const sum = a + b;
      response.status(200).json({ sum });
    } catch (error) {
      next(error);
    }
  }
);

// Placeholder to register API routes from other route files such as authentication or other modules.
// router.use('/api/auth', authApiRoutes);

// Custom 404 handler that catches all requests to undefined routes.
// Returns a JSON response indicating that the route is not found.

router.use((_request: Request, response: Response, _next: NextFunction) => {
  response.status(404).json({
    error: "Route not found",
    message:
      "The requested resource could not be found on this server, please check the request method or the route.",
  });
});

export default router;
