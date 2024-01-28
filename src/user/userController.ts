import express from "express";
import userService from ".";
import sequelize from "../config/dbSetup";
import mailService from "../nodeMailer";
import { sucess } from "../utils/helper/responseHelper";
import { IUser } from "./user";
import { mailOption } from "./userBusiness";

class UserController {
  async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const t = await sequelize.transaction({ autocommit: true });
    try {
      const data: IUser = req.body;
      const createUser = await userService.createUser(data, t);
      const option = mailOption(createUser);
      await mailService.sendMail(option);
      await t.commit();
      return res
        .status(200)
        .json(sucess("User Created SucessFully", {}, res.statusCode));
    } catch (err: any) {
      await t.rollback();
      next(err);
    }
  }

  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      console.log("getone");
      const id = req.params.id;
      const getUser = await userService.getUser("id", id);
      return res
        .status(200)
        .json(sucess("User found Scuessfully", getUser, res.statusCode));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async changePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      //@ts-ignore
      const id = req.user?.id ?? "";
      const getUser = await userService.changePassword(req.body, id);
      return res
        .status(200)
        .json(sucess("Password Changed Scuessfully", getUser, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
  async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const getUser = await userService.getAllUser();
      return res
        .status(200)
        .json(sucess("User listed Scuessfully", getUser, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
  async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const getUser = await userService.deleteUser(id);
      return res
        .status(200)
        .json(sucess("User Deleted Scuessfully", getUser, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
