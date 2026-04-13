import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getStatsByCategory,
} from "../controllers/expense.controller";
import { expenseSchema } from "../validators/app.validator";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getExpenses);
router.get("/stats/category", getStatsByCategory);
router.post("/", validate(expenseSchema), createExpense);
router.delete("/:expenseId", deleteExpense);

export default router;
