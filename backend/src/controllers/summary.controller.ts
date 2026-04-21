import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

export async function getDashboard(req: AuthenticatedRequest, res: Response) {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const expense = await prisma.expense.findMany({
      where: { date: { gte: startOfMonth } },
      orderBy: { date: "desc" },
      include: {
        category: {
          select: { name: true },
        },
      },
    });

    const totalMonth = expense.reduce((acc, curr) => acc + curr.amount, 0);

    const nExpenses = await prisma.expense.count({
      where: { userId: req.user.id },
    });

    const perCategory = expense.reduce(
      (acc, curr) => {
        const nom = curr.category?.name;
        if (!nom) return acc;
        acc[nom] = (acc[nom] || 0) + curr.amount;
        //   ↑ "Alimentation", "Santé"...
        return acc;
      },
      {} as Record<string, number>,
    );

    const principalPost = Object.entries(perCategory).sort(
      (a, b) => b[1] - a[1],
    )[0];

    res.json({
      totalMonth,
      nExpenses,
      principalPost,
      perCategory: Object.entries(perCategory).map(([categoryId, total]) => ({
        categoryId,
        total,
      })),
      lastExpenses: expense.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getStat(req: AuthenticatedRequest, res: Response) {
  try {

    const categories = await prisma.category.findMany({
      where: { userId: req.user.id },
    });

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const expense = await prisma.expense.findMany({
      where: { date: { gte: startOfMonth } },
      orderBy: { date: "desc" },
      include: {
        category: {
          select: { name: true },
        },
      },
    });

    const perCategory = expense.reduce(
      (acc, curr) => {
        const nom = curr.category?.name;
        if (!nom) return acc;
        acc[nom] = (acc[nom] || 0) + curr.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const barCategory = categories.map((cat) => ({
      categoryId: cat.name,
      total: perCategory[cat.name] ?? 0,                       
    }));

    res.json({
      barCategory,
      perCategory: Object.entries(perCategory).map(([categoryId, total]) => ({
        categoryId,
        total,
      })),
      lastExpenses: expense.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

