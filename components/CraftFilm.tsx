"use client";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";

const POINTS = [
  { value: "100%", label: "Hand carved" },
  { value: "6", label: "Stages of craft" },
  { value: "1", label: "Artisan per piece" },
];

export function CraftFilm() {
  return (
    <section
      aria-labelledby="film-title"
      className="relative isolate overflow-hidden bg-charcoal text-ivory"
    >
      <AmbientVideo
        src="/videos/showcase.mp4"
        label="A finished hand-carved wooden sculpture in warm light"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,23,20,0.88)_0%,rgba(23,23,20,0.55)_55%,rgba(23,23,20,0.2)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-charcoal/80 to-transparent"
      />

      <div className="mx-auto flex min-h-[78svh] max-w-[1320px] flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-oak">
            The craft in motion
          </p>
          <h2
            id="film-title"
            className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.02] tracking-[-0.01em]"
          >
            Every grain,
            <br />
            <em className="text-oak">shaped by hand.</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
            No machines, no shortcuts. Each piece is carved slowly from solid
            wood, so the finished work carries the mark of the artisan who made it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-ivory/20 pt-8">
            {POINTS.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="block font-display text-4xl text-ivory sm:text-5xl">
                    {p.value}
                  </span>
                  <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.2em] text-ivory/65">
                    {p.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
