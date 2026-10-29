/**
 * Sample deity catalogue for the homepage. Names and prices are placeholders.
 * `src` is optional: where a real photograph of that statue hasn't been
 * supplied yet, the UI shows a labelled placeholder instead of a wrong image.
 * To add a photo, drop it in public/images/deities/ and set `src`.
 */
export type Deity = "Ganesha" | "Lakshmi" | "Krishna" | "Buddha" | "Hanuman" | "Saraswati";

export interface Product {
  id: string;
  name: string;
  category: Deity;
  price: number;
  src?: string;
  alt: string;
}

export const PRODUCT_TABS: ("All" | Deity)[] = ["All", "Ganesha", "Lakshmi", "Krishna", "Buddha", "Hanuman", "Saraswati"];

export const products: Product[] = [
  { id: "p1", name: "Lord Ganesha", category: "Ganesha", price: 18500, src: "/images/product.jpg", alt: "A traditional dark wooden Ganesha sculpture" },
  { id: "p2", name: "Goddess Lakshmi on Lotus", category: "Lakshmi", price: 24000, src: "/images/deities/lakshmi.webp", alt: "Hand-carved wooden statue of Goddess Lakshmi seated on a lotus" },
  { id: "p3", name: "Krishna with Flute", category: "Krishna", price: 21500, src: "/images/deities/krishna.webp", alt: "Hand-carved wooden statue of Lord Krishna playing the flute" },
  { id: "p4", name: "Meditating Buddha", category: "Buddha", price: 16000, src: "/images/deities/buddha.webp", alt: "Hand-carved wooden statue of a meditating Buddha" },
  { id: "p5", name: "Lord Hanuman", category: "Hanuman", price: 19000, src: "/images/deities/hanuman.webp", alt: "Hand-carved wooden statue of Lord Hanuman" },
  { id: "p6", name: "Goddess Saraswati", category: "Saraswati", price: 22500, src: "/images/deities/saraswati.webp", alt: "Hand-carved wooden statue of Goddess Saraswati playing the veena, with a swan" },
  { id: "p7", name: "Ganesha, Seated", category: "Ganesha", price: 14200, alt: "Hand-carved wooden seated Ganesha (photo to be added)" },
  { id: "p8", name: "Radha Krishna", category: "Krishna", price: 27500, alt: "Hand-carved wooden Radha Krishna statue (photo to be added)" },
];

export const CATEGORY_ARCHES: { label: Deity; src?: string }[] = [
  { label: "Ganesha", src: "/images/product.jpg" },
  { label: "Lakshmi", src: "/images/deities/lakshmi.webp" },
  { label: "Hanuman", src: "/images/deities/hanuman.webp" },
  { label: "Saraswati", src: "/images/deities/saraswati.webp" },
  { label: "Buddha", src: "/images/deities/buddha.webp" },
  { label: "Krishna", src: "/images/deities/krishna.webp" },
];
