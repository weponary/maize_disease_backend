import express from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";
import { IPayloadUser } from "../types/custom";
const authUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = commonAuth(req, res);
    //@ts-ignore
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
const commonAuth = (req: express.Request, res: express.Response) => {
  const autherizationHeader = req.header("Authorization");
  if (!autherizationHeader) {
    throw {
      message: "No Authorization Token",
      code: 401,
    };
  }
  const splitAutherizationHeader = autherizationHeader.split(" ");
  const bearer = splitAutherizationHeader[0];
  const token = splitAutherizationHeader[1];
  if (bearer !== "Bearer") {
    throw {
      message: "Token must be of Bearerr",
      code: 401,
    };
  }
  if (!token) {
    throw {
      message: "Token not founds",
      code: 401,
    };
  }

  console.log(token);

  const jwtData = jwt.verify(token, jwtConfig.access.secret) as IPayloadUser;

  if (!jwtData) {
    throw {
      message: "Unauthorized",
      code: 401,
    };
  }
  return jwtData;
};

export { authUser };
