import express from "express";
import validate from "../utils/validator";
import AuthController from "./authController";
import {
  forgetPasswordSechema,
  loginSchema,
  resetPasswordSchema,
} from "./authValidation";
import { authUser } from "../middleware/auth";
import checkAdmin from "../middleware/checkAdmin";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.get("/verifyEmail/:token", authController.verifyAccount);
authRouter.patch(
  "/forgetPassword",
  validate(forgetPasswordSechema),
  authController.fotgetPassword
);
authRouter.patch(
  "/resetPassword/:token",
  validate(resetPasswordSchema),
  authController.setPassword
);

authRouter.patch("/verifyUser/:token", authController.verifyAccount);

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post(
  "/admin/login",
  validate(loginSchema),
  authController.adminlogin
);

export default authRouter;
