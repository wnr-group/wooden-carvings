"use client";

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { FadeImage } from "@/components/FadeImage";
import { Reveal } from "@/components/Reveal";
import { products, type Category } from "@/data/products";
import { cn } from "@/lib/cn";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const pad = (n: number) => String(n).padStart(2, "0");

/** Pieces that have a real photograph. */
const FEATURED = products.filter((p) => p.src);

export function PremiumCollection({ onSelect }: { onSelect: (category: Category) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + 24 : 1;
    setActive(Math.min(FEATURED.length - 1, Math.round(el.scrollLeft / step)));
  }

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    el.scrollBy({ left: dir * ((first?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="premium-title"
      className="relative overflow-hidden bg-[#efe5d3] text-walnut [background-image:radial-gradient(ellipse_60%_70%_at_85%_10%,rgba(255,252,245,0.95),transparent_60%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(199,167,122,0.35),transparent_60%)]"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oak/60 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oak/40 to-transparent" />

      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-32">
        {/* Intro column */}
        <Reveal className="flex flex-col lg:col-span-4 lg:pr-6">
          <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-[#8a5a12]">
            <span className="h-px w-10 bg-[#8a5a12]" /> The Signature Edit
          </p>
          <h2
            id="premium-title"
            className="mt-6 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            Premium
            <br />
            <em className="text-[#9a6a2a]">Collection</em>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-strong">
            Our finest heirloom statues, each carved over weeks by a master artisan, finished by hand, and made
            to be passed down.
          </p>

          <div className="mt-10 hidden items-center gap-6 lg:flex">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous piece"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-walnut/40 text-walnut transition-colors hover:bg-walnut hover:text-ivory"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next piece"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-walnut/40 text-walnut transition-colors hover:bg-walnut hover:text-ivory"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="font-display text-3xl text-walnut" aria-live="polite">
              {pad(active + 1)}
              <span className="text-lg text-walnut/40"> / {pad(FEATURED.length)}</span>
            </p>
          </div>
          <div aria-hidden="true" className="mt-6 hidden h-px w-full max-w-xs bg-walnut/15 lg:block">
            <span
              className="block h-px bg-[#9a6a2a] transition-all duration-500"
              style={{ width: `${((active + 1) / FEATURED.length) * 100}%` }}
            />
          </div>
        </Reveal>

        {/* Pieces */}
        <div className="-mr-5 sm:-mr-8 lg:col-span-8 lg:-mr-12">
          <ul
            ref={track}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] sm:pr-8 lg:pr-12 [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[44%]"
              >
                <article className="group relative pb-14">
                  {/* Gallery print: white mat, straight edges, gold corner marks */}
                  <div className="relative bg-paper p-3 shadow-[0_30px_50px_-30px_rgb(73_53_38/0.55)] ring-1 ring-walnut/10 transition-shadow duration-500 group-hover:shadow-[0_40px_60px_-28px_rgb(73_53_38/0.7)] sm:p-4">
                    <div className="skeleton relative aspect-[4/5] overflow-hidden">
                      <FadeImage
                        src={p.src!}
                        alt={p.alt}
                        fill
                        sizes="(min-width:1024px) 340px, (min-width:640px) 46vw, 78vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#2c1b10]/30 via-transparent to-transparent" />
                      {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map((c) => (
                        <span key={c} aria-hidden="true" className={cn("absolute h-6 w-6 border-oak", c)} />
                      ))}
                      <span className="absolute left-5 top-5 bg-paper/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.26em] text-walnut backdrop-blur-sm">
                        No. {pad(i + 1)}
                      </span>
                    </div>
                  </div>

                  {/* Nameplate overlapping the print */}
                  <div className="absolute inset-x-5 bottom-0 flex items-center justify-between gap-4 bg-walnut px-5 py-4 text-ivory shadow-[0_20px_30px_-16px_rgb(23_23_20/0.6)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:inset-x-6 sm:px-6">
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-oak">{p.category}</p>
                      <h3 className="mt-1 truncate font-display text-xl leading-tight sm:text-[1.4rem]">{p.name}</h3>
                      <p className="mt-1 font-display text-lg text-oak">{inr(p.price)}</p>
                    </div>
                    <a
                      href="#collection"
                      onClick={() => onSelect(p.category)}
                      aria-label={`View ${p.name}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oak/60 text-oak transition-colors after:absolute after:inset-0 group-hover:bg-oak group-hover:text-charcoal"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-strong lg:hidden">
            Swipe to explore <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
