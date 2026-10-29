/** Instant loading skeleton for the tracking page: title, status card, references and timeline. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading your order">
      <span className="sr-only">Loading</span>

      <div className="border-b border-stone/80 bg-ivory">
        <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="skeleton h-8 w-40 rounded-sm" />
          <div className="skeleton h-11 w-28 rounded-full" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <div className="skeleton h-10 w-3/4 rounded-sm" />

        <div className="mt-8 rounded-lg border border-stone p-6">
          <div className="skeleton h-3 w-44 rounded-sm" />
          <div className="skeleton mt-4 h-8 w-2/3 rounded-sm" />
          <div className="skeleton mt-6 h-3 w-full rounded-full" />
          <div className="skeleton mt-3 h-3 w-40 rounded-sm" />
        </div>

        <div className="mt-10">
          <div className="skeleton h-7 w-56 rounded-sm" />
          <div className="mt-5 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[3/4] w-full rounded-sm" />
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="skeleton h-7 w-48 rounded-sm" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
              <div className="flex-1 rounded-lg border border-stone p-5">
                <div className="skeleton h-5 w-2/3 rounded-sm" />
                <div className="skeleton mt-3 h-3 w-32 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
