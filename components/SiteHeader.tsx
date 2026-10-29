"use client";

import { LifeBuoy, Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#collection", label: "Collection" },
  { href: "/#craft", label: "Why us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/track", label: "Track order" },
];

interface SiteHeaderProps {
  onHelp?: () => void;
  /** "overlay" floats transparent above a full-screen hero until scrolled. */
  variant?: "solid" | "overlay";
}

export function SiteHeader({ onHelp, variant = "solid" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floating = variant === "overlay" && !scrolled && !menuOpen;
  const onTrack = pathname === "/track";

  return (
    <header
      className={cn(
        "top-0 z-30 w-full transition-[background-color,border-color] duration-500",
        variant === "overlay" ? "fixed" : "sticky",
        floating
          ? "border-b border-transparent bg-transparent text-ivory"
          : "border-b border-stone/80 bg-ivory/92 text-charcoal backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="VK Wood Carvings home" className="shrink-0">
          <Wordmark tone={floating ? "light" : "dark"} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.filter((n) => n.href !== "/track").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                floating ? "text-ivory/80 hover:text-ivory" : "text-muted-strong hover:text-charcoal",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/track"
            aria-current={onTrack ? "page" : undefined}
            className={cn(
              "hidden h-11 items-center rounded-full px-6 text-sm font-medium transition-colors md:inline-flex",
              floating ? "bg-oak text-charcoal hover:bg-ivory" : "bg-walnut text-ivory hover:bg-charcoal",
              onTrack && "ring-2 ring-oak ring-offset-2 ring-offset-ivory",
            )}
          >
            Track order
          </Link>
          {onHelp && (
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
          )}
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden",
              floating ? "text-ivory hover:bg-ivory/10" : "text-walnut hover:bg-stone",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-oak"
      />

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-stone bg-ivory md:hidden">
          <ul className="mx-auto max-w-[1320px] px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-stone last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 items-center font-display text-2xl text-charcoal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
