"use strict";
// factories/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerFactory = void 0;
const log_1 = require("../../infra/repositories/log-repository/log");
const user_1 = require("../../infra/repositories/user-repository/user");
const log_2 = require("../decorators/log");
const user_2 = require("../../presentation/controllers/user/user");
const userControllerFactory = () => {
    const userRepository = new user_1.MongoUserRepository();
    const logMongoRepository = new log_1.LogMongoRepository();
    const controller = new user_2.UserController(userRepository);
    return new log_2.LogControllerDecorator(controller, logMongoRepository);
};
exports.userControllerFactory = userControllerFactory;
