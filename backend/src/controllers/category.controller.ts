import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

export async function getCategories(req: Request, res: Response) {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}