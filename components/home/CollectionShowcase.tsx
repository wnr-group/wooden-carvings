"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { StatuePlaceholder } from "@/components/home/StatuePlaceholder";
import { Reveal } from "@/components/Reveal";
import { ARTS, DEITIES, PRODUCT_TABS, isDeity, products } from "@/data/products";
import { cn } from "@/lib/cn";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Products revealed per page. A multiple of 2, 3 and 4 so every breakpoint ends on a full row. */
const PAGE_SIZE = 12;

type Tab = (typeof PRODUCT_TABS)[number];
type Sort = "featured" | "low" | "high";

/** Top-level groups: everything, all deities (with sub-filters), or one kind of art. */
const GROUPS = ["All", "Deities", ...ARTS] as const;

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price: low to high" },
  { value: "high", label: "Price: high to low" },
];

/**
 * "The Catalogue": a calm, uniform product grid built to scale. A sticky bar
 * holds the deity filters and sort; results animate in place and extra pages
 * load on demand. Add products in data/products.ts and this grows with them.
 */
export function CollectionShowcase({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const [sort, setSort] = useState<Sort>("featured");
  const [shown, setShown] = useState(PAGE_SIZE);
  // "All" with scope "deities" means every deity; the parent only tracks the specific tab.
  const [scope, setScope] = useState<"all" | "deities">("all");

  const group: (typeof GROUPS)[number] =
    tab === "All" ? (scope === "deities" ? "Deities" : "All") : isDeity(tab) ? "Deities" : tab;

  const results = useMemo(() => {
    let list = [...products];
    if (tab !== "All") list = products.filter((p) => p.category === tab);
    else if (scope === "deities") list = products.filter((p) => isDeity(p.category));
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [tab, scope, sort]);

  const visible = results.slice(0, shown);
  const remaining = results.length - visible.length;

  function chooseGroup(g: (typeof GROUPS)[number]) {
    setShown(PAGE_SIZE);
    setScope(g === "Deities" ? "deities" : "all");
    onTab(g === "All" || g === "Deities" ? "All" : g);
  }

  function chooseDeity(d: "All deities" | (typeof DEITIES)[number]) {
    setShown(PAGE_SIZE);
    setScope("deities");
    onTab(d === "All deities" ? "All" : d);
  }

  return (
    <section id="collection" aria-labelledby="collection-title" className="relative bg-paper">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oak/60 to-transparent" />

      <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <Reveal className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-[#8a5a12]">Our Collections</p>
          <h2
            id="collection-title"
            className="mt-5 font-display text-5xl leading-[1] tracking-tight text-walnut sm:text-6xl lg:text-7xl"
          >
            The Complete <em className="text-[#9a6a2a]">Collection</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-strong">
            Every piece is carved by hand from solid wood. Browse deities, apsaras and wall art, or see the whole range.
          </p>
        </Reveal>

        {/* Sticky filter and sort bar */}
        <div className="sticky top-[4.5rem] z-20 -mx-5 mt-14 border-y border-walnut/10 bg-paper/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-x-1 gap-y-1">
              {GROUPS.map((g) => {
                const on = group === g;
                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={on}
                    onClick={() => chooseGroup(g)}
                    className={cn(
                      "relative inline-flex min-h-11 items-center gap-1.5 px-4 text-sm transition-colors",
                      on ? "text-walnut" : "text-walnut/55 hover:text-walnut",
                    )}
                  >
                    {g}
                    {on && (
                      <motion.span
                        layoutId="filter-underline"
                        aria-hidden="true"
                        className="absolute inset-x-4 bottom-1.5 h-px bg-[#9a6a2a]"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-6 lg:justify-end">
              <p className="text-xs text-muted-strong" role="status" aria-live="polite">
                {results.length} {results.length === 1 ? "piece" : "pieces"}
              </p>
              <label className="relative inline-flex items-center">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-11 cursor-pointer appearance-none rounded-full border border-walnut/20 bg-transparent py-0 pl-5 pr-11 text-sm text-walnut transition-colors hover:border-walnut"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-walnut/60" aria-hidden="true" />
              </label>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {group === "Deities" && (
              <motion.div
                key="deity-sub"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <div role="group" aria-label="Filter by deity" className="flex flex-wrap gap-2 pt-3">
                  {(["All deities", ...DEITIES] as const).map((d) => {
                    const on = d === "All deities" ? tab === "All" : tab === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={on}
                        onClick={() => chooseDeity(d)}
                        className={cn(
                          "inline-flex min-h-9 items-center rounded-full border px-4 text-xs transition-colors",
                          on
                            ? "border-walnut bg-walnut text-ivory"
                            : "border-walnut/20 text-walnut/70 hover:border-walnut hover:text-walnut",
                        )}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        <motion.ul layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
              >
                <article className="group relative">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ece1cc]">
                    {p.src ? (
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(min-width:1280px) 290px, (min-width:1024px) 31vw, 50vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <StatuePlaceholder label={p.category} />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 flex h-11 translate-y-full items-center justify-center gap-2 bg-walnut text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ivory transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 pointer-coarse:translate-y-0"
                    >
                      Enquire <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl leading-tight text-walnut sm:text-2xl">
                        <a
                          href={`mailto:?subject=${encodeURIComponent(`Enquiry: ${p.name}`)}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {p.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#8a5a12]">{p.category}</p>
                    </div>
                    <p className="shrink-0 font-display text-lg text-walnut sm:text-xl">{inr(p.price)}</p>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-strong">No pieces in this collection yet.</p>
        )}

        {/* Load more */}
        {remaining > 0 && (
          <div className="mt-16 text-center">
            <p className="text-xs text-muted-strong">
              Showing {visible.length} of {results.length}
            </p>
            <div className="mx-auto mt-4 h-px w-40 bg-walnut/15">
              <span className="block h-px bg-[#9a6a2a]" style={{ width: `${(visible.length / results.length) * 100}%` }} />
            </div>
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-walnut px-9 text-sm font-medium text-walnut transition-colors hover:bg-walnut hover:text-ivory"
            >
              Show {Math.min(PAGE_SIZE, remaining)} more
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
