"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const user_1 = require("../../../domain/models/user");
const errors_1 = require("../../../presentation/errors");
const logger_1 = __importDefault(require("../../../utils/logger"));
class MongoUserRepository {
    async addUser(accountData) {
        try {
            // Check if account with email already exists
            const existingAccount = await user_1.UserModel.findOne({
                email: accountData.email,
            });
            if (existingAccount) {
                throw new errors_1.ConflictError({
                    message: "Account with this email already exists",
                    resource: "user",
                    metadata: { email: accountData.email },
                });
            }
            // Create and save the new account
            const account = new user_1.UserModel(accountData);
            const savedAccount = await account.save();
            return savedAccount;
        }
        catch (error) {
            if (error instanceof errors_1.ConflictError) {
                throw error;
            }
            // Log the database error with details
            logger_1.default.error({
                message: "Database error while saving account",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.add",
                data: { email: accountData.email },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to create account due to database error",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
    async findByEmail(email) {
        try {
            return await user_1.UserModel.findOne({ email });
        }
        catch (error) {
            logger_1.default.error({
                message: "Database error while finding account by email",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.findByEmail",
                data: { email },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to retrieve account information",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
    async findById(id) {
        try {
            return await user_1.UserModel.findById(id);
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                throw error;
            }
            // Handle MongoDB validation/cast errors (invalid ObjectId)
            if (error.name === "CastError" && error.kind === "ObjectId") {
                throw new errors_1.NotFoundError({
                    message: "User not found - Invalid ID format",
                    resource: "user",
                    code: "INVALID_USER_ID",
                    metadata: { userId: id },
                });
            }
            // Log other database errors
            logger_1.default.error({
                message: "Database error while finding account by ID",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.findById",
                data: { userId: id },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to retrieve account information",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
    async listUsers({ page, limit, search, }) {
        try {
            // Construct the query based on the search text
            const query = search ? { $text: { $search: search } } : {};
            const users = await user_1.UserModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .select("-password")
                .sort({ createdAt: -1 });
            // Get the total number of users matching the query
            const total = await user_1.UserModel.countDocuments(query);
            return { users, total, page, limit };
        }
        catch (error) {
            logger_1.default.error({
                message: "Database error while listing users",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.listUsers",
                data: { page, limit, search },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to list users",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
    async updateUser(id, data) {
        try {
            return await user_1.UserModel.findByIdAndUpdate(id, data, { new: true });
        }
        catch (error) {
            logger_1.default.error({
                message: "Database error while updating user",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.updateUser",
                data: { data, userId: id },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to update user",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
    async deleteUser(id) {
        try {
            await user_1.UserModel.findByIdAndDelete(id);
        }
        catch (error) {
            logger_1.default.error({
                message: "Database error while updating deleting user",
                error: error instanceof Error ? error.message : String(error),
                operation: "AccountMongoRepository.deleteUser",
                data: { id },
            });
            throw new errors_1.ExternalServiceError({
                message: "Failed to delete user",
                service: "MongoDB",
                cause: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }
}
exports.MongoUserRepository = MongoUserRepository;
