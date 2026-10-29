/**
 * Shown where a real photograph has not been supplied yet.
 * `ornate` draws a carved mandala motif for large feature cards. The default is a quiet initial.
 */
export function StatuePlaceholder({ label, ornate = false }: { label: string; ornate?: boolean }) {
  return (
    <span
      role="img"
      aria-label={`${label}, photo coming soon`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[linear-gradient(160deg,#f3e8d4,#d9c3a1)] text-walnut/70"
    >
      {ornate && (
        <>
          <svg viewBox="0 0 120 120" aria-hidden="true" className="relative h-[46%] w-[46%] text-[#9a6a2a]/80">
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <circle cx="60" cy="60" r="56" strokeWidth="1" />
              <circle cx="60" cy="60" r="44" strokeWidth="1.4" />
              <circle cx="60" cy="60" r="12" strokeWidth="1.6" />
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="60" cy="33" rx="6" ry="16" strokeWidth="1.2" transform={`rotate(${i * 30} 60 60)`} />
              ))}
            </g>
          </svg>
        </>
      )}
      {!ornate && (
        <span aria-hidden="true" className="font-display text-5xl leading-none">
          {label.charAt(0)}
        </span>
      )}
      <span className="relative text-[0.6rem] uppercase tracking-[0.2em]">Photo soon</span>
    </span>
  );
}
