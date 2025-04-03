"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
const middlewares_1 = require("../middlewares");
const cors_1 = __importDefault(require("cors"));
const setupMiddlewares = (app) => {
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
    app.use(middlewares_1.bodyParser);
    app.use(middlewares_1.contentType);
    app.use(middlewares_1.errorHandler);
};
exports.setupMiddlewares = setupMiddlewares;
