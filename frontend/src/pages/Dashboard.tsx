import { useQuery } from "@tanstack/react-query";
import BarCategory from "../components/BarCategory";
import ListCategory from "../components/ListCategory";
import { getDashboard } from "../api/expense.api";

function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  console.log(error);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-sm text-gray-500">Vue globale de tes dépenses</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Total du mois</h2>
          {isLoading && <p>Loading...</p>}
          <p className="text-2xl font-bold text-gray-800">{data?.totalMonth}€</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Nombre de dépenses</h2>
          {isLoading && <p>Loading...</p>}
          <p className="text-2xl font-bold text-gray-800">{data?.nExpenses}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm text-gray-500">Poste principal</h2>
          {isLoading && <p>Loading...</p>}
          <p className="text-2xl font-bold text-gray-800">
            {" "}
            {data?.principalPost[0]} {data?.principalPost[1]}€
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarCategory perCategory={data?.perCategory} />
        <ListCategory lastExpenses={data?.lastExpenses} />
      </section>
    </div>
  );
}

export default Dashboard;
