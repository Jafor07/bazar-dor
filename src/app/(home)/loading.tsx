export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
      {/* Hero */}
      <div className="flex items-center justify-between gap-8 rounded-3xl border border-line bg-surface p-8">
        <div className="w-full max-w-xl space-y-4">
          <div className="skeleton h-7 w-48 rounded-full" />
          <div className="skeleton h-10 w-full max-w-md" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-10 w-36" />
        </div>
        <div className="skeleton hidden h-[263px] w-[315px] shrink-0 md:block" />
      </div>

      {/* Two product sections */}
      {[0, 1].map((section) => (
        <section key={section}>
          <div className="skeleton mb-4 h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-[132px] rounded-2xl" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}