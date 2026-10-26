"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { formatDateTime } from "@/lib/format";
import { getStageViews, STAGE_STATE_LABEL, type StageView } from "@/lib/status";
import type { Order } from "@/types/order";

const pop = {
  initial: { scale: 0.5, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
  transition: { type: "spring", stiffness: 380, damping: 18 },
} as const;

function Marker({ stage }: { stage: StageView }) {
  if (stage.state === "completed") {
    return (
      <motion.span
        {...pop}
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-ivory"
      >
        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
    );
  }
  if (stage.state === "current") {
    return (
      <motion.span {...pop} className="relative z-10 flex h-8 w-8 items-center justify-center">
        <span className="soft-pulse absolute inset-0 rounded-full bg-oak" aria-hidden="true" />
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-walnut">
          <span className="h-2.5 w-2.5 rounded-full bg-ivory" aria-hidden="true" />
        </span>
      </motion.span>
    );
  }
  return (
    <motion.span
      {...pop}
      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-stone bg-ivory text-xs font-medium text-muted-strong"
    >
      {stage.index + 1}
    </motion.span>
  );
}

function TimelineItem({ stage, isLast, order }: { stage: StageView; isLast: boolean; order: Order }) {
  const nextDone = stage.state === "completed";
  const dateLine =
    stage.state === "completed" && stage.timestamp
      ? `Completed ${formatDateTime(stage.timestamp)}`
      : stage.state === "current" && stage.timestamp
        ? `Started ${formatDateTime(stage.timestamp)}`
        : stage.state === "current"
          ? "In progress now"
          : "Date to be confirmed";

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(stage.index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 sm:gap-x-7"
      aria-current={stage.state === "current" ? "step" : undefined}
    >
      <div className="relative flex justify-center">
        <Marker stage={stage} />
        {!isLast && (
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-9 -bottom-3 left-1/2 w-px origin-top -translate-x-1/2",
              nextDone
                ? "bg-forest"
                : "bg-[repeating-linear-gradient(to_bottom,var(--oak)_0_4px,transparent_4px_10px)]",
            )}
          />
        )}
      </div>

      <div
        className={cn(
          "min-w-0 pb-10",
          stage.state === "current" &&
            "-mt-2 mb-8 rounded-[4px] border border-stone bg-paper p-5 pb-6 sm:p-7 sm:pb-7",
          isLast && stage.state !== "current" && "pb-0",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3
            className={cn(
              "font-display text-[1.65rem] leading-tight tracking-tight sm:text-3xl",
              stage.state === "upcoming" ? "text-muted-strong" : "text-charcoal",
            )}
          >
            {stage.title}
          </h3>
          <StatusBadge
            state={stage.state}
            label={
              stage.id === "shipped" && stage.state === "current"
                ? "In transit"
                : STAGE_STATE_LABEL[stage.state]
            }
          />
        </div>
        <p
          className={cn(
            "mt-2 max-w-[34rem] text-[0.95rem] leading-relaxed",
            stage.state === "upcoming" ? "text-muted" : "text-muted-strong",
          )}
        >
          {stage.description}
        </p>
        <p className="mt-3 text-sm text-muted-strong">
          {stage.timestamp ? (
            <time dateTime={stage.timestamp}>{dateLine}</time>
          ) : (
            dateLine
          )}
        </p>
        {stage.id === "shipped" && stage.state === "completed" && order.shipment && (
          <p className="mt-1 text-sm text-muted-strong">
            Courier: {order.shipment.courier}
          </p>
        )}
      </div>
    </motion.li>
  );
}

export function Timeline({ order }: { order: Order }) {
  const stages = getStageViews(order);
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="border-t border-stone bg-ivory"
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-strong">
              Order progress
            </p>
            <h2
              id="journey-title"
              className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
            >
              Every masterpiece
              <br />
              has a journey.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-strong">
              Six milestones, from the moment your order is confirmed to the day
              it reaches you.
            </p>
          </div>
        </Reveal>

        <ol key={order.id} className="lg:col-span-7 lg:col-start-6" aria-label="Order milestones">
          {stages.map((stage, i) => (
            <TimelineItem
              key={stage.id}
              stage={stage}
              order={order}
              isLast={i === stages.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
