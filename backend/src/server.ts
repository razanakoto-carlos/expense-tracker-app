import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.route.js";
import expenseRouter from "./routes/expense.route.js";
import helmet from "helmet";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/expense", expenseRouter);

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
