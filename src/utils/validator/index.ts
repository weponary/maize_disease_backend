import { ZodTypeAny } from "zod";
import Express from "express";
import { validation } from "../helper/responseHelper";
const validate =
  (schema: ZodTypeAny) =>
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (err) {
      return res.status(422).json(validation(err));
    }
  };

export default validate;
