//factories/signup.ts
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { MongoUserRepository } from "../../infra/repositories/user-repository/user";
import { LogMongoRepository } from "../../infra/repositories/log-repository/log";
import { SignUpController } from "../../presentation/controllers/signup/signup";
import { Controller } from "../../presentation/protocols";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { LogControllerDecorator } from "../decorators/log";
import { DbAddUser } from "../../data/services/user/user";

export const signUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const mongoUserRepository = new MongoUserRepository();
  const logMongoRepository = new LogMongoRepository();
  const dbAddAccount = new DbAddUser(bcryptAdapter, mongoUserRepository);
  const controller = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(controller, logMongoRepository);
};
