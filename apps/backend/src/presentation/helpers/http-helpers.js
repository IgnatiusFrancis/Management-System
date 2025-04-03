"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.error = exports.noContent = exports.created = exports.success = void 0;
// presentation/helpers/http-helpers.ts
const errors_1 = require("../errors");
const success = (data, statusCode = 200) => ({
    statusCode,
    body: data,
});
exports.success = success;
const created = (data) => (0, exports.success)(data, 201);
exports.created = created;
const noContent = () => ({
    statusCode: 204,
    body: null,
});
exports.noContent = noContent;
const error = (appError) => ({
    statusCode: appError.statusCode,
    body: appError.toJSON(),
});
exports.error = error;
const handleError = (err) => {
    if (err instanceof errors_1.AppError) {
        return (0, exports.error)(err);
    }
    const serverError = new errors_1.ServerError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        cause: err instanceof Error ? err : undefined,
        stack: err instanceof Error ? err.stack : undefined,
    });
    return (0, exports.error)(serverError);
};
exports.handleError = handleError;
