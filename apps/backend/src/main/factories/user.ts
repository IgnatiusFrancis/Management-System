// factories/user.ts

import { LogMongoRepository } from "../../infra/repositories/log-repository/log";
import { MongoUserRepository } from "../../infra/repositories/user-repository/user";
import { LogControllerDecorator } from "../decorators/log";
import { Controller } from "../../presentation/protocols";
import { UserController } from "../../presentation/controllers/user/user";

export const userControllerFactory = (): Controller => {
  const userRepository = new MongoUserRepository();
  const logMongoRepository = new LogMongoRepository();

  const controller = new UserController(userRepository);

  return new LogControllerDecorator(controller, logMongoRepository);
};
