// presentation/controllers/user/user.ts
import { NotFoundError, ServerError } from "../../errors";
import { success } from "../../helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse, User } from "./user-protocols";

export class UserController implements Controller {
  constructor(private readonly user: User) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      switch (httpRequest.method) {
        case "GET":
          return httpRequest.params?.id
            ? this.getUser(httpRequest)
            : this.listUsers(httpRequest);
        case "PUT":
          return this.updateUser(httpRequest);
        case "DELETE":
          return this.deleteUser(httpRequest);
        default:
          throw new ServerError({
            message: "Invalid request method",
            cause: new Error("Invalid request method"),
            code: "INAPPROPRIATE_METHOD",
          });
      }
    } catch (error) {
      throw error;
    }
  }

  private async listUsers(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      const users = await this.user.listUsers({
        page: Number(page),
        limit: Number(limit),
        search: String(search),
      });

      return success(users);
    } catch (error) {
      throw error;
    }
  }

  private async getUser(req: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.user.findById(req.params.id);

      if (!user) {
        throw new NotFoundError({
          message: "User not found",
          resource: "user",
          code: "USER_NOT_FOUND",
          metadata: { user: user },
        });
      }

      return success(user);
    } catch (error) {
      throw error;
    }
  }

  private async updateUser(req: HttpRequest): Promise<HttpResponse> {
    try {
      await this.getUser(req);
      const updatedUser = await this.user.updateUser(req.params.id, req.body);
      return success(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  private async deleteUser(req: HttpRequest): Promise<HttpResponse> {
    try {
      await this.getUser(req);
      await this.user.deleteUser(req.params.id);
      return success({ message: "User deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
}
