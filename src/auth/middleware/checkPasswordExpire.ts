import express from "express";
import userService from "../../user";

const checkPasswordExpire = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const username: string = req.body.username;
  const checkUser = userService.getUser("username", username);
  if (!checkUser) {
    throw {
      messgae: "User not Found",
      code: 404,
    };
  }
};
