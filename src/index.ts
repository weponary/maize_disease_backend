import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import appConfig from "./config/appConfig";
import sequelize from "./config/dbSetup";
import { logger } from "./config/loggerSetup";
import userService from "./user";
import app from "./config/express";

// self invoking function
(async function () {
  try {
    await sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected sucessfully");
      })
      .catch((err: any) => {
        console.log(err);
      });
    await sequelize.sync({ alter: true });
    app
      .listen(appConfig.port || 3000, () => {
        logger.info(
          `Express running at port: ${appConfig.port} -> ${appConfig.url}`
        );
      })
      .on("error", (e: any) => {
        logger.error(e);
      });
    await userService.createAdmin();
  } catch (err) {
    console.log(err);
  }
})();

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
