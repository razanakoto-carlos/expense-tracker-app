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

export async function createCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const existName = await prisma.category.findFirst({
      where: {
        name: name,
      },
    });

    if (existName) {
      return res.status(402).json({ error: "Name already exist" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ status: "Category created successfully", Category: category });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.categoryId);

    const existCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!existCategory) {
      return res.status(402).json({ error: "Category doesn't exist" });
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    res.status(200).json({ status: "Category delete successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
