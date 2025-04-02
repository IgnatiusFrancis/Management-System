// routes/user-routes.ts
import { Router } from "express";
import { adaptRoute } from "../../adapter/express-route-adapter";
import { userControllerFactory } from "../../factories/user";

export default (router: Router): void => {
  router.all("/users", adaptRoute(userControllerFactory()));
  router.all("/users/:id", adaptRoute(userControllerFactory()));
};
