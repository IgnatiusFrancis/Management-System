"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
// presentation/errors/not-found-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class NotFoundError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.NOT_FOUND,
            statusCode: 404,
            message: options.message ||
                `Resource not found: ${options.resource || "Unknown"}`,
            code: options.code || "RESOURCE_NOT_FOUND",
            target: options.resource,
            metadata: options.metadata,
        });
    }
}
exports.NotFoundError = NotFoundError;
