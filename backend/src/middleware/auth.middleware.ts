import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {


  if (!req.cookies.authToken || !req.headers.authorization) {
    return res.status(401).json("Not authorized");
  }

    const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized, Invalid Token");
  }
  
};
