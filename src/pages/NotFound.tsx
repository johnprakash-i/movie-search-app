import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-slate-400 mb-6">Page not found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
