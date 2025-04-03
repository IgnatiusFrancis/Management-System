// // config/middleware.ts
import { Express } from "express";
import { bodyParser, contentType, errorHandler } from "../middlewares";
import cors from "cors";

export const setupMiddlewares = (app: Express): void => {
  app.use(
    cors({
      origin: [
        "https://management-system-frontend-azure.vercel.app",
        "http://localhost:5173",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser);
  app.use(contentType);
  app.use(errorHandler);
};
