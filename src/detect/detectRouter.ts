import express from "express";
import { authUser } from "../middleware/auth";
import validate from "../utils/validator";
import { changePasswordSchema, userSchema } from "./userValidation";
import checkAdmin from "../middleware/checkAdmin";
import DetectController from "./detectController";
import { uploadLocal } from "../config/multerConfig";

const detectController = new DetectController();

const detectRouter = express.Router();

detectRouter.post(
  "/",
  uploadLocal().single("image"),
  authUser,
  detectController.create
);
detectRouter.get("/", authUser, detectController.index);
// detectRouter.get("/:id", authUser, detectController.get);

export default detectRouter;
