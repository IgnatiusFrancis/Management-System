"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (data) => console.log(JSON.stringify({
        level: "info",
        timestamp: new Date().toISOString(),
        ...data,
    })),
    warn: (data) => console.log(JSON.stringify({
        level: "warn",
        timestamp: new Date().toISOString(),
        ...data,
    })),
    error: (data) => console.error(JSON.stringify({
        level: "error",
        timestamp: new Date().toISOString(),
        ...data,
    })),
    debug: (data) => console.log(JSON.stringify({
        level: "debug",
        timestamp: new Date().toISOString(),
        ...data,
    })),
};
exports.default = logger;
