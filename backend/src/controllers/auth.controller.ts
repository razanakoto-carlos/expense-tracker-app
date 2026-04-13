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

    res.status(201).json(user);
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

    res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
