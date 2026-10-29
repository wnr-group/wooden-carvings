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
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(243,236,226,0.8),rgba(246,241,233,0.9)_55%,rgba(250,247,242,0.96))]"
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
              className="font-display text-[clamp(1.5rem,5vw,4rem)] font-semibold uppercase leading-tight tracking-[0.02em] text-walnut"
            >
              VK Door &amp; Hardwares
            </h1>
            <p className="mt-1 text-[clamp(0.6rem,1.8vw,1.15rem)] uppercase tracking-[0.34em] text-walnut/85 sm:mt-3">
              Handcrafted Sculpture
            </p>
            <Link
              href="/#collection"
              className="mt-4 inline-flex h-9 items-center rounded-full bg-walnut px-6 text-[0.7rem] font-medium text-ivory transition-colors hover:bg-charcoal sm:mt-7 sm:h-12 sm:px-9 sm:text-sm"
            >
              Explore The Collection
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
