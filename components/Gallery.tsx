"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types/order";

const ASPECT: Record<GalleryItem["aspect"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="border-t border-stone bg-ivory"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-strong">
              Craftsmanship
            </p>
            <h2
              id="gallery-title"
              className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
            >
              The craft behind every piece
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-strong lg:col-span-5 lg:justify-self-end">
            <span className="mb-2 inline-block rounded-full border border-stone px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-walnut">
              Illustrative photography
            </span>
            <br />
            These photographs show woodcarving in general. They are not
            photographs of your order.
          </p>
        </Reveal>

        <ul className="mt-12 columns-1 gap-6 min-[520px]:columns-2 lg:columns-3 [&>li]:mb-8">
          {galleryItems.map((item, i) => (
            <li key={item.id} className="break-inside-avoid">
              <Reveal delay={(i % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Open photograph: ${item.title}`}
                  className="group relative block w-full overflow-hidden rounded-[2px] bg-stone text-left"
                >
                  <span className={cn("relative block", ASPECT[item.aspect])}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 520px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>
                <div className="mt-3">
                  <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-strong">
                    {item.caption}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={galleryItems}
        index={active}
        onChange={setActive}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
