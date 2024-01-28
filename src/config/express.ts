import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routerConfig";
import { error } from "../utils/helper/responseHelper";
import morgan from "morgan";
import { logConfig } from "./loggerConfig";
import { logStream } from "./loggerSetup";

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.json());
app.use(
  morgan(logConfig.logMode, {
    stream: logStream,
  })
);
app.use(
  "/uploads",
  express.static("./../python_maize_disease_detection_backend/uploads")
);
app.use("/api/v1", router);

app.use((err: any, req: any, res: any, next: any) => {
  let code = 500;
  if (err.code) code = err.code;
  const errorData = error(err.message, code);
  return res.status(code).json(errorData);
});

export default app;
