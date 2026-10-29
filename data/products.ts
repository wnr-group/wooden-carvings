/**
 * Sample catalogue for the homepage. Names, prices and categories are
 * placeholders until real products are supplied. Images are the illustrative
 * Wikimedia photographs credited in data/gallery.ts.
 */
export type ProductCategory = "Deities" | "Animals" | "Figures" | "Decor";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  src: string;
  alt: string;
}

export const PRODUCT_TABS: ("All" | ProductCategory)[] = ["All", "Deities", "Animals", "Figures", "Decor"];

export const products: Product[] = [
  { id: "p1", name: "Classic Ganesha", category: "Deities", price: 18500, src: "/images/product.jpg", alt: "A traditional dark wooden Ganesha sculpture" },
  { id: "p2", name: "Flowing Drapery Statue", category: "Deities", price: 24000, src: "/images/detail.jpg", alt: "A painted wooden statue with carved drapery" },
  { id: "p3", name: "Carved Raven", category: "Animals", price: 9800, src: "/images/bird.jpg", alt: "A weathered wooden raven with deep feather grooves" },
  { id: "p4", name: "Polished Elephant", category: "Animals", price: 12600, src: "/images/polished.jpg", alt: "A glossy hand-polished dark wooden elephant" },
  { id: "p5", name: "Makonde Sculpture", category: "Decor", price: 31000, src: "/images/makonde.jpg", alt: "A tall abstract wooden sculpture on a plinth" },
  { id: "p6", name: "Artisan Figurine", category: "Figures", price: 7400, src: "/images/carving.jpg", alt: "A small figure shaped with a knife" },
  { id: "p7", name: "Heirloom Idol", category: "Deities", price: 21500, src: "/images/hero.jpg", alt: "A finished hand-carved wooden sculpture" },
  { id: "p8", name: "Rustic Form", category: "Decor", price: 6200, src: "/images/raw.jpg", alt: "A rough log shaped with a hand tool" },
];

export const CATEGORY_ARCHES = [
  { label: "Ganesha", src: "/images/product.jpg" },
  { label: "Deities", src: "/images/detail.jpg" },
  { label: "Animals", src: "/images/bird.jpg" },
  { label: "Elephants", src: "/images/polished.jpg" },
  { label: "Sculptures", src: "/images/makonde.jpg" },
  { label: "Figures", src: "/images/carving.jpg" },
];
