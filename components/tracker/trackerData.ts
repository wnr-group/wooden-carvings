import type { Order } from "@/types/order";

/**
 * Tracker-only data. The shared order data (data/orders.ts) is untouched; this
 * file layers the 9-step production journey and demo photos on top of it.
 * PROTOTYPE DATA: stage photos are the sample images in /public/images; no reference photos supplied yet.
 */

export const TRACKER_STAGES = [
  "Wood Procurement",
  "Rough Work",
  "Nice & Detailing Work",
  "Face Work",
  "Sand Paper Work",
  "Polishing & Finishing",
  "Packing",
  "Tracking No. & Logistics",
  "Review",
] as const;

export const LOGISTICS_INDEX = 7;
export const REVIEW_INDEX = 8;
/** Stages 1-6 are production; 7-9 are packing, logistics and review. */
export const PRODUCTION_STAGE_COUNT = 6;

/**
 * WhatsApp number in international format without "+" (e.g. "919876543210").
 * No number exists in the project yet. While empty, the WhatsApp buttons open
 * the existing support dialog instead of wa.me.
 */
export const WHATSAPP_NUMBER = "";

export interface TrackerPhoto {
  src: string;
  alt: string;
}

export interface TrackerOrderData {
  /** Overrides the shared product name for this tracker. */
  productName?: string;
  /** Index of the first stage not yet completed. It is in progress unless inProgress is false. */
  current: number;
  inProgress?: boolean;
  /** ISO timestamp per stage index, for stages that have been reached. */
  timestamps: (string | undefined)[];
  reference: string[];
}

export type TrackerState = "completed" | "current" | "upcoming";

const DATA: Record<Order["id"], TrackerOrderData> = {
  "order-a": {
    productName: "3 Ft Lalithaamba Devi Wooden Sculpture (MY)",
    current: 6,
    inProgress: false,
    timestamps: [
      "2026-10-06T10:00:00+05:30",
      "2026-10-06T10:00:00+05:30",
      "2026-10-06T10:00:00+05:30",
      "2026-10-06T10:00:00+05:30",
      "2026-10-06T10:00:00+05:30",
      "2026-10-24T10:00:00+05:30",
    ],
    reference: ["/images/Reference__ref-1.png", "/images/Reference__ref-2.png"],
  },
  "order-b": {
    current: 7,
    timestamps: [
      "2026-09-25T10:00:00+05:30",
      "2026-09-27T10:00:00+05:30",
      "2026-10-02T12:30:00+05:30",
      "2026-10-06T15:00:00+05:30",
      "2026-10-09T11:15:00+05:30",
      "2026-10-14T14:20:00+05:30",
      "2026-10-18T17:45:00+05:30",
      "2026-10-21T10:15:00+05:30",
    ],
    reference: [],
  },
  "order-c": {
    current: 8,
    timestamps: [
      "2026-08-30T10:00:00+05:30",
      "2026-09-02T10:30:00+05:30",
      "2026-09-09T12:00:00+05:30",
      "2026-09-15T15:30:00+05:30",
      "2026-09-20T11:00:00+05:30",
      "2026-09-26T13:10:00+05:30",
      "2026-10-01T16:00:00+05:30",
      "2026-10-03T11:30:00+05:30",
      "2026-10-09T15:48:00+05:30",
    ],
    reference: [],
  },
};

/** Photos per stage index (stages 7-9 have none yet). */
const I = "/images/";
const STAGE_PHOTO_SRC: string[][] = [
  [
    `${I}Stage-1-Wood-Procurement__stage10-1-3fc0604f0324.jpg`,
    `${I}Stage-1-Wood-Procurement__stage10-1-a389a11a67f7.jpg`,
  ],
  [
    `${I}Stage-2-Rough-Work__stage10-2-1202e5a5f405.jpg`,
    `${I}Stage-2-Rough-Work__stage10-2-1b9bc019d62c.jpg`,
    `${I}Stage-2-Rough-Work__stage10-2-3f29e0e5faaf.jpg`,
    `${I}Stage-2-Rough-Work__stage10-2-a201064fbb95.jpg`,
    `${I}Stage-2-Rough-Work__stage10-2-a71e136f57ef.jpg`,
  ],
  [
    `${I}Stage-3-Nice-Detailing-Work__stage10-3-29f5105158a7.jpg`,
    `${I}Stage-3-Nice-Detailing-Work__stage10-3-a7898eb724f9.jpg`,
  ],
  [
    `${I}Stage-4-Face-Work__stage10-4-31af67c21016.jpg`,
    `${I}Stage-4-Face-Work__stage10-4-8c7fa939ff67.jpg`,
  ],
  [
    `${I}Stage-5-Sand-Paper-Work__stage10-5-bd2f6181901b.jpg`,
  ],
  [
    `${I}Stage-6-Polishing-Finishing__stage10-6-1.png`,
    `${I}Stage-6-Polishing-Finishing__stage10-6-2.png`,
  ],
  [],
  [],
  [],
];

export interface TrackerStageView {
  index: number;
  title: string;
  state: TrackerState;
  timestamp?: string;
  photos: TrackerPhoto[];
}

export interface TrackerView {
  stages: TrackerStageView[];
  /** Latest in-progress stage, or the last completed one. */
  focus: TrackerStageView;
  productName: string;
  percent: number;
  statusLine: string;
  reference: TrackerPhoto[];
}

export function getTrackerView(order: Order): TrackerView {
  const data = DATA[order.id];
  const name = data.productName ?? order.product.name;
  const stages: TrackerStageView[] = TRACKER_STAGES.map((title, index) => {
    const state: TrackerState =
      index < data.current ? "completed" : index === data.current && data.inProgress !== false ? "current" : "upcoming";
    const photos =
      state === "upcoming"
        ? []
        : STAGE_PHOTO_SRC[index].map((src) => ({ src, alt: `${name} - ${title}` }));
    return { index, title, state, timestamp: data.timestamps[index], photos };
  });

  const completed = stages.filter((s) => s.state === "completed").length;
  const focus =
    stages.find((s) => s.state === "current") ?? stages[Math.max(completed - 1, 0)];
  const next = stages[completed];
  const statusLine =
    completed >= PRODUCTION_STAGE_COUNT
      ? `Production Complete – ${focus.state === "current" ? focus.title : `Ready for ${next.title}`}`
      : `${focus.title} in progress`;

  return {
    stages,
    focus,
    productName: name,
    percent: Math.round((completed / stages.length) * 100),
    statusLine,
    reference: data.reference.map((src, n) => ({
      src,
      alt: `${name} - your reference image ${n + 1}`,
    })),
  };
}
