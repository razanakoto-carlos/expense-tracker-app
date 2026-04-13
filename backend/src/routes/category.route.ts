import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller";
import { categorySchema } from "../validators/app.validator";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getCategories);
router.post("/", validate(categorySchema), createCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
