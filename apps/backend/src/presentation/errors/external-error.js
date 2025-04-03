"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalServiceError = void 0;
// presentation/errors/external-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ExternalServiceError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.EXTERNAL,
            statusCode: options.statusCode || 502,
            message: options.message,
            code: options.code || "EXTERNAL_SERVICE_ERROR",
            target: options.service,
            metadata: {
                ...options.metadata,
                service: options.service,
                cause: options.cause
                    ? {
                        message: options.cause.message,
                        name: options.cause.name,
                    }
                    : undefined,
            },
        });
    }
}
exports.ExternalServiceError = ExternalServiceError;
