import express from "express";
import authService from ".";
import mailService from "../nodeMailer";
import { sucess } from "../utils/helper/responseHelper";
import { resetPasswordEmailOption } from "./authBusiness";

class AuthController {
  async verifyAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token: string = req.params.token;
      const verifyAccount = await authService.verifyAccount(token);
      return res
        .status(200)
        .json(sucess("Email Verified Sucessfully", {}, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
  async fotgetPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const data = req.body.email;
      const { checkUser, token } = await authService.forgetPassword(data);
      const option = resetPasswordEmailOption(checkUser, token);
      const sendMail = await mailService.sendMail(option);
      return res
        .status(200)
        .json(sucess("Reset Password Email Send", {}, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
  async setPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token: string = req.params.token;
      const password: string = req.body.password;
      const resetPassword = await authService.changePassword(token, password);
      return res
        .status(200)
        .json(sucess("Password Changed Sucessfully", {}, res.statusCode));
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const data = req.body;
      console.log(data);
      const login = await authService.login(data);
      return res
        .status(200)
        .json(sucess("Login Sucessfully", login, res.statusCode));
    } catch (err) {
      next(err);
    }
  }

  async adminlogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const data = req.body;
      const login = await authService.adminLogin(data);
      return res
        .status(200)
        .json(sucess("Login Sucessfully", login, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
}
export default AuthController;
