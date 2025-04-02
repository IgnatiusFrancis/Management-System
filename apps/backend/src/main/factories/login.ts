//factories/login.ts
import env from "../config/env";
import { DbAuthentication } from "../../data/services/authentication/db-authentication";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { JwtAdapter } from "../../infra/criptography/jwt-adapter";
import { MongoUserRepository } from "../../infra/repositories/user-repository/user";
import { LogMongoRepository } from "../../infra/repositories/log-repository/log";
import { LogginContfroller } from "../../presentation/controllers/login/login";
import { Controller } from "../../presentation/protocols";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";
import { LogControllerDecorator } from "../decorators/log";

export const loginController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const accountMongoRepository = new MongoUserRepository();
  const bcryptAdapter = new BcryptAdapter();
  const jwtAdapter = new JwtAdapter(env.secret_key);
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter
  );
  const controller = new LogginContfroller(
    emailValidatorAdapter,
    dbAuthentication
  );
  return new LogControllerDecorator(controller, new LogMongoRepository());
};
