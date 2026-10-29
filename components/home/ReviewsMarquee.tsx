"use client";

import { Quote, Star } from "lucide-react";
import { GoldRule } from "@/components/home/motion";
import { Reveal } from "@/components/Reveal";

interface Review {
  name: string;
  place: string;
  piece: string;
  text: string;
}

/** Sample reviews. Replace with verified customer reviews. */
const REVIEWS: Review[] = [
  { name: "Ananya R.", place: "Bengaluru", piece: "Lakshmi statue", text: "The detail on the lotus petals is extraordinary. It feels like a piece with a soul, and the polish is flawless." },
  { name: "Vikram S.", place: "Mumbai", piece: "Ganesha", text: "Following each stage of the carving made the wait a joy. The statue arrived perfectly packed and looks even better in person." },
  { name: "Meera K.", place: "Chennai", piece: "Saraswati statue", text: "Warm, responsive service from start to finish. The veena and the swan are carved with such care." },
  { name: "Rahul D.", place: "Delhi", piece: "Hanuman", text: "Solid wood, great weight, beautiful grain. Exactly the heirloom piece we wanted for our prayer room." },
  { name: "Priya N.", place: "Hyderabad", piece: "Krishna", text: "The expression on the face is so gentle. Our guests ask about it every time they visit." },
  { name: "Arjun M.", place: "Pune", piece: "Buddha", text: "A calm, meditative piece. The finish brings out the grain beautifully and it suits our living room perfectly." },
  { name: "Kavya P.", place: "Kochi", piece: "Ganesha", text: "I sent reference photos and the artisans matched them closely. Truly handmade, and you can see it." },
  { name: "Sanjay T.", place: "Jaipur", piece: "Lakshmi statue", text: "Delivery was careful and tracked all the way. The statue is a stunning centrepiece for Diwali." },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="relative w-[19rem] shrink-0 border border-walnut/10 bg-paper p-7 shadow-[0_24px_40px_-30px_rgb(73_53_38/0.55)] sm:w-[23rem] sm:p-8">
      <Quote className="absolute right-6 top-6 h-8 w-8 fill-oak/20 text-oak/40" aria-hidden="true" />
      <span className="flex gap-0.5 text-oak" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </span>
      <blockquote className="mt-5 text-[0.95rem] leading-relaxed text-walnut/85">{r.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-walnut/10 pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-walnut font-display text-lg text-oak"
        >
          {r.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-walnut">{r.name}</span>
          <span className="block truncate text-xs text-muted-strong">
            {r.place} · {r.piece}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items }: { items: Review[] }) {
  // The full set is wider than any screen; the second copy is identical, so a -50%
  // shift loops without a visible seam.
  const half = items;
  return (
    <div
      className="review-row overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto"
    >
      <ul className="review-track flex w-max gap-5 py-3 sm:gap-6">
        {half.map((r, i) => (
          <li key={`a-${i}`}>
            <ReviewCard r={r} />
          </li>
        ))}
        {half.map((r, i) => (
          <li key={`b-${i}`} aria-hidden="true" inert>
            <ReviewCard r={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewsMarquee() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <Reveal className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-[#8a5a12]">Kind words</p>
          <h2
            id="reviews-title"
            className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-walnut sm:text-5xl lg:text-6xl"
          >
            What Our <em className="text-[#9a6a2a]">Customers</em> Say
          </h2>
          <GoldRule className="mx-auto mt-6 w-24" />
        </Reveal>
      </div>

      <div className="mt-12">
        <Row items={REVIEWS} />
      </div>

      <div className="pb-16 lg:pb-24" />
    </section>
  );
}
