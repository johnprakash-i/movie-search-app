interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  type: string;
  setType: (value: string) => void;
}

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  type,
  setType,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      <button
        onClick={onSearch}
        className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  );
}
