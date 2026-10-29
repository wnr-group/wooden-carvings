"use client";

import Link from "next/link";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";

/**
 * The carved door-frame is three transparent cut-outs of the supplied frame art
 * (public/images/frame-*.webp): two carved pillars with corner brackets, and a
 * seamlessly tiling carved beam (the pillar frieze, mirrored). The video plays in the panel between them.
 */
export function HeroFilm() {
  return (
    <section id="top" aria-labelledby="film-title" className="bg-paper">
      <div className="relative isolate h-[clamp(17rem,42vw,38rem)] w-full overflow-hidden bg-[#f1e9de]">
        <AmbientVideo
          src="/videos/showcase.mp4"
          label="A finished hand-carved wooden sculpture in warm light"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_50%_at_50%_55%,rgba(23,15,8,0.5),transparent_75%)]"
        />

        {/* Carved beam, then the pillars on top so the corner brackets overlap it */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[1] h-[11.4%] bg-[url('/images/frame-beam.webp')] bg-repeat-x [background-size:auto_100%]"
        />
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/images/frame-left.webp"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 z-[2] h-full w-auto max-w-none"
        />
        <img
          src="/images/frame-right.webp"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 z-[2] h-full w-auto max-w-none"
        />
        {/* eslint-enable @next/next/no-img-element */}

        <div className="relative z-[3] flex h-full flex-col items-center justify-center px-[18%] pt-[6%] text-center">
          <Reveal>
            <h1
              id="film-title"
              className="font-display text-[clamp(1.5rem,5vw,4rem)] font-normal uppercase leading-tight tracking-[0.02em] text-ivory [text-shadow:0_2px_20px_rgb(0_0_0/0.7)]"
            >
              VK Door &amp; Hardwares
            </h1>
            <p className="mt-1 font-sans text-[clamp(0.6rem,1.8vw,1.15rem)] uppercase tracking-[0.34em] text-ivory [text-shadow:0_1px_12px_rgb(0_0_0/0.75)] sm:mt-3">
              Handcrafted Sculpture
            </p>
            <Link
              href="/#collection"
              className="mt-4 inline-flex h-9 items-center font-sans rounded-full border border-ivory/60 bg-walnut/90 px-6 text-[0.7rem] font-medium text-ivory transition-colors hover:bg-charcoal sm:mt-7 sm:h-12 sm:px-9 sm:text-sm"
            >
              Explore The Collection
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
