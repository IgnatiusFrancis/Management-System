//Build script: "build": "rimraf dist && tsc --project tsconfig.build.json",
import { connectDB } from "../infra/Database/dbConnection";
import env from "./config/env";

connectDB()
  .then(async () => {
    const app = (await import("./config/app")).default;
    const server = app.listen(env.port, () =>
      console.log(`Server running at port:${env.port}`)
    );
  })
  .catch(console.error);
