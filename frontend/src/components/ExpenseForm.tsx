function ExpenseForm() {
  return (
    <div className=" bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">
        Nouvelle dépense
      </h4>
      <form className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="title" className="text-sm text-gray-600">
            Description
          </label>
          <input
            type="text"
            id="title"
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
            type="number"
            id="amount"
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="flex flex-col gap-1 w-40">
          <label htmlFor="category" className="text-sm text-gray-600">
            Catégorie
          </label>
          <select
            id="category"
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="">Sélectionner</option>
            <option value="1">Alimentation</option>
            <option value="2">Transport</option>
            <option value="3">Loisirs</option>
            <option value="4">Abonnements</option>
            <option value="5">Autres</option>
          </select>
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