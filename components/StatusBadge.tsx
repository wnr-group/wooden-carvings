import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { StageState } from "@/types/order";

interface StatusBadgeProps {
  state: StageState;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}

/** Status is conveyed by icon shape and text, never colour alone. */
export function StatusBadge({ state, label, tone = "dark", className }: StatusBadgeProps) {
  const done = state === "completed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8rem] font-medium leading-none",
        tone === "dark"
          ? done
            ? "bg-forest/10 text-forest"
            : "bg-walnut/10 text-walnut"
          : "bg-ivory/12 text-ivory",
        className,
      )}
    >
      {done ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      ) : state === "current" ? (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="soft-pulse absolute inset-0 rounded-full bg-current" />
          <span className="relative h-2 w-2 rounded-full bg-current" />
        </span>
      ) : (
        <span
          className="h-2 w-2 rounded-full border border-current"
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
