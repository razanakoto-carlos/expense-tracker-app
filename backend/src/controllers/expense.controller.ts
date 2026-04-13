import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

export async function getExpenses(req: Request, res: Response) {
  try {
    const expense = await prisma.expense.findMany();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function createExpense(req: Request, res: Response) {
  try {
    const { title, amount, date, categoryId } = req.body;

    const dateformat = new Date(date);

    const existName = await prisma.expense.findFirst({
      where: {
        title: title,
      },
    });

    if (existName) {
      return res.status(402).json({ error: "Name already exist" });
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        date: dateformat,
        categoryId,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ status: "Expense created successfully", Expense: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getStatsByCategory(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const result = await prisma.expense.groupBy({
      by: ["categoryId"],
      where: { userId },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: "desc" } },
    });

    const withCategories = await Promise.all(
      result.map(async (item:any) => {
        const category = await prisma.category.findUnique({
          where: { id: item.categoryId },
          select: { name: true },
        });

        return {
          category: category?.name ?? "Uncategorized",
          total: item._sum.amount,
          count: item._count.id,
        };
      })
    );

    res.status(200).json(withCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    const expenseId = parseInt(req.params.expenseId);

    const existExpense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
      },
    });

    if (!existExpense) {
      return res.status(402).json({ error: "Expense doesn't exist" });
    }

    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    res.status(200).json({ status: "Expense delete successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
