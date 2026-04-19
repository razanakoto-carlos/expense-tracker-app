import BarCategory from "../components/BarCategory";
import ListCategory from "../components/ListCategory";

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-sm text-gray-500">Vue globale de tes dépenses</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Total du mois</h2>
          <p className="text-2xl font-bold text-gray-800">0 €</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Nombre de dépenses</h2>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Poste principal</h2>
          <p className="text-2xl font-bold text-gray-800">—</p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarCategory />
        <ListCategory />
      </section>
    </div>
  );
}

export default Dashboard;
