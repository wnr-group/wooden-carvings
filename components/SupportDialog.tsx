"use client";

import { X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Sheet } from "@/components/Sheet";

interface SupportDialogProps {
  open: boolean;
  onClose: () => void;
  reference: string;
}

export function SupportDialog({ open, onClose, reference }: SupportDialogProps) {
  const [sent, setSent] = useState(false);

  function handleClose() {
    setSent(false);
    onClose();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Sheet
      open={open}
      onClose={handleClose}
      labelledBy="support-title"
      className="m-auto w-[min(32rem,calc(100vw-2rem))] max-w-none rounded-[6px] bg-ivory p-0 text-charcoal shadow-2xl"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-strong">
              Support
            </p>
            <h2 id="support-title" className="mt-2 font-display text-3xl tracking-tight">
              We are here to help
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close support"
            className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-walnut transition-colors hover:bg-stone"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 rounded-[4px] bg-stone/70 px-4 py-3 text-sm leading-relaxed text-muted-strong">
          Prototype notice: no real contact details are connected. Messages sent
          here stay in your browser and are not delivered.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted-strong">Quote this reference:</span>
          <span className="font-medium tabular-nums">{reference}</span>
          <CopyButton value={reference} label="Copy order reference" />
        </div>

        {sent ? (
          <div
            role="status"
            className="mt-6 rounded-[4px] border border-forest/30 bg-forest/10 p-5 text-sm leading-relaxed text-forest"
          >
            Thank you. In the live version, this message would reach the VK Wood
            Carvings team along with order {reference}.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="support-message" className="text-sm font-medium">
                How can we help?
              </label>
              <textarea
                id="support-message"
                required
                rows={4}
                className="mt-2 w-full resize-none rounded-[4px] border border-stone bg-paper px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-walnut"
                placeholder="Ask about your order, delivery or finish."
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-walnut px-6 text-sm font-medium text-ivory transition-colors hover:bg-charcoal"
            >
              Send message (demo)
            </button>
          </form>
        )}
      </div>
    </Sheet>
  );
}
