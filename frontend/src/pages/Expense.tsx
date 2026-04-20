import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expense.api";

function Expense() {
  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const [formVisible, setFormVisible] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold text-gray-800">Dépenses</h4>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          + Ajouter
        </button>
      </div>
      {formVisible && <ExpenseForm setFormVisible={setFormVisible}/>}
      <div className="flex-1 overflow-hidden">
        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        )}
        {expenses && <ExpenseList expenses={expenses} />}
      </div>
    </div>
  );
}

export default Expense;
