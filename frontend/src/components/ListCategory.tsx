function ListCategory() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Dernières dépenses</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li className="flex justify-between">
          <span>Supermarché</span>
          <span className="font-medium">-25 €</span>
        </li>
        <li className="flex justify-between">
          <span>Transport</span>
          <span className="font-medium">-5 €</span>
        </li>
      </ul>
    </div>
  );
}

export default ListCategory;
