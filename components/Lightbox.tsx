"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { KeyboardEvent } from "react";
import { Sheet } from "@/components/Sheet";
import type { GalleryItem } from "@/types/order";

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

const iconBtn =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 bg-charcoal/40 text-ivory transition-colors hover:bg-ivory hover:text-charcoal";

export function Lightbox({ items, index, onChange, onClose }: LightboxProps) {
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  function go(delta: number) {
    if (index === null) return;
    onChange((index + delta + items.length) % items.length);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      labelledBy="lightbox-title"
      onKeyDown={onKeyDown}
      className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-charcoal p-0 text-ivory"
    >
      {item && index !== null && (
        <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
            <p className="text-sm tabular-nums text-ivory/75" aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Close gallery" className={iconBtn}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                className="absolute inset-x-14 inset-y-0 sm:inset-x-24"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  quality={75}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className={`${iconBtn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-6`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className={`${iconBtn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-6`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mx-auto w-full max-w-3xl px-5 py-5 text-center sm:py-6">
            <h2 id="lightbox-title" className="font-display text-2xl sm:text-3xl">
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-ivory/80">{item.caption}</p>
            <p className="mt-2 text-xs text-ivory/60">
              Illustrative photograph, not your order.{" "}
              <a
                href={item.credit.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-ivory"
              >
                {item.credit.author}
              </a>
              ,{" "}
              <a
                href={item.credit.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-ivory"
              >
                {item.credit.license}
              </a>
            </p>
          </div>
        </div>
      )}
    </Sheet>
  );
}
