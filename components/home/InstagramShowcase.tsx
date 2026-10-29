"use client";

import { ArrowUpRight, Clapperboard } from "lucide-react";
import { motion } from "motion/react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { FadeImage } from "@/components/FadeImage";
import { GoldRule } from "@/components/home/motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

/** Set these to the real Instagram account. */
const HANDLE = "vkwoodcarvings";
const URL = `https://www.instagram.com/${HANDLE}/`;

type Tile =
  | { kind: "reel"; src: string; label: string; caption: string; className: string }
  | { kind: "photo"; src: string; alt: string; className: string };

/** DOM order matters: it drives the auto-placement of the bento grid on every screen size. */
const TILES: Tile[] = [
  { kind: "reel", src: "/videos/carver.mp4", label: "A carver shaping wood into a sculpture", caption: "Behind the carving", className: "row-span-2" },
  { kind: "photo", src: "/images/products/heirloom-mandir.webp", alt: "A hand-carved wooden mandir glowing with lamplight", className: "" },
  { kind: "photo", src: "/images/products/celestial-apsara.webp", alt: "A hand-carved wooden Apsara dancer under a spotlight", className: "" },
  { kind: "reel", src: "/videos/hands.mp4", label: "A hand moving across carved wooden panels", caption: "Feel the grain", className: "row-span-2" },
  { kind: "photo", src: "/images/products/temple-scene-wall-mount.webp", alt: "A carved wooden temple scene mounted in a living room", className: "row-span-2 lg:col-span-2 lg:row-span-1" },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramShowcase() {
  return (
    <section aria-labelledby="insta-title" className="relative overflow-hidden bg-paper">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oak/50 to-transparent" />

      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal className="text-center">
          <motion.span
            whileHover={{ rotate: 8, scale: 1.06 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#c7a77a,#8a5a12,#e9c57f,#c7a77a)] p-[2px]"
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-paper text-walnut">
              <InstagramGlyph className="h-7 w-7" />
            </span>
          </motion.span>
          <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-[#8a5a12]">Follow along</p>
          <h2
            id="insta-title"
            className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-walnut sm:text-5xl lg:text-6xl"
          >
            Visit Our <em className="text-[#9a6a2a]">Instagram</em> Profile
          </h2>
          <GoldRule className="mx-auto mt-6 w-24" />
          <a
            href={URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block font-display text-2xl text-walnut underline decoration-oak decoration-1 underline-offset-8 transition-colors hover:text-[#8a5a12]"
          >
            @{HANDLE}
          </a>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-strong">
            Watch the chisel at work, see new pieces leave the workshop, and follow every commission as it takes shape.
          </p>
        </Reveal>

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:gap-4 lg:auto-rows-[17rem] lg:grid-cols-4">
          {TILES.map((t, i) => (
            <motion.li
              key={t.src}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group relative overflow-hidden bg-[#2c1b10]", t.className)}
            >
              {t.kind === "reel" ? (
                <>
                  <AmbientVideo
                    src={t.src}
                    label={t.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1f130b]/80 via-transparent to-[#1f130b]/25" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-walnut backdrop-blur-sm sm:left-4 sm:top-4">
                    <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" /> Reel
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5">
                    <span className="block font-display text-xl leading-tight sm:text-2xl">{t.caption}</span>
                    <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.24em] text-oak">@{HANDLE}</span>
                  </span>
                </>
              ) : (
                <>
                  <div className="skeleton absolute inset-0">
                    <FadeImage
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(min-width:1024px) 40vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-[#2c1b10]/45 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <InstagramGlyph className="h-9 w-9" />
                  </span>
                </>
              )}
              {/* One link per tile, covering it */}
              <a
                href={URL}
                target="_blank"
                rel="noreferrer"
                aria-label={t.kind === "reel" ? `Watch on Instagram: ${t.caption}` : `View on Instagram: ${t.alt}`}
                className="absolute inset-0 z-10"
              />
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <a
            href={URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-walnut px-9 text-sm font-medium text-ivory shadow-[0_18px_34px_-18px_rgb(73_53_38/0.8)] transition-colors hover:bg-charcoal"
          >
            <InstagramGlyph className="h-5 w-5 text-oak" />
            Follow us on Instagram
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
