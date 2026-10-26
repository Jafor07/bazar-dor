export default function CategorySkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-6">
        <div className="skeleton h-14 w-14 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <div className="skeleton ml-auto h-8 w-40" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}