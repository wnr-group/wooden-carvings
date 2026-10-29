"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { MotionConfig } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FadeImage } from "@/components/FadeImage";
import { HeroFilm } from "@/components/home/HeroFilm";
import { BackToTop, Float, GoldRule, ParallaxImage, ScrollMarquee } from "@/components/home/motion";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { StatuePlaceholder } from "@/components/home/StatuePlaceholder";
import { PremiumCollection } from "@/components/home/PremiumCollection";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CATEGORY_ARCHES, PRODUCT_TABS } from "@/data/products";
import { cn } from "@/lib/cn";




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
      <GoldRule className="mx-auto mt-4 w-24" />
    </h2>
  );
}


export function HomeExperience() {
  const [tab, setTab] = useState<(typeof PRODUCT_TABS)[number]>("All");

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
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
                  <Float from={i % 2 ? -16 : 16} to={i % 2 ? 16 : -16}>
                  <a
                    href="#collection"
                    onClick={() => setTab(c.label)}
                    aria-label={`View ${c.label} statues`}
                    className="group block text-center"
                  >
                    <span className="relative block rounded-t-full border border-oak/70 p-1.5 shadow-[0_24px_40px_-26px_rgb(73_53_38/0.7)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-walnut group-hover:shadow-[0_34px_50px_-24px_rgb(73_53_38/0.75)]">
                      <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-[#e9dcc6]">
                        {c.src ? (
                          <ParallaxImage
                            src={c.src}
                            alt=""
                            sizes="(min-width:1024px) 200px, 40vw"
                            strength={6}
                            className="transition-transform duration-700 group-hover:scale-[1.07]"
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
                  </Float>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <PremiumCollection onSelect={setTab} />

        <CollectionShowcase tab={tab} onTab={setTab} />

        <WhyChooseUs />

        <ScrollMarquee words={["Hand carved", "Solid wood", "Heirloom quality", "Made to last"]} />

        <ReviewsMarquee />

        {/* Instagram */}
        <section aria-labelledby="insta-title" className="bg-paper">
          <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <Reveal>
              <SectionTitle id="insta-title">Visit Our Instagram Profile</SectionTitle>
            </Reveal>
            <ul className="mt-12 grid auto-rows-[9rem] grid-cols-4 gap-3 sm:auto-rows-[12rem] lg:auto-rows-[15rem]">
              {INSTA.map((t, i) => (
                <li key={i} className={cn("group relative overflow-hidden rounded-[4px] bg-stone", t.cls)}>
                  <ParallaxImage src={t.src} alt="" sizes="(min-width:1024px) 25vw, 50vw" strength={7} className="transition-transform duration-700 group-hover:scale-105" />
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
        <section aria-labelledby="faq-title" className="relative overflow-clip bg-[linear-gradient(180deg,#f3ebdd,#ece1cc)] text-walnut">
          <div className="mx-auto grid max-w-[1320px] items-start gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
            <div className="lg:col-span-7">
              <h2 id="faq-title" className="font-display text-3xl uppercase tracking-[0.14em] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 divide-y divide-walnut/15 border-y border-walnut/15">
                {FAQS.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-[#8a5a12] transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-strong">{f.a}</p>
                  </details>
                ))}
              </div>
              <Link href="/track" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-walnut hover:text-[#8a5a12]">
                Already ordered? Track your piece <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            {/* Pinned and still: the accordion changes height, this must not move with it */}
            <div className="hidden lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:block">
              <div className="skeleton relative aspect-[4/5] overflow-hidden rounded-t-full border-2 border-oak">
                <FadeImage
                  src="/images/faq-artisan.webp"
                  alt="A woodcarver's hands shaping the face of a wooden deity statue with a chisel and mallet"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#2c1b10]/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />

      <SiteFooter />
    </MotionConfig>
  );
}
