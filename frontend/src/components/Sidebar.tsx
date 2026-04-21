import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getMe, logout } from "../api/expense.api";

function Sidebar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  const user = data?.user;

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return (
    <aside className="flex flex-col w-64 bg-gray-900 text-gray-100 p-6 h-screen shadow-lg">
      <h1 className="text-2xl font-semibold mb-8 tracking-tight">Spendr</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
            >
              <img
                src="/dashboard-icon.svg"
                alt=""
                className="w-5 h-5 brightness-0 invert"
              />
              Tableau de Bord
            </Link>
          </li>
          <li>
            <Link
              to="/expense"
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
            >
              <img
                src="/expense-icon.svg"
                alt=""
                className="w-5 h-5 brightness-0 invert"
              />
              Dépenses
            </Link>
          </li>
          <li>
            <Link
              to="/stat"
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
            >
              <img
                src="/stat-icon.svg"
                alt=""
                className="w-5 h-5 brightness-0 invert"
              />
              Statistiques
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        {isLoading && <p className="text-sm text-gray-400">Loading...</p>}
        {user && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-800/50">
            {/* Avatar initiale + infos */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="18" fill="#059669" />
                  <text
                    x="18"
                    y="23"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="500"
                    fill="white"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </text>
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-gray-900 rounded-full" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">
                  {user.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {user.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => mutate()}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-700 transition"
              title="Se déconnecter"
            >
              <img
                src="/logout-icon.svg"
                alt="logout"
                className="w-5 h-5 opacity-60 hover:opacity-100 brightness-0 invert"
              />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
