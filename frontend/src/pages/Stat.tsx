import { useQuery } from "@tanstack/react-query";
import BarCategory from "../components/BarCategory";
import ListCategory from "../components/ListCategory";
import { getStat } from "../api/expense.api";
import ChartCategory from "../components/ChartCategory";

function Stat() {
  const {
    data: stat,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stat"],
    queryFn: getStat,
  });
  console.log(error);
  return (
    <div className="flex-1 min-h-0 bg-gray-100 px-4 flex flex-col gap-6">
      {isLoading && <p>Loading...</p>}
      <section className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center shrink-0">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Dépenses globales
        </h2>
        <div className="w-full max-w-3xl h-42">
          {isLoading && <p>Loading...</p>}
          <ChartCategory barCategory={stat?.barCategory} />
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="bg-white rounded-2xl shadow-md p-4 min-h-0 overflow-hidden">
          {isLoading && <p>Loading...</p>}
          <BarCategory perCategory={stat?.perCategory} />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 min-h-0 overflow-hidden">
          {isLoading && <p>Loading...</p>}
          <ListCategory lastExpenses={stat?.lastExpenses} />
        </div>
      </section>
    </div>
  );
}

export default Stat;
