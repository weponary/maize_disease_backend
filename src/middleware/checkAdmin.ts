import express from "express";
import User from "../user/user";
import userService from "../user";

const checkAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    //@ts-ignore
    const id = req.user.id;
    const checkUser = await userService.getUser("id", id);
    if (!checkUser) {
      throw {
        code: 404,
        message: "User not found",
      };
    }
    if (checkUser.role !== "admin") {
      throw {
        code: 402,
        message: "Unauthorized",
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default checkAdmin;
