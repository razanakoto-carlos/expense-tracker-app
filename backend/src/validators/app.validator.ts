import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const expenseSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  categoryId: Joi.number(),
});
