import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex flex-col w-64 bg-gray-900 text-gray-100 p-6 h-screen shadow-lg">
      <h1 className="text-2xl font-semibold mb-8 tracking-tight">
        Spendr
      </h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
            >
              Tableau de Bord
            </Link>
          </li>

          <li>
            <Link
              to="/expense"
              className="block px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
            >
              Dépenses
            </Link>
          </li>
          <li>
            <Link
              to="/stat"
              className="block px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
            >
              Statistiques
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;