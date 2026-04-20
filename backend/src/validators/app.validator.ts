import Joi from "joi";

export const expenseSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  categoryId: Joi.number(),
});
