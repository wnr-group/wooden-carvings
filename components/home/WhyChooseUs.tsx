"use client";

import { ArrowRight, Hammer, Leaf, ShieldCheck, Truck } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoldRule, ParallaxImage } from "@/components/home/motion";
import { Reveal } from "@/components/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    icon: Hammer,
    title: "Entirely by hand",
    text: "No machines, no shortcuts. Every curve is shaped with traditional chisels and gouges by a single artisan.",
  },
  {
    icon: Leaf,
    title: "Solid, seasoned wood",
    text: "Responsibly sourced timber, naturally seasoned so each piece resists cracking and ages beautifully.",
  },
  {
    icon: ShieldCheck,
    title: "Checked at every stage",
    text: "Inspected through six stages of making, from the first rough cut to the final hand polish.",
  },
  {
    icon: Truck,
    title: "Delivered with care",
    text: "Wrapped, crated and tracked all the way to your door, with updates you can follow online.",
  },
];

const STATS = [
  { to: 100, suffix: "%", label: "Hand carved" },
  { to: 6, suffix: "", label: "Stages of craft" },
  { to: 1, suffix: "", label: "Artisan per piece" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function WhyChooseUs() {
  return (
    <section
      id="craft"
      aria-labelledby="why-title"
      className="on-dark relative overflow-hidden bg-[#241509] text-ivory [background-image:radial-gradient(ellipse_55%_50%_at_90%_0%,rgba(199,167,122,0.22),transparent_65%),radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(138,74,42,0.3),transparent_65%)]"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oak/60 to-transparent" />

      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left: story and image */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-oak">
                <span className="h-px w-10 bg-oak" /> Why Choose Us
              </p>
              <h2 id="why-title" className="mt-6 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Crafted with <em className="text-oak">devotion</em>, made to last
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
                A wooden deity is more than decoration. It is a lifetime companion for your home, so we carve every
                piece the slow way, the right way.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="relative mt-12 max-w-md">
              <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-t-full border border-oak/50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[#3a2415]">
                <ParallaxImage
                  src="/images/carving.jpg"
                  alt="A carver shaping a small wooden figure with a knife"
                  sizes="(min-width:1024px) 440px, 90vw"
                  strength={6}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#241509]/60 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="absolute -left-3 bottom-10 border border-oak/60 bg-[#241509]/90 px-5 py-4 backdrop-blur-md sm:-left-8"
              >
                <p className="font-display text-3xl leading-none text-oak">1 artisan</p>
                <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.26em] text-ivory/70">One piece, start to finish</p>
              </motion.div>
            </Reveal>
          </div>

          {/* Right: numbered features */}
          <div className="lg:col-span-7 lg:pt-6">
            <ul className="border-t border-ivory/15">
              {FEATURES.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className="group relative border-b border-ivory/15">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-oak transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                  <div className="flex gap-5 py-8 transition-transform duration-500 group-hover:translate-x-2 sm:gap-8 sm:py-10">
                    <span
                      aria-hidden="true"
                      className="w-12 shrink-0 font-display text-4xl leading-none text-transparent [-webkit-text-stroke:1px_rgb(199_167_122/0.8)] sm:w-16 sm:text-5xl"
                    >
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl leading-tight sm:text-[2rem]">{title}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/70 sm:text-base">{text}</p>
                      {i === FEATURES.length - 1 && (
                        <Link
                          href="/track"
                          className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-oak transition-colors hover:text-ivory"
                        >
                          Track an order <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                    <motion.span
                      aria-hidden="true"
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-oak/50 text-oak transition-colors group-hover:bg-oak group-hover:text-charcoal sm:flex"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Figures */}
        <div className="mt-20 lg:mt-28">
          <GoldRule className="mb-12" />
          <dl className="grid grid-cols-3 gap-4 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-5xl leading-none text-oak sm:text-7xl lg:text-8xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/70 sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
