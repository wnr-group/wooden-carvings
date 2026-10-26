export type StageId =
  | "confirmed"
  | "crafting"
  | "finishing"
  | "ready"
  | "shipped"
  | "delivered";

export type StageState = "completed" | "current" | "upcoming";

export interface StageDefinition {
  id: StageId;
  title: string;
  description: string;
}

export interface OrderImage {
  src: string;
  alt: string;
}

export interface Shipment {
  courier: string;
  trackingRef: string;
  shippedAt: string;
}

export interface Order {
  id: "order-a" | "order-b" | "order-c";
  /** Short label for the prototype-only preview switcher. */
  demoLabel: string;
  reference: string;
  orderedAt: string;
  expectedDelivery: string;
  quantity: number;
  product: {
    name: string;
    material: string;
    finish: string;
    image: OrderImage;
  };
  customization: string[];
  currentStage: StageId;
  /** ISO timestamp for each stage that has been reached. */
  stageTimestamps: Partial<Record<StageId, string>>;
  recipient: { name: string; city: string; state: string };
  shipment?: Shipment;
}

export interface PhotoCredit {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  aspect: "portrait" | "landscape" | "square";
  credit: PhotoCredit;
}
