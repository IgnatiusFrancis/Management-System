"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.AuthenticationError = void 0;
// presentation/errors/auth-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class AuthenticationError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.AUTHENTICATION,
            statusCode: 401,
            message: options.message || "Authentication required",
            code: options.code || "AUTHENTICATION_REQUIRED",
            details: options.details,
            metadata: options.metadata,
        });
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.AUTHORIZATION,
            statusCode: 403,
            message: options.message || "Not authorized",
            code: options.code || "NOT_AUTHORIZED",
            target: options.resource,
            details: options.details,
            metadata: options.metadata,
        });
    }
}
exports.AuthorizationError = AuthorizationError;
