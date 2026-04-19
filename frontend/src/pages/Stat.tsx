import BarCategory from "../components/BarCategory";
import ListCategory from "../components/ListCategory";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Stat() {
  const data = {
    labels: ["Food", "Transport", "Shopping"],
    datasets: [
      {
        label: "Dépenses",
        data: [300, 150, 100],
        backgroundColor: ["#4F46E5", "#22C55E", "#F59E0B"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex-1 min-h-0 bg-gray-100 px-4 flex flex-col gap-6">
      <section className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center shrink-0">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Dépenses globales
        </h2>
        <div className="w-full max-w-3xl h-48">
          <Bar data={data} />
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="bg-white rounded-2xl shadow-md p-4 min-h-0 overflow-hidden">
          <BarCategory />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 min-h-0 overflow-hidden">
          <ListCategory />
        </div>
      </section>
    </div>
  );
}

export default Stat;
