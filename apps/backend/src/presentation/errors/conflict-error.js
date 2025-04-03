"use strict";
//presentation/errors/conflict-error.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ConflictError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.CONFLICT,
            statusCode: 409,
            message: options.message ||
                `Resource already exists: ${options.resource || "Unknown"}`,
            code: options.code || "RESOURCE_CONFLICT",
            target: options.resource,
            metadata: options.metadata,
        });
    }
}
exports.ConflictError = ConflictError;
