import { STAGES } from "@/data/stages";
import type { Order, StageDefinition, StageState } from "@/types/order";

export interface StageView extends StageDefinition {
  state: StageState;
  timestamp?: string;
  index: number;
}

export const TOTAL_STAGES = STAGES.length;

export const STAGE_STATE_LABEL: Record<StageState, string> = {
  completed: "Completed",
  current: "In progress",
  upcoming: "Upcoming",
};

/** The final stage counts as completed once it has been reached. */
export function getStageViews(order: Order): StageView[] {
  const currentIndex = STAGES.findIndex((s) => s.id === order.currentStage);
  const lastIndex = STAGES.length - 1;
  return STAGES.map((stage, index) => {
    let state: StageState = "upcoming";
    if (index < currentIndex || (index === currentIndex && index === lastIndex)) {
      state = "completed";
    } else if (index === currentIndex) {
      state = "current";
    }
    return { ...stage, state, index, timestamp: order.stageTimestamps[stage.id] };
  });
}

export function getCurrentStage(order: Order): StageView {
  const views = getStageViews(order);
  return views.find((v) => v.id === order.currentStage) ?? views[0];
}

export function isDelivered(order: Order): boolean {
  return order.currentStage === "delivered";
}

export function hasShipped(order: Order): boolean {
  return order.currentStage === "shipped" || isDelivered(order);
}

export function getDeliveryStatus(order: Order): string {
  if (isDelivered(order)) return "Delivered";
  if (order.currentStage === "shipped") return "In transit";
  if (order.currentStage === "ready") return "Awaiting dispatch";
  return "Not yet dispatched";
}
