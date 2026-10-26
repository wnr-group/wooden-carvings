"use client";

import { FlaskConical, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { orders } from "@/data/orders";
import { cn } from "@/lib/cn";
import type { Order } from "@/types/order";

interface DemoSwitcherProps {
  value: Order["id"];
  onChange: (id: Order["id"]) => void;
}

/** Prototype-only control for reviewers. Not part of the customer experience. */
export function DemoSwitcher({ value, onChange }: DemoSwitcherProps) {
  const [open, setOpen] = useState(false);
  const letters = ["A", "B", "C"];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)]">
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          role="group"
          aria-label="Prototype preview: choose a sample order"
          className="w-[17.5rem] rounded-[10px] border border-stone bg-paper p-4 shadow-[0_12px_40px_-12px_rgb(23_23_20/0.35)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-muted-strong">
                Prototype preview
              </p>
              <p className="mt-1 text-xs leading-snug text-muted-strong">
                Sample orders for reviewers. Not shown to customers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close preview controls"
              className="-mr-1 -mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-walnut hover:bg-stone"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {orders.map((order, i) => {
              const selected = order.id === value;
              return (
                <button
                  key={order.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange(order.id)}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-[6px] border px-3 text-left text-sm transition-colors",
                    selected
                      ? "border-walnut bg-walnut text-ivory"
                      : "border-stone text-charcoal hover:border-walnut",
                  )}
                >
                  <span className="font-display text-lg leading-none">{letters[i]}</span>
                  <span>{order.demoLabel}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-stone bg-paper px-4 text-xs font-medium text-walnut shadow-[0_8px_24px_-10px_rgb(23_23_20/0.35)] transition-colors hover:border-walnut"
        >
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
          Demo preview
        </motion.button>
      )}
    </div>
  );
}
