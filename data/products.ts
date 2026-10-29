/**
 * Sample catalogue for the homepage. Names and prices are placeholders.
 * `src` is optional: where a real photograph of a piece hasn't been supplied
 * yet, the UI shows a labelled placeholder instead of a wrong image.
 * To add a photo, drop it in public/images/ and set `src`.
 *
 * To add a new kind of piece, add its name to DEITIES or ARTS below, then add
 * products that use it. The filters on the homepage pick it up automatically.
 */
export const DEITIES = ["Ganesha", "Lakshmi", "Krishna", "Buddha", "Hanuman", "Saraswati"] as const;
export const ARTS = ["Apsaras", "Wall Mounts", "Wall Brackets", "Doors & Frames", "Mandirs"] as const;

export type Deity = (typeof DEITIES)[number];
export type Art = (typeof ARTS)[number];
export type Category = Deity | Art;

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  src?: string;
  alt: string;
  /** Set a number (1, 2, 3...) to feature this piece in the Premium Collection, in that order. */
  featured?: number;
}

export const isDeity = (c: Category): c is Deity => (DEITIES as readonly string[]).includes(c);

export const PRODUCT_TABS: ("All" | Category)[] = ["All", ...DEITIES, ...ARTS];

export const products: Product[] = [
  { id: "p1", name: "Lord Ganesha", category: "Ganesha", price: 18500, src: "/images/product.jpg", alt: "A traditional dark wooden Ganesha sculpture" },
  { id: "p2", name: "Goddess Lakshmi on Lotus", category: "Lakshmi", price: 24000, src: "/images/deities/lakshmi.webp", alt: "Hand-carved wooden statue of Goddess Lakshmi seated on a lotus" },
  { id: "p3", name: "Krishna with Flute", category: "Krishna", price: 21500, src: "/images/deities/krishna.webp", alt: "Hand-carved wooden statue of Lord Krishna playing the flute" },
  { id: "p4", name: "Meditating Buddha", category: "Buddha", price: 16000, src: "/images/deities/buddha.webp", alt: "Hand-carved wooden statue of a meditating Buddha" },
  { id: "p5", name: "Lord Hanuman", category: "Hanuman", price: 19000, src: "/images/deities/hanuman.webp", alt: "Hand-carved wooden statue of Lord Hanuman" },
  { id: "p6", name: "Goddess Saraswati", category: "Saraswati", price: 22500, src: "/images/deities/saraswati.webp", alt: "Hand-carved wooden statue of Goddess Saraswati playing the veena, with a swan" },
  { id: "p7", name: "Ganesha, Seated", category: "Ganesha", price: 14200, src: "/images/products/ganesha-seated.webp", alt: "Hand-carved wooden Lord Ganesha seated on a lotus pedestal beside a brass lamp" },
  { id: "p8", name: "Radha Krishna", category: "Krishna", price: 27500, src: "/images/products/radha-krishna.webp", alt: "Hand-carved wooden statue of Radha and Krishna standing together, Krishna playing the flute" },
  { id: "p9", name: "Celestial Apsara", category: "Apsaras", price: 26000, featured: 2, src: "/images/products/celestial-apsara.webp", alt: "Hand-carved wooden Apsara dancer in a graceful pose with flowing scarves" },
  { id: "p10", name: "Apsara with Lotus", category: "Apsaras", price: 23500, src: "/images/products/apsara-with-lotus.webp", alt: "Hand-carved wooden Apsara standing and holding a lotus flower in a garden" },
  { id: "p11", name: "Floral Wall Panel", category: "Wall Mounts", price: 15500, src: "/images/products/floral-wall-panel.webp", alt: "Tall hand-carved wooden wall panel with lotus blossoms and flowing vines" },
  { id: "p12", name: "Temple Scene Wall Mount", category: "Wall Mounts", price: 32000, featured: 4, src: "/images/products/temple-scene-wall-mount.webp", alt: "Large hand-carved wooden wall mount of a temple with tiered towers and figures" },
  { id: "p13", name: "Carved Corner Bracket", category: "Wall Brackets", price: 6800, src: "/images/products/carved-corner-bracket.webp", alt: "Hand-carved wooden corner bracket with swirling scrolls and leaves" },
  { id: "p14", name: "Scroll Wall Bracket, Pair", category: "Wall Brackets", price: 9400, featured: 6, src: "/images/products/scroll-wall-bracket-pair.webp", alt: "A pair of hand-carved wooden scroll wall brackets supporting a shelf" },
  { id: "p15", name: "Carved Temple Door", category: "Doors & Frames", price: 85000, featured: 1, src: "/images/products/carved-temple-door.webp", alt: "Pair of tall hand-carved wooden temple doors with lotus and peacock panels" },
  { id: "p16", name: "Arched Door Frame with Pillars", category: "Doors & Frames", price: 62000, featured: 5, src: "/images/products/arched-door-frame.webp", alt: "Hand-carved wooden arched door frame with fluted carved pillars" },
  { id: "p17", name: "Heirloom Mandir", category: "Mandirs", price: 72000, featured: 3, src: "/images/products/heirloom-mandir.webp", alt: "Hand-carved wooden home mandir with a pillared dome, glowing with warm lamplight" },
];

export const CATEGORY_ARCHES: { label: Deity; src?: string }[] = [
  { label: "Ganesha", src: "/images/product.jpg" },
  { label: "Lakshmi", src: "/images/deities/lakshmi.webp" },
  { label: "Hanuman", src: "/images/deities/hanuman.webp" },
  { label: "Saraswati", src: "/images/deities/saraswati.webp" },
  { label: "Buddha", src: "/images/deities/buddha.webp" },
  { label: "Krishna", src: "/images/deities/krishna.webp" },
];
