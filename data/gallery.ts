import type { GalleryItem, PhotoCredit } from "@/types/order";

/**
 * Illustrative woodcarving photography from Wikimedia Commons. These are NOT
 * photographs of any customer's order. Licences and credits are shown in the UI.
 */
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

export const galleryItems: GalleryItem[] = [
  {
    id: "raw",
    src: "/images/raw.jpg",
    alt: "A craftsman shaping a rough log with a hand tool outdoors",
    title: "Raw wood preparation",
    caption: "Every piece begins as a rough, seasoned log.",
    aspect: "landscape",
    credit: {
      author: "Agbalagba",
      license: "CC BY-SA 4.0",
      licenseUrl: BY_SA_4,
      sourceUrl: `${COMMONS}A_man_carving_a_hoe_handle.jpg`,
    },
  },
  {
    id: "carving",
    src: "/images/carving.jpg",
    alt: "A carver in a colourful patterned outfit shaping a small figure with a knife",
    title: "Carving by hand",
    caption: "Slow, deliberate cuts reveal the form within the wood.",
    aspect: "portrait",
    credit: {
      author: "Agbalagba",
      license: "CC BY-SA 4.0",
      licenseUrl: BY_SA_4,
      sourceUrl: `${COMMONS}A_man_carving_a_figurine.jpg`,
    },
  },
  {
    id: "detail",
    src: "/images/detail.jpg",
    alt: "A painted wooden statue with deeply carved flowing drapery",
    title: "Intricate detailing",
    caption: "Folds, edges and fine relief carved one cut at a time.",
    aspect: "portrait",
    credit: {
      author: "Wmpearl",
      license: "CC0",
      licenseUrl: CC0,
      sourceUrl: `${COMMONS}%27Wisdom%27,_wood_carving_by_William_Rush.JPG`,
    },
  },
  {
    id: "form",
    src: "/images/bird.jpg",
    alt: "A weathered wooden raven carved with deep feather grooves on a post",
    title: "Texture and form",
    caption: "Chisel marks that give a carving its character.",
    aspect: "portrait",
    credit: {
      author: "Balluwun-enjoyer",
      license: "CC0",
      licenseUrl: CC0,
      sourceUrl: `${COMMONS}Wood_carving_of_Bird_at_University_of_Birmingham_%22Grow_with_Joe%22_Community_Gardens.jpg`,
    },
  },
  {
    id: "polish",
    src: "/images/polished.jpg",
    alt: "Close view of a glossy, hand-polished dark wooden elephant",
    title: "Hand-finished",
    caption: "Patient polishing brings out depth and warmth in the grain.",
    aspect: "landscape",
    credit: {
      author: "William Warby",
      license: "CC BY 2.0",
      licenseUrl: BY_2,
      sourceUrl: `${COMMONS}Carved_Elephants.jpg`,
    },
  },
  {
    id: "traditional",
    src: "/images/product.jpg",
    alt: "A traditional dark wooden Ganesha sculpture against a plain wall",
    title: "Traditional form",
    caption: "Classical iconography, finished to be lived with.",
    aspect: "square",
    credit: {
      author: "Thamizhpparithi Maari",
      license: "CC BY-SA 3.0",
      licenseUrl: BY_SA_3,
      sourceUrl: `${COMMONS}A_wood_carving_work_3.JPG`,
    },
  },
  {
    id: "presentation",
    src: "/images/makonde.jpg",
    alt: "A tall abstract wooden sculpture on a white plinth",
    title: "Final presentation",
    caption: "A finished piece, ready to take its place in a home.",
    aspect: "portrait",
    credit: {
      author: "Munfarid1",
      license: "CC BY-SA 4.0",
      licenseUrl: BY_SA_4,
      sourceUrl: `${COMMONS}Makonde_sculpture_Elephant.jpg`,
    },
  },
];

export const heroImage: {
  src: string;
  alt: string;
  caption: string;
  credit: PhotoCredit;
} = {
  src: "/images/hero.jpg",
  alt: "An antique carved walnut sculpture of a standing figure holding a child, softly lit against a white backdrop",
  caption: "Illustrative photograph of hand-carved wood",
  credit: {
    author: "Museum Plantin-Moretus",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: `${COMMONS}Madonna_met_kind_Jezus,_beeldsnijwerk,_Museum_Plantin-Moretus_(Antwerpen)_-_MPM_V_III_01_003.jpg`,
  },
};
