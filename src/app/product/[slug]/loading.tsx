export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-6">
      {/* Breadcrumb */}
      <div className="skeleton h-5 w-64" />

      {/* Summary card */}
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="skeleton h-20 w-20 shrink-0 rounded-2xl" />
          <div className="space-y-2">
            <div className="skeleton h-8 w-56" />
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-4 w-72 max-w-full" />
          </div>
        </div>
        <div className="skeleton h-32 w-full rounded-2xl sm:w-32" />
      </div>

      {/* Price details */}
      <div className="space-y-6 rounded-2xl border border-line bg-surface p-5">
        <div className="skeleton h-6 w-40" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-[102px] rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-6 w-52" />
        <div className="skeleton h-72 rounded-2xl" />
        <div className="skeleton h-6 w-40" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}