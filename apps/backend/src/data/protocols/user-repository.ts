import { AddUserModel, UserDocument } from "../services/user/protocols";

export interface UserRepository {
  addUser(data: AddUserModel): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  updateUser(
    id: string,
    data: Partial<AddUserModel>
  ): Promise<UserDocument | null>;
  deleteUser(id: string): Promise<void>;
}
