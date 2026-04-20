import { Router } from "express";
import {
  register,
  login,
  logout,
  authentificate,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validators/user.validator";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, authentificate);
router.post("/logout", authMiddleware, logout);

export default router;
