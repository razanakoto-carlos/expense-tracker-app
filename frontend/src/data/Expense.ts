import type { Expense } from "../types";

export const mockExpenses: Expense[] = [
  { id: 1, title: "Courses supermarché", amount: 45.2, date: "2026-04-01", categoryId: 1 },
  { id: 2, title: "Transport taxi", amount: 12, date: "2026-04-02", categoryId: 2 },
  { id: 3, title: "Abonnement Netflix", amount: 9.99, date: "2026-04-03" },
  { id: 4, title: "Restaurant", amount: 28.5, date: "2026-04-04", categoryId: 3 },
  { id: 5, title: "Achat livre", amount: 15, date: "2026-04-05" },
  { id: 6, title: "Recharge mobile", amount: 5, date: "2026-04-06", categoryId: 4 },
  { id: 7, title: "Café", amount: 2.5, date: "2026-04-07" },
  { id: 8, title: "Internet mensuel", amount: 25, date: "2026-04-08", categoryId: 4 },
  { id: 9, title: "Essence", amount: 30, date: "2026-04-09", categoryId: 2 },
  { id: 10, title: "Cinéma", amount: 10, date: "2026-04-10" },
  { id: 11, title: "Fast food", amount: 8.75, date: "2026-04-11", categoryId: 3 },
  { id: 12, title: "Uber", amount: 14.2, date: "2026-04-12", categoryId: 2 },
  { id: 13, title: "Pharmacie", amount: 18, date: "2026-04-13" },
  { id: 14, title: "Vêtements", amount: 60, date: "2026-04-14", categoryId: 5 },
  { id: 15, title: "Spotify", amount: 7.99, date: "2026-04-15" },
];

export function getExpenses(): Expense[] {
  return mockExpenses;
}