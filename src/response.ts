import { Response } from "express";

export const successResponse = (
  response: Response,
  data: string | object | number = "success",
  statusCode: number = 200
) => {
  return response.status(statusCode).json(data);
};
