export default function MovieCardSkeleton() {
  return (
    <div className="animate-pulse bg-slate-900 rounded-xl overflow-hidden">
      <div className="h-72 bg-slate-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-3/4" />
        <div className="h-3 bg-slate-800 rounded w-1/2" />
        <div className="h-8 bg-slate-800 rounded mt-4" />
      </div>
    </div>
  );
}
