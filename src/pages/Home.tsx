import { useEffect, useState } from "react";
import { searchMovies } from "../services/omdbApi";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  useScrollToTop(page);
const handleSearch = async (pageNumber = 1) => {
  if (query.length < 3) return;
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(query, pageNumber, type);
      if (data.Response === "True") {
        setMovies(data.Search);
      
        setPage(pageNumber);
      } else {
        setMovies([]);
        setError(data.Error || "No results found");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
  if (debouncedQuery.length >= 3) {
    handleSearch(1);
  }

  // If user clears input, show initial movies again
  if (debouncedQuery.length === 0) {
    fetchInitialMovies();
  }
}, [debouncedQuery, type]);

  const fetchInitialMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const randomPage = Math.floor(Math.random() * 5) + 1; 
      const data = await searchMovies("Marvel", randomPage);

      if (data.Response === "True") {
        setMovies(data.Search);
       
        setPage(randomPage);
      }
    } catch {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInitialMovies();
  }, []);

  return (
    <div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(1)}
        type={type}
        setType={setType}
      />

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      )}
      {error && (
        <div className="text-center mt-6">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => handleSearch(page)}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

     
    </div>
  );
}
