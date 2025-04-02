// config/middleware.ts
import { Express, } from "express";
import { bodyParser, contentType, cors, errorHandler } from "../middlewares";

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
  app.use(errorHandler);
};
