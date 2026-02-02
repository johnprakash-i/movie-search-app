interface Props {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalResults, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(totalResults / 10));
  const pages = [];
  for (let i = 1; i <= totalPages && i <= 10; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-10 flex-wrap items-center gap-2">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-slate-800/80 backdrop-blur border border-slate-700 
                   text-slate-300 hover:bg-indigo-600 hover:text-white transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ◀ Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => {
        const isActive = p === currentPage;

        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border
              ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg scale-105"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-slate-800/80 backdrop-blur border border-slate-700 
                   text-slate-300 hover:bg-indigo-600 hover:text-white transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next ▶
      </button>
    </div>
  );
}
