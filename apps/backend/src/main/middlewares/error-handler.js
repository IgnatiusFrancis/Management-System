"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../../presentation/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
const errorHandler = (err, req, res, next) => {
    // Log detailed error information
    if (err instanceof errors_1.AppError) {
        if (!err.isOperational) {
            logger_1.default.error({
                message: "Non-operational error occurred",
                error: err,
                stack: err.stack,
                path: req.path,
                method: req.method,
                requestId: req.headers["x-request-id"],
            });
        }
        else {
            logger_1.default.warn({
                message: err.message,
                errorType: err.type,
                errorCode: err.code,
                path: req.path,
                method: req.method,
                requestId: req.headers["x-request-id"],
            });
        }
        return res.status(err.statusCode).json(err.toJSON());
    }
    // For unknown errors, convert to ServerError
    const serverError = new errors_1.ServerError({
        message: err.message || "An unexpected error occurred",
        cause: err,
        stack: err.stack,
    });
    logger_1.default.error({
        message: "Unhandled error occurred",
        error: err,
        stack: err.stack,
        path: req.path,
        method: req.method,
        requestId: req.headers["x-request-id"],
    });
    return res.status(serverError.statusCode).json(serverError.toJSON());
};
exports.errorHandler = errorHandler;
