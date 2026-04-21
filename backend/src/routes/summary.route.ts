import { Router } from "express";
import { getDashboard,getStat } from "../controllers/summary.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", authMiddleware, getDashboard);
router.get("/stat", authMiddleware, getStat);

export default router;
