import type { StageDefinition } from "@/types/order";

export const STAGES: StageDefinition[] = [
  {
    id: "confirmed",
    title: "Order Confirmed",
    description: "Your order has been received and confirmed.",
  },
  {
    id: "crafting",
    title: "Crafting in Progress",
    description:
      "Your piece is taking shape through careful, detailed workmanship.",
  },
  {
    id: "finishing",
    title: "Finishing & Quality Check",
    description:
      "The finishing process and final inspection will take place before dispatch.",
  },
  {
    id: "ready",
    title: "Ready for Dispatch",
    description: "Your completed piece will be prepared for its journey to you.",
  },
  {
    id: "shipped",
    title: "Shipped",
    description: "Your order has left our workshop and is on its way to you.",
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Your piece has arrived. We hope it brings you joy for years.",
  },
];
