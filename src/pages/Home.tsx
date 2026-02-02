import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../services/omdbApi";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Pagination from "../components/Pagination";

export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
const gridRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const debouncedQuery = useDebounce(query, 600);
  useScrollToTop(page);
  const handleSearch = async (pageNumber = 1) => {
    if (query.length < 3) return;
    if (!query) return;
      const maxPages = Math.ceil(totalResults / 10) || 1;
  if (pageNumber > maxPages) pageNumber = 1;
    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(query, pageNumber, type);
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(Number(data.totalResults));
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
}, [debouncedQuery, type]);



  const fetchInitialMovies = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
     
      const data = await searchMovies("Marvel", pageNumber);

      if (data.Response === "True") {
        setMovies(data.Search);
     setTotalResults(Number(data.totalResults));
        setPage(pageNumber);
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
const handlePageChange = (newPage: number) => {
  if (newPage === page) return;

  if (debouncedQuery.length >= 3) {
    handleSearch(newPage);
  } else {
    fetchInitialMovies(newPage);
  }

  // ⭐ Scroll to movie grid instead of page top
  setTimeout(() => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
};


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

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" ref={gridRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {!loading && movies.length > 0 && (
        <Pagination
          currentPage={page}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
