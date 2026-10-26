"use client";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";

export function ProcessFilm() {
  return (
    <section
      aria-labelledby="process-title"
      className="border-t border-stone bg-ivory"
    >
      <div className="mx-auto grid max-w-[1320px] gap-x-16 gap-y-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-28">
        <Reveal className="lg:col-span-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-strong">
            In the workshop
          </p>
          <h2
            id="process-title"
            className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          >
            From solid wood to <em className="text-walnut">finished form</em>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-strong">
            Watch the chisel at work. Every cut is made by hand, which is why
            no two pieces are ever exactly alike.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-[2px] bg-charcoal shadow-[0_30px_60px_-30px_rgba(23,23,20,0.45)]">
              <AmbientVideo
                src="/videos/carving-process.mp4"
                label="An artisan carving a sculpture from solid wood"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-strong">
              <span className="shrink-0 whitespace-nowrap uppercase tracking-[0.2em]">Plate II</span>
              <span>Our artisans at work</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
