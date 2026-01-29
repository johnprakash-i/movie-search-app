import type { Movie } from "../types/movie";
import {  useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { favorites, addFavorite, removeFavorite } = useAppContext();
  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition cursor-pointer"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.Title}</h3>
        <p className="text-sm text-slate-400">{movie.Year}</p>

        <div className="flex justify-between items-center pt-2">
   

          <button
            onClick={(e) => {
              e.stopPropagation(); // 🚫 prevents card click
              isFav ? removeFavorite(movie.imdbID) : addFavorite(movie);
            }}
            className="text-sm px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            {isFav ? "Remove" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
