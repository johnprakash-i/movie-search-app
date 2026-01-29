import type { Movie } from "../types/movie";


const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}

export const searchMovies = async (
  query: string,
  page: number,
  type?: string
): Promise<SearchResponse> => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${
    type ? `&type=${type}` : ""
  }`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  Actors: string;
  Director: string;
  Runtime: string;
  imdbRating: string;
  Released: string;
  Language: string;
  Awards: string;
}

export const getMovieDetails = async (
  imdbID: string
): Promise<MovieDetails & { Response: string; Error?: string }> => {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  const res = await fetch(url);
  return res.json();
};
