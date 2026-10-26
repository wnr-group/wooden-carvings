"use client";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";

const DETAILS = [
  "Hand-sanded to a silk finish",
  "Natural oils that bring out the grain",
  "Inspected before it leaves the workshop",
];

export function FinishFilm() {
  return (
    <section
      aria-labelledby="finish-title"
      className="bg-charcoal text-ivory"
    >
      <div className="mx-auto grid max-w-[1320px] gap-x-16 gap-y-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-28">
        <Reveal className="lg:col-span-7 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-walnut shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <AmbientVideo
              src="/videos/finish-detail.mp4"
              label="A hand touching the smooth surface of carved wooden panels"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:order-1">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-oak">
            The finishing touch
          </p>
          <h2
            id="finish-title"
            className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          >
            Made to be <em className="text-oak">felt</em>, not just seen
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75">
            The last stages are all about touch. Every surface is smoothed and
            polished by hand until it feels as good as it looks.
          </p>
          <ul className="mt-8 space-y-3 border-t border-ivory/15 pt-6">
            {DETAILS.map((d) => (
              <li key={d} className="flex items-center gap-3 text-sm text-ivory/85">
                <span aria-hidden="true" className="h-px w-6 bg-oak" />
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
