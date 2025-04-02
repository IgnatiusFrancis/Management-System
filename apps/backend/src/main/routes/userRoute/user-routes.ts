// // routes/user-routes.ts

import { Router } from "express";
import { adaptRoute } from "../../adapter/express-route-adapter";
import { userControllerFactory } from "../../factories/user";
import { signUpController } from "../../factories/signup";
import { loginController } from "../../factories/login";

export default (router: Router): void => {
  router.post("/users/signup", adaptRoute(signUpController()));
  router.post("/users/signin", adaptRoute(loginController()));
  router.all("/users", adaptRoute(userControllerFactory())); // Handles GET, POST (if needed)
  router.all("/users/:id", adaptRoute(userControllerFactory())); // Handles GET, PUT, DELETE
};
