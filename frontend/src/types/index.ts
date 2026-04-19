export type Category = {
  id: number;
  name: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId?: number;
};

export type CategoryStat = {
  category: string;
  total: number;
  count: number;
};
