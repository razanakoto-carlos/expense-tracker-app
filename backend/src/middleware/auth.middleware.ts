import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as {
      id: number;
      name: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized, Invalid Token");
  }
};
