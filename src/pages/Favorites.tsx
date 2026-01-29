import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useAppContext();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-indigo-400 mb-4">
          No Favorites Yet
        </h2>
        <p className="text-slate-400">
          Start adding movies to your favorites list ⭐
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-indigo-400 mb-8">
        Your Favorite Movies
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
