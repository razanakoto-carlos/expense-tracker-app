import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExpense, getCategories } from "../api/expense.api";
import { useState } from "react";

function ExpenseForm({
  setFormVisible,
}: {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
  });

  function handleForm(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] }); // ← refetch
      setFormData({
        title: "",
        amount: "",
        categoryId: "",
        date: new Date().toISOString().split("T")[0],
      });
      setFormVisible(false);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate({
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      categoryId: parseInt(formData.categoryId),
    });
  }
  return (
    <div className=" bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">
        Nouvelle dépense
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="title" className="text-sm text-gray-600">
            Description
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleForm}
            value={formData.title}
            placeholder="ex : Supermarché"
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1 w-32">
          <label htmlFor="amount" className="text-sm text-gray-600">
            Montant
          </label>
          <input
            value={formData.amount}
            onChange={handleForm}
            type="number"
            id="amount"
            name="amount"
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="flex flex-col gap-1 w-40">
          <label htmlFor="category" className="text-sm text-gray-600">
            Catégorie
          </label>
          <select
            value={formData.categoryId}
            onChange={handleForm}
            id="category"
            name="categoryId"
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option>Sélectionner</option>
            {categories?.map((cat: { id: number; name: string }) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 w-36">
          <label htmlFor="date" className="text-sm text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleForm}
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
