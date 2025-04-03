"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//main/config/app.ts
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const error_handler_1 = require("../middlewares/error-handler");
const app = (0, express_1.default)();
(0, middlewares_1.setupMiddlewares)(app);
(0, routes_1.setupRoutes)(app);
app.use(error_handler_1.errorHandler);
app.use("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});
// Handle 404 Not Found
app.use("/*", (req, res) => {
    return res.status(404).json("Endpoint not found");
});
exports.default = app;
