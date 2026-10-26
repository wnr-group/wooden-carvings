"use client";

import { LifeBuoy, Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { Wordmark } from "@/components/Wordmark";

const NAV = [
  { href: "#journey", label: "Progress" },
  { href: "#details", label: "Your piece" },
  { href: "#delivery", label: "Delivery" },
  { href: "#gallery", label: "Craft" },
];

export function SiteHeader({ onHelp }: { onHelp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <header className="sticky top-0 z-30 border-b border-stone/80 bg-ivory/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#status" aria-label="VK Wood Carvings, order tracking home" className="shrink-0">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-strong transition-colors hover:text-charcoal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted-strong lg:inline">
            Order tracking
          </span>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onHelp}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-stone px-4 text-sm font-medium text-walnut transition-colors hover:border-walnut hover:bg-walnut hover:text-ivory"
          >
            <LifeBuoy className="h-4 w-4" aria-hidden="true" />
            <span>Help</span>
          </motion.button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-walnut hover:bg-stone md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-oak"
      />

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-stone bg-ivory md:hidden"
        >
          <ul className="mx-auto max-w-[1320px] px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-stone last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 items-center font-display text-2xl text-charcoal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
