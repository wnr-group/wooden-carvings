import type { Metadata } from "next";
import { TrackerExperience } from "@/components/TrackerExperience";

export const metadata: Metadata = {
  title: "Track Your Order | VK Wood Carvings",
  description:
    "Follow the journey of your handcrafted piece from workshop to doorstep. Prototype with sample data.",
  robots: { index: false, follow: false },
};

export default function TrackPage() {
  return <TrackerExperience />;
}
