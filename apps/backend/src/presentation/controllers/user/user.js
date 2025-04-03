"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// presentation/controllers/user/user.ts
const errors_1 = require("../../errors");
const http_helpers_1 = require("../../helpers/http-helpers");
class UserController {
    constructor(user) {
        this.user = user;
    }
    async handle(httpRequest) {
        try {
            switch (httpRequest.method) {
                case "GET":
                    return httpRequest.params?.id
                        ? this.getUser(httpRequest)
                        : this.listUsers(httpRequest);
                case "PUT":
                    return this.updateUser(httpRequest);
                case "POST":
                    return this.addUser(httpRequest);
                case "DELETE":
                    return this.deleteUser(httpRequest);
                default:
                    throw new errors_1.ServerError({
                        message: "Invalid request method",
                        cause: new Error("Invalid request method"),
                        code: "INAPPROPRIATE_METHOD",
                    });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addUser(req) {
        try {
            const user = await this.user.findByEmail(req.body.email);
            if (user) {
                throw new errors_1.ConflictError({
                    message: "User already exists",
                    resource: "user",
                    code: "USER_ALREADY_EXISTS",
                    metadata: { user: user },
                });
            }
            const updatedUser = await this.user.addUser(req.body);
            return (0, http_helpers_1.success)(updatedUser);
        }
        catch (error) {
            throw error;
        }
    }
    async listUsers(req) {
        try {
            const { page = 1, limit = 10, search = "" } = req.query;
            const users = await this.user.listUsers({
                page: Number(page),
                limit: Number(limit),
                search: String(search),
            });
            return (0, http_helpers_1.success)(users);
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(req) {
        try {
            const user = await this.user.findById(req.params.id);
            if (!user) {
                throw new errors_1.NotFoundError({
                    message: "User not found",
                    resource: "user",
                    code: "USER_NOT_FOUND",
                    metadata: { user: user },
                });
            }
            return (0, http_helpers_1.success)(user);
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(req) {
        try {
            await this.getUser(req);
            const updatedUser = await this.user.updateUser(req.params.id, req.body);
            return (0, http_helpers_1.success)(updatedUser);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(req) {
        try {
            await this.getUser(req);
            await this.user.deleteUser(req.params.id);
            return (0, http_helpers_1.success)({ message: "User deleted successfully" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserController = UserController;
