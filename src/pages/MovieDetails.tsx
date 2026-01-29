import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieDetails,
  type MovieDetails as MovieDetailsType,
} from "../services/omdbApi";
import { useAppContext } from "../context/AppContext";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function MovieDetails() {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useAppContext();
const navigate=useNavigate()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isFav = favorites.some((m) => m.imdbID === id);
  useScrollToTop(id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id!);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading movie details...</p>;
if (error)
  return (
    <div className="text-center mt-10">
      <p className="text-red-400 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Retry
      </button>
    </div>
  );

  if (!movie) return null;

  return (
      <div className="max-w-5xl mx-auto">
    {/* 🔙 Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-6 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
    >
      ← Back
    </button>

    <div className="grid md:grid-cols-3 gap-10">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="rounded-xl shadow-lg w-full"
      />

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-4xl font-bold text-indigo-400">{movie.Title}</h1>

        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span>{movie.Year}</span>
          <span>•</span>
          <span>{movie.Runtime}</span>
          <span>•</span>
          <span>{movie.Genre}</span>
        </div>

        <p className="text-slate-300 leading-relaxed">{movie.Plot}</p>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="text-slate-400">Director:</span> {movie.Director}
          </p>
          <p>
            <span className="text-slate-400">Actors:</span> {movie.Actors}
          </p>
          <p>
            <span className="text-slate-400">Language:</span> {movie.Language}
          </p>
          <p>
            <span className="text-slate-400">Released:</span> {movie.Released}
          </p>
          <p>
            <span className="text-slate-400">Awards:</span> {movie.Awards}
          </p>
          <p>
            <span className="text-slate-400">IMDb Rating:</span> ⭐{" "}
            {movie.imdbRating}
          </p>
        </div>

        <button
          onClick={() =>
            isFav
              ? removeFavorite(movie.imdbID)
              : addFavorite({
                  imdbID: movie.imdbID,
                  Title: movie.Title,
                  Year: movie.Year,
                  Poster: movie.Poster,
                  Type: movie.Type,
                })
          }
          className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
    </div>
  );
}
