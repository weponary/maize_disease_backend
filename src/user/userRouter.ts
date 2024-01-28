import express from "express";
import { authUser } from "../middleware/auth";
import validate from "../utils/validator";
import UserController from "./userController";
import { changePasswordSchema, userSchema } from "./userValidation";
import checkAdmin from "../middleware/checkAdmin";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", authUser, checkAdmin, userController.index);
userRouter.get("/:id", authUser, userController.get);
userRouter.post("/", validate(userSchema), userController.create);
userRouter.delete("/:id", authUser, checkAdmin, userController.delete);
userRouter.patch(
  "/changePassword",
  validate(changePasswordSchema),
  authUser,
  userController.changePassword
);

export default userRouter;
