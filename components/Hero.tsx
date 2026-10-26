"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CopyButton } from "@/components/CopyButton";
import { ProgressSteps } from "@/components/ProgressSteps";
import { StatusBadge } from "@/components/StatusBadge";
import { heroImage } from "@/data/gallery";
import { formatDate } from "@/lib/format";
import { getCurrentStage, isDelivered, STAGE_STATE_LABEL } from "@/lib/status";
import type { Order } from "@/types/order";

export function Hero({ order }: { order: Order }) {
  const current = getCurrentStage(order);
  const delivered = isDelivered(order);

  return (
    <section
      id="status"
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-[1320px] gap-x-16 gap-y-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-28 lg:pt-14"
    >
      <div className="lg:col-span-7 lg:row-start-1">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-strong">
          Your order journey
        </p>
        <h1
          id="hero-title"
          className="mt-5 font-display text-[clamp(2.9rem,8.2vw,6.1rem)] leading-[0.98] tracking-[-0.015em] text-charcoal"
        >
          Crafted with care.
          <br />
          <em className="text-walnut">Made for you.</em>
        </h1>
        <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-muted-strong sm:text-lg">
          Follow your piece from the first cut to your doorstep. This page shows
          where your order stands today, and what comes next.
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 lg:hidden">
          <StatusBadge
            state={current.state === "completed" ? "completed" : "current"}
            label={current.title}
          />
          <span className="text-sm text-muted-strong">
            {delivered ? "Delivered " : "Expected "}
            {formatDate(
              (delivered ? current.timestamp : order.expectedDelivery) ??
                order.expectedDelivery,
            )}
          </span>
        </p>
      </div>

      <figure className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2px] bg-stone sm:aspect-[16/10] lg:aspect-[4/5]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_6%] sm:object-[50%_14%] lg:object-[50%_22%]"
            />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-stone"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ pointerEvents: "none" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-charcoal/10"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-strong">
          <span className="shrink-0 whitespace-nowrap uppercase tracking-[0.2em]">Plate I</span>
          <span>{heroImage.caption}</span>
        </figcaption>
      </figure>

      <motion.div
        key={order.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7 lg:row-start-2"
      >
        <div className="rounded-[4px] border border-stone bg-paper p-5 sm:p-7">
          <dl className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            <div>
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-strong">
                Order reference
              </dt>
              <dd className="mt-2 flex items-center gap-2">
                <span className="font-display text-2xl tracking-tight text-charcoal">
                  {order.reference}
                </span>
                <CopyButton value={order.reference} label="Copy order reference" />
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-strong">
                Current status
              </dt>
              <dd className="mt-2.5">
                <StatusBadge
                  state={current.state === "completed" ? "completed" : "current"}
                  label={current.title}
                />
                <span className="sr-only">
                  {" "}
                  ({STAGE_STATE_LABEL[current.state]})
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-strong">
                {delivered ? "Delivered on" : "Expected delivery"}
              </dt>
              <dd className="mt-2 font-display text-2xl tracking-tight text-charcoal">
                <time dateTime={(delivered ? current.timestamp : order.expectedDelivery) ?? ""}>
                  {formatDate(
                    (delivered ? current.timestamp : order.expectedDelivery) ??
                      order.expectedDelivery,
                  )}
                </time>
              </dd>
            </div>
          </dl>
          <div className="mt-7 border-t border-stone pt-6">
            <ProgressSteps current={current} />
            <p className="mt-4 text-sm leading-relaxed text-muted-strong">
              {current.description}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
