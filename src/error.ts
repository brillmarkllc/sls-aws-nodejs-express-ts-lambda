import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  console.error("Error:", error.stack); // Log the error stack

  const issue = {
    success: false,
    status: error.status || 500,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV !== "production" ? error.stack : "",
  };

  response.status(error.status || 500).json(issue);
};

export const createError = (message: string, status: number = 500) => {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
};
