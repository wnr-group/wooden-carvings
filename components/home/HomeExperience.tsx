"use client";

import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Hammer, Leaf, ShieldCheck, Star, Truck } from "lucide-react";
import { MotionConfig } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { HeroFilm } from "@/components/home/HeroFilm";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { Wordmark } from "@/components/Wordmark";
import { galleryItems } from "@/data/gallery";
import { CATEGORY_ARCHES, PRODUCT_TABS, products } from "@/data/products";
import { cn } from "@/lib/cn";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const WHY = [
  { icon: Hammer, title: "Hand carved", text: "Every detail shaped by a master artisan." },
  { icon: Leaf, title: "Solid wood", text: "Seasoned timber that ages beautifully." },
  { icon: ShieldCheck, title: "Quality assured", text: "Inspected at every stage of making." },
  { icon: Truck, title: "Safe delivery", text: "Protectively packed and tracked." },
];

const REVIEWS = [
  { name: "Sample reviewer", text: "The carving detail is extraordinary. It feels like a piece with a soul, and the finish is flawless." },
  { name: "Sample reviewer", text: "Loved following each stage of the making. The packaging was careful and the idol arrived perfectly." },
  { name: "Sample reviewer", text: "Beautiful craftsmanship and warm, responsive service from start to finish." },
];

const FAQS = [
  { q: "How long does a carved piece take to make?", a: "Most pieces take several weeks, depending on size and detail. You can follow every stage on the tracking page." },
  { q: "Can I commission a custom design?", a: "Yes. Share reference images and our artisans will carve your piece from them." },
  { q: "How is my order packed and delivered?", a: "Each piece is wrapped and crated for protection and shipped with a tracking reference." },
  { q: "What wood do you use?", a: "Solid, seasoned hardwood chosen for its grain and long life." },
];

const INSTA = [
  { src: "/images/deities/lakshmi.webp", cls: "row-span-2" },
  { src: "/images/deities/hanuman.webp", cls: "row-span-2" },
  { src: "/images/deities/krishna.webp", cls: "row-span-2" },
  { src: "/images/deities/buddha.webp", cls: "row-span-2" },
];

/** Shown where a real photograph of that deity has not been supplied yet. */
function StatuePlaceholder({ label }: { label: string }) {
  return (
    <span
      role="img"
      aria-label={`${label} statue, photo coming soon`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[linear-gradient(160deg,#efe4d1,#d6bf9d)] text-walnut/70"
    >
      <span aria-hidden="true" className="font-display text-5xl leading-none">
        {label.charAt(0)}
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.2em]">Photo soon</span>
    </span>
  );
}

function SectionTitle({ children, id, light }: { children: React.ReactNode; id: string; light?: boolean }) {
  return (
    <h2
      id={id}
      className={cn(
        "text-center font-display text-3xl uppercase tracking-[0.14em] sm:text-4xl",
        light ? "text-ivory" : "text-walnut",
      )}
    >
      {children}
      <span className="mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-transparent via-oak to-transparent" />
    </h2>
  );
}

function Stars() {
  return (
    <span className="flex gap-1 text-oak" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

function ProductCard({ p, compact }: { p: (typeof products)[number]; compact?: boolean }) {
  return (
    <article className="group rounded-[6px] border border-stone bg-paper p-3 transition-shadow hover:shadow-[0_18px_40px_-18px_rgb(73_53_38/0.5)]">
      <div className={cn("relative overflow-hidden rounded-[4px] bg-stone", compact ? "aspect-[3/4]" : "aspect-[4/5]")}>
        {p.src ? (
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width:1024px) 260px, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <StatuePlaceholder label={p.category} />
        )}
      </div>
      <h3 className="mt-3 font-display text-lg leading-tight text-charcoal">{p.name}</h3>
      <p className="mt-1 text-sm font-medium text-walnut">{inr(p.price)}</p>
    </article>
  );
}

function PremiumCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.8), behavior: "smooth" });
  const items = products.slice(0, 6);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous pieces"
        onClick={() => scroll(-1)}
        className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-walnut shadow-lg transition-colors hover:bg-walnut hover:text-ivory sm:flex lg:-left-5"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <ul ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p) => (
          <li key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[34%] lg:w-[22.5%]">
            <ProductCard p={p} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="Next pieces"
        onClick={() => scroll(1)}
        className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-walnut shadow-lg transition-colors hover:bg-walnut hover:text-ivory sm:flex lg:-right-5"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function HomeExperience() {
  const [tab, setTab] = useState<(typeof PRODUCT_TABS)[number]>("All");
  const visible = tab === "All" ? products : products.filter((p) => p.category === tab);

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <HeroFilm />

        {/* Shop by deity */}
        <section
          aria-labelledby="deity-title"
          className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#f3e9d8,transparent),linear-gradient(180deg,#faf6ee,#f3ece0)]"
        >
          <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-24">
            <Reveal className="text-center">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-oak">Divine Collection</p>
              <h2 id="deity-title" className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-walnut sm:text-5xl lg:text-6xl">
                Shop by <em className="text-oak">deity</em>
              </h2>
              <span aria-hidden="true" className="mx-auto mt-6 flex items-center justify-center gap-3 text-oak">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-oak" />
                <span className="h-1.5 w-1.5 rotate-45 bg-oak" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-oak" />
              </span>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-strong">
                Each sacred form is carved by hand from a single block of seasoned wood.
              </p>
            </Reveal>

            <ul className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] sm:gap-6 lg:grid lg:grid-cols-6 lg:gap-7 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {CATEGORY_ARCHES.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.07} className="w-[42%] shrink-0 snap-center sm:w-[26%] lg:w-auto">
                  <a
                    href="#collection"
                    onClick={() => setTab(c.label)}
                    aria-label={`View ${c.label} statues`}
                    className="group block text-center"
                  >
                    <span className="relative block rounded-t-full border border-oak/70 p-1.5 shadow-[0_24px_40px_-26px_rgb(73_53_38/0.7)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-walnut group-hover:shadow-[0_34px_50px_-24px_rgb(73_53_38/0.75)]">
                      <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-[#e9dcc6]">
                        {c.src ? (
                          <Image
                            src={c.src}
                            alt=""
                            fill
                            sizes="(min-width:1024px) 200px, 40vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                          />
                        ) : (
                          <StatuePlaceholder label={c.label} />
                        )}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#2c1b10]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </span>
                    </span>
                    <span className="mt-5 block font-display text-2xl leading-none text-walnut">{c.label}</span>
                    <span className="mx-auto mt-3 block h-px w-8 bg-oak transition-all duration-500 group-hover:w-16" />
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-muted-strong opacity-80 transition-colors group-hover:text-walnut">
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Premium collection */}
        <section aria-labelledby="premium-title" className="bg-stone/60">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <Reveal>
              <SectionTitle id="premium-title">Premium Collection</SectionTitle>
            </Reveal>
            <div className="mt-12">
              <PremiumCarousel />
            </div>
          </div>
        </section>

        {/* Tabbed collection */}
        <section id="collection" aria-labelledby="collection-title" className="bg-ivory">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <Reveal>
              <SectionTitle id="collection-title">Our Collections</SectionTitle>
            </Reveal>
            <div className="mt-10 rounded-[8px] bg-paper p-4 shadow-[0_30px_60px_-30px_rgb(73_53_38/0.35)] sm:p-6">
              <div role="tablist" aria-label="Collections" className="mb-6 flex gap-2 overflow-x-auto rounded-[6px] bg-walnut p-2 [scrollbar-width:none]">
                {PRODUCT_TABS.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    type="button"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "h-10 shrink-0 rounded-[4px] px-5 text-sm transition-colors",
                      tab === t ? "bg-oak font-medium text-charcoal" : "text-ivory/80 hover:text-ivory",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {visible.map((p) => (
                  <li key={p.id}>
                    <ProductCard p={p} compact />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center text-xs text-muted-strong">
                Sample catalogue. Photographs of each deity statue will be added.
              </p>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section
          id="craft"
          aria-labelledby="why-title"
          className="on-dark relative bg-[#2c1b10] text-ivory [background-image:radial-gradient(circle_at_1px_1px,rgb(199_167_122/0.14)_1px,transparent_0),linear-gradient(180deg,#38241a,#2c1b10)] [background-size:22px_22px,100%_100%]"
        >
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <Reveal>
              <SectionTitle id="why-title" light>
                Why Choose Us
              </SectionTitle>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {WHY.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 0.07} className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-oak/50 text-oak">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl">{title}</h3>
                  <p className="mx-auto mt-1 max-w-[16rem] text-sm leading-relaxed text-ivory/70">{text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" aria-labelledby="reviews-title" className="bg-ivory">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <Reveal>
              <SectionTitle id="reviews-title">What Our Customers Say</SectionTitle>
            </Reveal>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <Reveal as="li" key={i} delay={i * 0.08} className="rounded-[8px] border border-stone bg-paper p-7 shadow-[0_20px_40px_-28px_rgb(73_53_38/0.5)]">
                  <Stars />
                  <p className="mt-4 text-sm leading-relaxed text-muted-strong">{r.text}</p>
                  <p className="mt-5 flex items-center justify-between text-sm font-medium text-walnut">
                    {r.name}
                    <span className="text-xs font-normal text-muted">Google review</span>
                  </p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-muted-strong">Sample reviews. Replace with verified customer reviews.</p>
          </div>
        </section>

        {/* Instagram */}
        <section aria-labelledby="insta-title" className="bg-paper">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <Reveal>
              <SectionTitle id="insta-title">Visit Our Instagram Profile</SectionTitle>
            </Reveal>
            <ul className="mt-12 grid auto-rows-[9rem] grid-cols-4 gap-3 sm:auto-rows-[12rem] lg:auto-rows-[15rem]">
              {INSTA.map((t, i) => (
                <li key={i} className={cn("group relative overflow-hidden rounded-[4px] bg-stone", t.cls)}>
                  <Image src={t.src} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-walnut px-8 text-sm font-medium text-ivory transition-colors hover:bg-charcoal"
              >
                Follow us <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="on-dark relative overflow-hidden bg-[#2c1b10] text-ivory">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
            <div className="lg:col-span-7">
              <h2 id="faq-title" className="font-display text-3xl uppercase tracking-[0.14em] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 divide-y divide-ivory/15 border-y border-ivory/15">
                {FAQS.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-oak transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/70">{f.a}</p>
                  </details>
                ))}
              </div>
              <Link href="/track" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-oak hover:text-ivory">
                Already ordered? Track your piece <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-t-full border-2 border-oak/50 lg:col-span-4 lg:col-start-9 lg:block">
              <Image src="/images/product.jpg" alt="A traditional dark wooden Ganesha sculpture" fill sizes="380px" className="object-cover" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="on-dark bg-[#1d120a] text-ivory">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-12">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
              Heirloom wood carvings, shaped slowly by hand.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-oak">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li><Link href="/" className="hover:text-ivory">Home</Link></li>
              <li><Link href="/#collection" className="hover:text-ivory">Collection</Link></li>
              <li><Link href="/#craft" className="hover:text-ivory">Why choose us</Link></li>
              <li><Link href="/track" className="hover:text-ivory">Track order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-oak">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li>Phone: +00 00000 00000 (placeholder)</li>
              <li>Email: hello@example.com (placeholder)</li>
              <li>Address: Workshop address to be added</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-[1320px] border-t border-ivory/15 px-5 py-6 text-xs text-ivory/60 sm:px-8 lg:px-12">
          <details>
            <summary className="cursor-pointer text-ivory/75 hover:text-ivory">Photo credits</summary>
            <ul className="mt-3 space-y-1.5">
              {galleryItems.map((g) => (
                <li key={g.id}>
                  {g.title}:{" "}
                  <a href={g.credit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ivory">
                    {g.credit.author}
                  </a>
                  , via Wikimedia Commons,{" "}
                  <a href={g.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ivory">
                    {g.credit.license}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <p className="mt-4">&copy; 2026 VK Wood Carvings (prototype)</p>
        </div>
      </footer>
    </MotionConfig>
  );
}
