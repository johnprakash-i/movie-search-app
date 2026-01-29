import { Outlet, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function MainLayout() {
  const { favorites } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-400">
            🎬 MovieFinder
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-slate-300 hover:text-white">
              Home
            </Link>

            <Link to="/favorites" className="relative text-slate-300 hover:text-white">
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-xs px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="text-center text-slate-500 text-sm py-6 border-t border-slate-800">
        © {new Date().getFullYear()} MovieFinder App
      </footer>
    </div>
  );
}
