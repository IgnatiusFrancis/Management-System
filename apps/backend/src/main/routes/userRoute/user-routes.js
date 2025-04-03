"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../../adapter/express-route-adapter");
const user_1 = require("../../factories/user");
exports.default = (router) => {
    router.all("/users", (0, express_route_adapter_1.adaptRoute)((0, user_1.userControllerFactory)()));
    router.all("/users/:id", (0, express_route_adapter_1.adaptRoute)((0, user_1.userControllerFactory)()));
};
