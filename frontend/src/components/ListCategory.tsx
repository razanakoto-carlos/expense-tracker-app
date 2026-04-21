function ListCategory({
  lastExpenses,
}: {
  lastExpenses: { id: number; title: string; amount: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Dernières dépenses</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {lastExpenses &&
          lastExpenses.map((expense) => (
            <li className="flex justify-between" key={expense.id}>
              <span>{expense.title}</span>
              <span className="font-medium">{expense.amount}€</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListCategory;
