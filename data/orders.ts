import type { Order } from "@/types/order";

/**
 * PROTOTYPE DATA: every value below is sample content, not a real customer
 * order. Dates are ISO strings with an explicit IST offset.
 */
export const orders: Order[] = [
  {
    id: "order-a",
    demoLabel: "Crafting in Progress",
    reference: "VK-2026-1042",
    orderedAt: "2026-10-12T11:42:00+05:30",
    expectedDelivery: "2026-11-14T12:00:00+05:30",
    quantity: 1,
    product: {
      name: "Handcrafted Traditional Wooden Sculpture",
      material: "Teak wood",
      finish: "Natural hand-polished finish",
      image: {
        src: "/images/product.jpg",
        alt: "A dark, richly carved wooden Ganesha sculpture seated on a lotus base",
      },
    },
    customization: [
      "Height of approximately 18 inches",
      "Deep relief on the lotus base",
      "Natural finish, no stain",
    ],
    currentStage: "crafting",
    stageTimestamps: {
      confirmed: "2026-10-12T11:42:00+05:30",
      crafting: "2026-10-15T09:30:00+05:30",
    },
    recipient: { name: "Ananya Sharma", city: "Bengaluru", state: "Karnataka" },
  },
  {
    id: "order-b",
    demoLabel: "Shipped",
    reference: "VK-2026-0987",
    orderedAt: "2026-09-24T16:05:00+05:30",
    expectedDelivery: "2026-10-28T12:00:00+05:30",
    quantity: 2,
    product: {
      name: "Hand-polished Carved Elephant Pair",
      material: "Ebonised rosewood",
      finish: "Deep hand-rubbed polish",
      image: {
        src: "/images/polished.jpg",
        alt: "Dark polished wooden elephants with pale tusks resting on grass",
      },
    },
    customization: [
      "Matched pair in mirrored poses",
      "Contrast tusks in a bone tone",
      "Padded gift packaging",
    ],
    currentStage: "shipped",
    stageTimestamps: {
      confirmed: "2026-09-24T16:05:00+05:30",
      crafting: "2026-09-27T10:00:00+05:30",
      finishing: "2026-10-12T14:20:00+05:30",
      ready: "2026-10-18T17:45:00+05:30",
      shipped: "2026-10-21T10:15:00+05:30",
    },
    recipient: { name: "Rahul Mehta", city: "Pune", state: "Maharashtra" },
    shipment: {
      courier: "Sample Courier Co. (demo)",
      trackingRef: "DEMO-TRK-0987-IN",
      shippedAt: "2026-10-21T10:15:00+05:30",
    },
  },
  {
    id: "order-c",
    demoLabel: "Delivered",
    reference: "VK-2026-0861",
    orderedAt: "2026-08-29T09:20:00+05:30",
    expectedDelivery: "2026-10-09T12:00:00+05:30",
    quantity: 1,
    product: {
      name: "Contemporary Carved Figure",
      material: "Dark sheesham wood",
      finish: "Satin wax finish",
      image: {
        src: "/images/makonde.jpg",
        alt: "A slender, abstract dark wooden figure with large ears on a white plinth",
      },
    },
    customization: [
      "Signature mark on the base",
      "Satin finish for a softer sheen",
    ],
    currentStage: "delivered",
    stageTimestamps: {
      confirmed: "2026-08-29T09:20:00+05:30",
      crafting: "2026-09-02T10:30:00+05:30",
      finishing: "2026-09-26T13:10:00+05:30",
      ready: "2026-10-01T16:00:00+05:30",
      shipped: "2026-10-03T11:30:00+05:30",
      delivered: "2026-10-09T15:48:00+05:30",
    },
    recipient: { name: "Priya Nair", city: "Kochi", state: "Kerala" },
    shipment: {
      courier: "Sample Courier Co. (demo)",
      trackingRef: "DEMO-TRK-0861-IN",
      shippedAt: "2026-10-03T11:30:00+05:30",
    },
  },
];

export const defaultOrderId: Order["id"] = "order-a";
