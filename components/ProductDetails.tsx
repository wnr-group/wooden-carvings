"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { getCurrentStage } from "@/lib/status";
import type { Order } from "@/types/order";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(6.5rem,8rem)_minmax(0,1fr)] items-baseline gap-x-4 border-b border-stone py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-strong">
        {label}
      </dt>
      <dd className="min-w-0 text-[0.98rem] text-charcoal">{children}</dd>
    </div>
  );
}

function OrderDetailsDisclosure({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="mt-8">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-3 rounded-full border border-stone px-5 py-3 text-sm font-medium text-walnut transition-colors hover:border-walnut hover:bg-walnut hover:text-ivory"
      >
        {open ? "Hide order details" : "View order details"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-strong">
                Customization
              </h3>
              <ul className="mt-3 space-y-2.5">
                {order.customization.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] text-charcoal">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-px w-4 shrink-0 bg-oak"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductDetails({ order }: { order: Order }) {
  const current = getCurrentStage(order);
  return (
    <section
      id="details"
      aria-labelledby="details-title"
      className="border-t border-stone bg-paper"
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-stone">
            <motion.div
              key={order.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={order.product.image.src}
                alt={order.product.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-charcoal/10"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <div key={order.id}>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-muted-strong">
              Your piece
            </p>
            <h2
              id="details-title"
              className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
            >
              {order.product.name}
            </h2>
            <dl className="mt-8 border-t border-stone">
              <Row label="Order reference">
                <span className="inline-flex flex-wrap items-center gap-2">
                  <span className="font-medium tabular-nums">{order.reference}</span>
                  <CopyButton value={order.reference} label="Copy order reference" />
                </span>
              </Row>
              <Row label="Order date">
                <time dateTime={order.orderedAt}>{formatDate(order.orderedAt)}</time>
              </Row>
              <Row label="Quantity">{order.quantity}</Row>
              <Row label="Material">{order.product.material}</Row>
              <Row label="Finish">{order.product.finish}</Row>
              <Row label="Status">
                <StatusBadge
                  state={current.state === "completed" ? "completed" : "current"}
                  label={current.title}
                />
              </Row>
            </dl>
            <OrderDetailsDisclosure order={order} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
