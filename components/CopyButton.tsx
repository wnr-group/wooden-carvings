"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CopyState = "idle" | "copied" | "failed";

function legacyCopy(text: string): boolean {
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

interface CopyButtonProps {
  value: string;
  /** Accessible name, e.g. "Copy order reference". */
  label: string;
  tone?: "dark" | "light";
  className?: string;
}

export function CopyButton({ value, label, tone = "dark", className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = legacyCopy(value);
    }
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2600);
  }

  const message =
    state === "copied"
      ? "Copied"
      : state === "failed"
        ? "Copy unavailable. Select the text to copy it."
        : "";

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
          tone === "dark"
            ? "border-stone text-walnut hover:border-walnut hover:bg-walnut hover:text-ivory"
            : "border-ivory/25 text-ivory hover:bg-ivory hover:text-walnut",
          className,
        )}
      >
        {state === "copied" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "min-w-0 text-xs font-medium",
          message ? "inline" : "sr-only",
          tone === "dark" ? "text-forest" : "text-oak",
          state === "failed" && (tone === "dark" ? "text-walnut" : "text-ivory"),
        )}
      >
        {message}
      </span>
    </span>
  );
}
