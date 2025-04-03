"use strict";
//presentation/errors/forbidden-error.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ForbiddenError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.FORBIDDEN,
            statusCode: 403,
            message: options.message || `Forbidden: ${options.resource || "Unknown"}`,
            code: options.code || "RESOURCE_FORBIDDEN",
            target: options.resource,
            metadata: options.metadata,
        });
    }
}
exports.ForbiddenError = ForbiddenError;
