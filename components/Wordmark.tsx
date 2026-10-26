import { cn } from "@/lib/cn";

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        tone === "dark" ? "text-charcoal" : "text-ivory",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-display text-[1.9rem] leading-none tracking-tight"
      >
        VK
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-6 w-px",
          tone === "dark" ? "bg-oak" : "bg-oak/70",
        )}
      />
      <span className="text-[0.62rem] font-medium uppercase leading-[1.35] tracking-[0.28em]">
        <span className="sr-only">VK </span>Wood
        <br />
        Carvings
      </span>
    </span>
  );
}
