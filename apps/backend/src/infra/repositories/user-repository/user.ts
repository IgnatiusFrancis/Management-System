// infra/repositories/user-repository/user.ts
import { UserRepository } from "../../../data/protocols/user-repository";
import { UserDocument, UserModel } from "../../../domain/models/user";
import { AddUserModel } from "../../../domain/usecases/user";
import {
  ConflictError,
  ExternalServiceError,
  NotFoundError,
} from "../../../presentation/errors";
import logger from "../../../utils/logger";

export class MongoUserRepository implements UserRepository {
  async add(accountData: AddUserModel): Promise<UserDocument> {
    try {
      // Check if account with email already exists
      const existingAccount = await UserModel.findOne({
        email: accountData.email,
      });

      if (existingAccount) {
        throw new ConflictError({
          message: "Account with this email already exists",
          resource: "user",
          metadata: { email: accountData.email },
        });
      }

      // Create and save the new account
      const account = new UserModel(accountData);
      const savedAccount = await account.save();

      return savedAccount;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      }

      // Log the database error with details
      logger.error({
        message: "Database error while saving account",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.add",
        data: { email: accountData.email },
      });

      throw new ExternalServiceError({
        message: "Failed to create account due to database error",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      logger.error({
        message: "Database error while finding account by email",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.findByEmail",
        data: { email },
      });

      throw new ExternalServiceError({
        message: "Failed to retrieve account information",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      // Handle MongoDB validation/cast errors (invalid ObjectId)
      if (error.name === "CastError" && error.kind === "ObjectId") {
        throw new NotFoundError({
          message: "User not found - Invalid ID format",
          resource: "user",
          code: "INVALID_USER_ID",
          metadata: { userId: id },
        });
      }

      // Log other database errors
      logger.error({
        message: "Database error while finding account by ID",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.findById",
        data: { userId: id },
      });

      throw new ExternalServiceError({
        message: "Failed to retrieve account information",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  async listUsers({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }): Promise<{
    users: UserDocument[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      // Construct the query based on the search text
      const query = search ? { $text: { $search: search } } : {};

      const users = await UserModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-password")
        .sort({ createdAt: -1 });

      // Get the total number of users matching the query
      const total = await UserModel.countDocuments(query);

      return { users, total, page, limit };
    } catch (error) {
      logger.error({
        message: "Database error while listing users",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.listUsers",
        data: { page, limit, search },
      });

      throw new ExternalServiceError({
        message: "Failed to list users",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  async updateUser(id: string, data: any): Promise<UserDocument | null> {
    try {
      return await UserModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      logger.error({
        message: "Database error while updating user",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.updateUser",
        data: { data, userId: id },
      });

      throw new ExternalServiceError({
        message: "Failed to update user",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (error) {
      logger.error({
        message: "Database error while updating deleting user",
        error: error instanceof Error ? error.message : String(error),
        operation: "AccountMongoRepository.deleteUser",
        data: { id },
      });

      throw new ExternalServiceError({
        message: "Failed to delete user",
        service: "MongoDB",
        cause: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }
}
