"use client";

import { Package } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { getDeliveryStatus, getCurrentStage, isDelivered } from "@/lib/status";
import type { Order } from "@/types/order";

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ivory/15 py-5">
      <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/70">
        {label}
      </dt>
      <dd className="mt-2 text-lg text-ivory">{children}</dd>
    </div>
  );
}

export function DeliveryInfo({ order }: { order: Order }) {
  const delivered = isDelivered(order);
  const deliveredAt = getCurrentStage(order).timestamp;
  const headlineDate = delivered && deliveredAt ? deliveredAt : order.expectedDelivery;

  return (
    <section
      id="delivery"
      aria-labelledby="delivery-title"
      className="on-dark bg-walnut text-ivory"
    >
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
        <Reveal className="lg:col-span-5">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-ivory/70">
            Delivery
          </p>
          <h2
            id="delivery-title"
            className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          >
            {delivered ? "Delivered on" : "Expected by"}
            <br />
            <em className="text-oak">
              <time dateTime={headlineDate}>{formatDate(headlineDate)}</time>
            </em>
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ivory/75">
            {delivered
              ? "Your piece has reached its destination."
              : "We will keep this page up to date as your order moves closer. Dates are estimates."}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <dl key={order.id} className="border-b border-ivory/15">
            <Item label="Delivery status">
              <StatusBadge
                tone="light"
                state={delivered ? "completed" : order.currentStage === "shipped" ? "current" : "upcoming"}
                label={getDeliveryStatus(order)}
              />
            </Item>
            <Item label="Recipient">{order.recipient.name}</Item>
            <Item label="Destination">
              {order.recipient.city}, {order.recipient.state}
            </Item>
            {order.shipment && (
              <>
                <Item label="Courier">{order.shipment.courier}</Item>
                <Item label="Tracking reference">
                  <span className="inline-flex flex-wrap items-center gap-3">
                    <span className="break-all font-medium tabular-nums">
                      {order.shipment.trackingRef}
                    </span>
                    <CopyButton
                      tone="light"
                      value={order.shipment.trackingRef}
                      label="Copy tracking reference"
                    />
                  </span>
                </Item>
              </>
            )}
          </dl>
          {!order.shipment && (
            <div className="mt-6 flex gap-4 rounded-[4px] bg-ivory/10 p-5">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-oak" aria-hidden="true" />
              <p className="text-[0.95rem] leading-relaxed text-ivory/85">
                Courier and tracking details will appear here once your order has been dispatched.
              </p>
            </div>
          )}
          <p className="mt-4 text-xs text-ivory/60">
            Sample delivery information for this prototype.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
