/** Instant loading skeleton for the homepage: mirrors the hero, deity arches and product grid. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading the homepage">
      <span className="sr-only">Loading</span>

      {/* Header */}
      <div className="border-b border-stone/80 bg-ivory">
        <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="skeleton h-8 w-40 rounded-sm" />
          <div className="hidden items-center gap-8 md:flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-3 w-16 rounded-sm" />
            ))}
          </div>
          <div className="skeleton h-11 w-28 rounded-full" />
        </div>
      </div>

      {/* Hero */}
      <div className="skeleton h-[min(calc(100vw/1.75),88svh)] min-h-[15rem] w-full" />

      {/* Deity arches */}
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto flex flex-col items-center gap-4">
          <div className="skeleton h-3 w-40 rounded-sm" />
          <div className="skeleton h-12 w-72 rounded-sm sm:w-96" />
        </div>
        <div className="mt-14 grid grid-cols-3 gap-5 lg:grid-cols-6 lg:gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="skeleton aspect-[3/4] w-full rounded-t-full" />
              <div className="skeleton h-5 w-20 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[4/5] w-full" />
              <div className="mt-4 flex justify-between gap-4">
                <div className="skeleton h-5 w-2/3 rounded-sm" />
                <div className="skeleton h-5 w-16 rounded-sm" />
              </div>
              <div className="skeleton mt-2 h-3 w-20 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
