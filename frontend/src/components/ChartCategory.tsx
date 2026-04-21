import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS = [
  "#4F46E5", // Alimentation
  "#22C55E", // Transport
  "#F59E0B", // Logement
  "#EF4444", // Santé
  "#8B5CF6", // Loisirs
  "#EC4899", // Shopping
  "#14B8A6", // Autre
];

type CategoryItem = {
  categoryId: string;
  total: number;
};

type Props = {
  barCategory?: CategoryItem[];
};

function ChartCategory({ barCategory }: Props) {
  if (!barCategory || barCategory.length === 0) {
    return <p>Aucune donnée</p>;
  }
  const labels = barCategory.map((item) => item.categoryId);
  const amounts = barCategory.map((item) => item.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dépenses du mois",
        data: amounts,
        backgroundColor: COLORS.slice(0, labels.length),
        borderRadius: 6,
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default ChartCategory;