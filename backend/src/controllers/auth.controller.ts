import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

interface user {
  id: number;
  name: string;
}

const generateToken = ({ id, name }: user) => {
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  }) as string;
  return token;
};

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exist" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashpassword,
      },
    });

    const token = generateToken(user);

    // Set cookie on registration (auto-login)
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Email doesn't exist" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = generateToken(user);

    // Set cookie instead of returning token
    res.cookie("authToken", token, {
      httpOnly: true,        // Can't access from JavaScript (prevents XSS)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",    // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(200).json({ 
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
}
