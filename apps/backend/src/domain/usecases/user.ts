// //domain/useCases/user.ts

import { UserDocument } from "../models/user";

export interface AddUserModel {
  name: string;
  email: string;
  role: "admin" | "user" | "editor";
}

export interface UpdateUserModel {
  name?: string;
  email?: string;
  role: "admin" | "user" | "editor";
}

export interface User {
  addUser(data: AddUserModel): Promise<UserDocument>;
  findById?(id: string): Promise<UserDocument | null>;
  findByEmail?(id: string): Promise<UserDocument | null>;
  listUsers?({
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
  }>;

  updateUser?(id: string, data: UpdateUserModel): Promise<UserDocument | null>;
  deleteUser?(id: string): Promise<void>;
}
