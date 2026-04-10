import Joi from "joi";
import { type Request, type Response, type NextFunction } from "express";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e:any) => e.message) });
    }

    next();
  };
};
