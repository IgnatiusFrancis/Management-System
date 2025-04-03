"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const errors_1 = require("../../presentation/errors");
const adaptRoute = (controller) => {
    return async (req, res) => {
        try {
            const httpRequest = {
                method: req.method,
                body: req.body,
                params: req.params,
                query: Object.fromEntries(Object.entries(req.query).map(([key, value]) => [
                    key,
                    Array.isArray(value)
                        ? value.join(",")
                        : value,
                ])),
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
        }
        catch (error) {
            console.error("Uncaught error in route adapter:", error);
            // Custom error handling for NotFoundError and ServerError
            if (error instanceof errors_1.NotFoundError) {
                return res.status(404).json({
                    error: {
                        type: "NOT_FOUND",
                        message: error.message,
                        code: error.code,
                    },
                });
            }
            if (error instanceof errors_1.ConflictError) {
                return res.status(409).json({
                    error: {
                        type: "CONFLICT",
                        message: error.message,
                        code: error.code,
                    },
                });
            }
            if (error instanceof errors_1.ServerError) {
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
exports.adaptRoute = adaptRoute;
