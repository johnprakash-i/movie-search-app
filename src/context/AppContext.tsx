import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Movie } from "../types/movie";

interface AppContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const STORAGE_KEY = "movie_favorites";

export function AppProvider({ children }: { children: ReactNode }) {
  const isValidMovieArray = (data: unknown): data is Movie[] =>
    Array.isArray(data) && data.every((m) => "imdbID" in m);

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return isValidMovieArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // ✅ SAVE whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.find((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <AppContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
