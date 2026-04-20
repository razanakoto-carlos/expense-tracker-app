import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Expense } from "../types";
import { deleteExpense } from "../api/expense.api";

type Expenses = {
  expenses: Expense[];
};

function ExpenseList({ expenses }: Expenses) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto pr-2 space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-800">
                {expense.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              Category
            </span>
            <p className="text-sm font-medium text-gray-800">
              {expense.amount} €
            </p>
            <p className="text-xs text-gray-500">
              {new Date(expense.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => mutate(expense.id)}
              className="text-gray-400 hover:text-red-500 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
