"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(options) {
        super(options.message);
        this.type = options.type;
        this.statusCode = options.statusCode;
        this.code = options.code;
        this.target = options.target;
        this.details = options.details;
        this.metadata = options.metadata;
        this.isOperational = options.isOperational ?? true;
        this.timestamp = new Date();
        this.name = this.constructor.name;
        if (options.stack) {
            this.stack = options.stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            error: {
                type: this.type,
                code: this.code,
                message: this.message,
                target: this.target,
                details: this.details,
                timestamp: this.timestamp.toISOString(),
            },
        };
    }
}
exports.AppError = AppError;
