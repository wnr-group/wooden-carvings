/** Shown where a real photograph of that deity has not been supplied yet. */
export function StatuePlaceholder({ label }: { label: string }) {
  return (
    <span
      role="img"
      aria-label={`${label} statue, photo coming soon`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[linear-gradient(160deg,#efe4d1,#d6bf9d)] text-walnut/70"
    >
      <span aria-hidden="true" className="font-display text-5xl leading-none">
        {label.charAt(0)}
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Photo soon</span>
    </span>
  );
}
