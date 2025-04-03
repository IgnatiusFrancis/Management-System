"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
// presentation/errors/server-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ServerError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.SERVER,
            statusCode: 500,
            message: options.message || "Internal server error",
            code: options.code || "INTERNAL_SERVER_ERROR",
            metadata: {
                ...options.metadata,
                cause: options.cause
                    ? {
                        message: options.cause.message,
                        name: options.cause.name,
                    }
                    : undefined,
            },
            isOperational: false,
            stack: options.stack,
        });
    }
}
exports.ServerError = ServerError;
