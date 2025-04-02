import {
  ConflictError,
  NotFoundError,
  ServerError,
} from "../../presentation/errors";
import { Controller } from "../../presentation/protocols";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest = {
        method: req.method,
        body: req.body,
        params: req.params as Record<string, string | undefined>,
        query: Object.fromEntries(
          Object.entries(req.query).map(([key, value]) => [
            key,
            Array.isArray(value)
              ? value.join(",")
              : (value as string | undefined),
          ])
        ) as Record<string, string | undefined>,
        headers: req.headers,
        user: req.user,
      };

      const httpResponse = await controller.handle(httpRequest);

      const statusCode = httpResponse.statusCode;

      // If no content, don't send a body
      if (statusCode === 204) {
        return res.status(statusCode).end();
      }

      // For all other responses, send the body
      return res.status(statusCode).json(httpResponse.body);
    } catch (error) {
      console.error("Uncaught error in route adapter:", error);

      // Custom error handling for NotFoundError and ServerError
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          error: {
            type: "NOT_FOUND",
            message: error.message,
            code: error.code,
          },
        });
      }

      if (error instanceof ConflictError) {
        return res.status(409).json({
          error: {
            type: "CONFLICT",
            message: error.message,
            code: error.code,
          },
        });
      }

      if (error instanceof ServerError) {
        return res.status(400).json({
          error: {
            type: "SERVER",
            message: error.message,
            code: error.code,
          },
        });
      }

      return res.status(500).json({
        error: {
          type: "SERVER",
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        },
      });
    }
  };
};
