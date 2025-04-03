"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
// presentation/errors/error-types.ts
var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION"] = "VALIDATION";
    ErrorType["BUSINESS"] = "BUSINESS";
    ErrorType["AUTHENTICATION"] = "AUTHENTICATION";
    ErrorType["AUTHORIZATION"] = "AUTHORIZATION";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["CONFLICT"] = "CONFLICT";
    ErrorType["SERVER"] = "SERVER";
    ErrorType["EXTERNAL"] = "EXTERNAL";
    ErrorType["FORBIDDEN"] = "FORBIDDEN";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
