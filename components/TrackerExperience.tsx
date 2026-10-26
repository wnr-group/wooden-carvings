"use client";

import { MotionConfig } from "motion/react";
import { useState } from "react";
import { CraftFilm } from "@/components/CraftFilm";
import { DeliveryInfo } from "@/components/DeliveryInfo";
import { DemoSwitcher } from "@/components/DemoSwitcher";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { ProcessFilm } from "@/components/ProcessFilm";
import { ProductDetails } from "@/components/ProductDetails";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SupportDialog } from "@/components/SupportDialog";
import { Tracker } from "@/components/tracker/Tracker";
import { defaultOrderId, orders } from "@/data/orders";
import type { Order } from "@/types/order";

export function TrackerExperience() {
  const [orderId, setOrderId] = useState<Order["id"]>(defaultOrderId);
  const [supportOpen, setSupportOpen] = useState(false);
  const order = orders.find((o) => o.id === orderId) ?? orders[0];

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#status"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-walnut focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to order status
      </a>
      <SiteHeader onHelp={() => setSupportOpen(true)} />
      <main>
        <Hero order={order} />
        <CraftFilm />
        <Tracker order={order} onHelp={() => setSupportOpen(true)} />
        <ProductDetails order={order} />
        <DeliveryInfo order={order} />
        <ProcessFilm />
        <Gallery />
      </main>
      <SiteFooter onHelp={() => setSupportOpen(true)} />
      <DemoSwitcher value={orderId} onChange={setOrderId} />
      <SupportDialog
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        reference={order.reference}
      />
    </MotionConfig>
  );
}
