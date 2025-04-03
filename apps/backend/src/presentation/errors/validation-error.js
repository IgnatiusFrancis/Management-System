"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = exports.MissingParamError = exports.ValidationError = void 0;
// presentation/errors/validation-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ValidationError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.VALIDATION,
            statusCode: 400,
            message: options.message,
            code: options.code || "VALIDATION_ERROR",
            target: options.target,
            details: options.details,
            metadata: options.metadata,
        });
    }
}
exports.ValidationError = ValidationError;
class MissingParamError extends ValidationError {
    constructor(paramName, metadata) {
        super({
            message: `Missing required parameter: ${paramName}`,
            code: "MISSING_PARAMETER",
            target: paramName,
            metadata,
        });
    }
}
exports.MissingParamError = MissingParamError;
class InvalidParamError extends ValidationError {
    constructor(paramName, reason, metadata) {
        super({
            message: reason
                ? `Invalid parameter: ${paramName} - ${reason}`
                : `Invalid parameter: ${paramName}`,
            code: "INVALID_PARAMETER",
            target: paramName,
            metadata,
        });
    }
}
exports.InvalidParamError = InvalidParamError;
