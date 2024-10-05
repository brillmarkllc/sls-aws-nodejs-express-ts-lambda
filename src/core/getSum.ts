import { createError } from "@/error";
import { successResponse } from "@/response";
import { sum } from "@/utils/math";
import { Request, Response, NextFunction } from "express";

// This function serves as the core logic to calculate the sum of two numbers.
// It abstracts the sum calculation and handles success and error cases.
// The result is sent as a response or custom error handling is triggered based on the outcome.

export const getSum = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Perform the sum calculation using the sum function from the utils folder.
    const sumResult = await sum(2, 5);

    // Custom error handling for cases where sum calculation fails.
    if (!sumResult) throw createError("Sum did not work", 500);

    // The result object that will be sent in the response.
    const result = {
      sum: sumResult,
    };

    // Send a success response with the result object.
    return successResponse(response, result);

    // Alternatively, you can send just the sum result directly.
    // return successResponse(response, sumResult);
  } catch (error) {
    // Pass any errors to the error handling middleware.
    next(error);
  }
};
