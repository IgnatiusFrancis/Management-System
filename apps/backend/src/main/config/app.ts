//main/config/app.ts
import express from "express";
import { setupMiddlewares } from "./middlewares";
import { setupRoutes } from "./routes";
import { errorHandler } from "../middlewares/error-handler";

const app = express();

setupMiddlewares(app);
setupRoutes(app);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Handle 404 Not Found
app.use("/*", (req, res) => {
  return res.status(404).json("Endpoint not found");
});

export default app;
