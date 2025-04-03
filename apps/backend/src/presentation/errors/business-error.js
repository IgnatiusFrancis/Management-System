"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = void 0;
// presentation/errors/business-error.ts
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class BusinessError extends base_error_1.AppError {
    constructor(options) {
        super({
            type: error_types_1.ErrorType.BUSINESS,
            statusCode: 422,
            message: options.message,
            code: options.code || "BUSINESS_RULE_ERROR",
            target: options.target,
            details: options.details,
            metadata: options.metadata,
        });
    }
}
exports.BusinessError = BusinessError;
