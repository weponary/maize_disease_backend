import express from "express";
import detectService from ".";
import sequelize from "../config/dbSetup";
import mailService from "../nodeMailer";
import { sucess } from "../utils/helper/responseHelper";
import { IDetect } from "./detect";

class DetectController {
  async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const t = await sequelize.transaction({ autocommit: true });
    try {
      if (!req.file) {
        throw {
          message: "Image is required",
          code: 422,
        };
      }
      if (!req.body.sampleName) {
        throw {
          message: "Sample name is required",
          code: 422,
        };
      }

      req.body.image = req.file.path;
      //@ts-ignore
      const userId = req.user?.id ?? "";
      const data: IDetect = req.body;
      const createUser = await detectService.createSample(data, userId, t);
      await t.commit();
      return res
        .status(200)
        .json(sucess("Detected SucessFully", createUser, res.statusCode));
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
      const id = req.params.id;
      const getUser = await detectService.getSample("id", id);
      return res
        .status(200)
        .json(sucess("User found Scuessfully", getUser, res.statusCode));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      //@ts-ignore
      const userId = req.user?.id ?? "";
      const filters = req.query;
      const getUser = await detectService.getAllSample(userId, filters);
      return res
        .status(200)
        .json(sucess("User listed Scuessfully", getUser, res.statusCode));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default DetectController;
