//services/user/user.ts

import { ConflictError } from "../../../presentation/errors";
import {
  User,
  AddUserModel,
  UserRepository,
  Encrypter,
  UserDocument,
} from "./protocols";

export class DbAddUser implements User {
  private readonly encrypter: Encrypter;
  private readonly addUserRepository: UserRepository;
  constructor(encrypter: Encrypter, addUserRepository: UserRepository) {
    this.encrypter = encrypter;
    this.addUserRepository = addUserRepository;
  }

  async add(accountData: AddUserModel): Promise<UserDocument> {
    try {
      const existingAccount = await this.addUserRepository.findByEmail(
        accountData.email
      );

      if (existingAccount) {
        throw new ConflictError({
          message: "Account with this email already exists",
          resource: "user",
          metadata: { email: accountData.email },
        });
      }

      const hashedPassword = await this.encrypter.encrypt(accountData.password);
      const account = this.addUserRepository.add({
        ...accountData,
        password: hashedPassword,
      });
      return new Promise((resolve) => resolve(account));
    } catch (error) {
      throw error;
    }
  }
}
