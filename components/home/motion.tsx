"use client";

import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FadeImage } from "@/components/FadeImage";
import { cn } from "@/lib/cn";

/** Image that drifts slowly inside its frame as the page scrolls. Fills a `relative` parent. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  strength = 8,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className="skeleton absolute inset-0 overflow-hidden">
      <motion.div
        style={reduce ? undefined : { y, scale: 1 + (strength * 2) / 100 + 0.02 }}
        className="absolute inset-0"
      >
        <FadeImage src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", className)} />
      </motion.div>
    </div>
  );
}

/** Moves its children vertically at a different pace to the page (px, start to end of viewport pass). */
export function Float({
  children,
  from = 24,
  to = -24,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Gold hairline that draws itself outward when scrolled into view. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("block h-px origin-center bg-gradient-to-r from-transparent via-oak to-transparent", className)}
    />
  );
}

/** Slim brand band whose text slides sideways as you scroll. */
export function ScrollMarquee({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);
  const row = [...words, ...words, ...words];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="overflow-hidden border-y border-oak/30 bg-ivory py-5 sm:py-7"
    >
      <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center gap-8 whitespace-nowrap sm:gap-12">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            <span className="font-display text-4xl uppercase tracking-[0.12em] text-walnut/85 sm:text-6xl">{w}</span>
            <span className="h-2 w-2 rotate-45 bg-oak" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Floating button that appears after scrolling and glides back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-oak/60 bg-walnut text-oak shadow-[0_14px_30px_-10px_rgb(23_23_20/0.6)] transition-colors hover:bg-oak hover:text-charcoal sm:right-8"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
