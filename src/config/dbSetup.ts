import { Sequelize } from "sequelize-typescript";
import User from "../user/user";
import { databaseConfig } from "./databaseConfig";
import Detect from "../detect/detect";

const sequelize = new Sequelize({
  database: databaseConfig.databaseName,
  dialect: "postgres",
  username: databaseConfig.databaseUser,
  password: databaseConfig.databasePassword,
  port: 5432,
  logging: false,
  models: [User, Detect],
  repositoryMode: true,
  host: databaseConfig.databaseHost,
});

export default sequelize;
