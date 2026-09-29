/**
 * Photography manifest.
 *
 * All imagery is served from local public/images and optimised by `next/image`
 * (AVIF/WebP, responsive `sizes`, explicit dimensions to avoid layout shift).
 */

const LOCAL = "/images";

export type EditorialImageKey =
  | "hero"
  | "heroPantry"
  | "palletCans"
  | "warehouse"
  | "kitchen"
  | "kitchenTeam"
  | "plating"
  | "spiceBowls"
  | "spiceMarket"
  | "produceCrates"
  | "pantryStack"
  | "cannedShelf"
  | "riceSacks"
  | "companyProfile";

export const IMAGES = {
  hero: {
    src: `${LOCAL}/rice-sacks.jpg`,
    alt: "Palletised canned goods staged for distribution",
  },
  heroPantry: {
    src: `${LOCAL}/pantry-clutter.jpg`,
    alt: "Shelves of canned food in a grocery store",
  },
  pantryStack: {
    src: `${LOCAL}/basmati-rice-bowl.jpg`,
    alt: "Rice and pulses arranged for food service supply",
  },
  palletCans: {
    src: `${LOCAL}/baked-beans.jpg`,
    alt: "Pallet of canned goods ready for despatch",
  },
  warehouse: {
    src: `${LOCAL}/rice-sacks.jpg`,
    alt: "Goods handling operation with pallets in a distribution space",
  },
  riceSacks: {
    src: `${LOCAL}/rice-sacks.jpg`,
    alt: "Stacked sacks of dry goods in a storage space",
  },
  kitchen: {
    src: `${LOCAL}/anita-austvika-u6JZeYYfvf8-unsplash.jpg`,
    alt: "Chef preparing food in a commercial kitchen",
  },
  kitchenTeam: {
    src: `${LOCAL}/junior-bazzo-8sBDLt02quo-unsplash.jpg`,
    alt: "Two chefs preparing food together in a kitchen",
  },
  plating: {
    src: `${LOCAL}/alberto-rodriguez--aCrA9FmT8Y-unsplash.jpg`,
    alt: "Dishes plated for service",
  },
  spiceBowls: {
    src: `${LOCAL}/ground-cumin.jpg`,
    alt: "Bowls of ground spices arranged for use",
  },
  spiceMarket: {
    src: `${LOCAL}/pakistan-fruit-exporter.jpg`,
    alt: "Colourful spices presented in bowls",
  },
  produceCrates: {
    src: `${LOCAL}/anas-alhajj-jtKNexfk33c-unsplash.jpg`,
    alt: "Fresh produce arranged in crates",
  },
  cannedShelf: {
    src: `${LOCAL}/baked-beans.jpg`,
    alt: "Display of canned goods on a store shelf",
  },
  companyProfile: {
    src: `${LOCAL}/pantry-clutter.jpg`,
    alt: "Food retail shelves representing our supply categories",
  },
} as const satisfies Record<EditorialImageKey, { src: string; alt: string }>;

/* -------------------------------------------------------------------------- */
/* Category imagery                                                            */
/* -------------------------------------------------------------------------- */

export const CATEGORY_IMAGES = {
  rice: {
    src: `${LOCAL}/pakistan-basmati-rice.jpg`,
    alt: "Cooked basmati rice served in a bowl",
  },
  spices: {
    src: `${LOCAL}/ground-cumin.jpg`,
    alt: "Ground spices presented in small bowls",
  },
  "seasonal-fruit": {
    src: `${LOCAL}/pakistan-fruit-exporter.jpg`,
    alt: "Mangoes in a crate, ready for selection",
  },
  "canned-food": {
    src: `${LOCAL}/baked-beans.jpg`,
    alt: "An opened tin of beans in tomato sauce",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Product imagery                                                             */
/* -------------------------------------------------------------------------- */

export const PRODUCT_IMAGES = {
  /* Rice */
  superBasmati: { src: `${LOCAL}/basmati-rice.jpg`, alt: "Close texture of long grain white rice" },
  steamBasmati: { src: `${LOCAL}/basmati-rice-bowl.jpg`, alt: "Cooked basmati rice prepared as biryani" },
  sellaBasmati: { src: `${LOCAL}/basmati-rice-medical.jpg`, alt: "Basmati rice served in a glass bowl" },
  irri6: { src: `${LOCAL}/irri6.jpg`, alt: "Mounds of long grain white rice" },
  pk386: { src: `${LOCAL}/basmati-rice.jpg`, alt: "Cooked long grain rice in a dish" },
  irri9: { src: `${LOCAL}/basmati-rice-medical.jpg`, alt: "Rice and grains prepared as a porridge dish" },
  brokenRice: { src: `${LOCAL}/rice-sacks.jpg`, alt: "Dry goods in sacks, ready for milling and packing" },

  /* Spices */
  groundCumin: { src: `${LOCAL}/ground-cumin.jpg`, alt: "Ground cumin spooned for measuring" },
  groundCoriander: { src: `${LOCAL}/ground-coriander.jpg`, alt: "Coriander prepared for grinding" },
  groundGinger: { src: `${LOCAL}/ground-ginger.jpg`, alt: "Ground ginger in a bowl" },
  groundBlackPepper: { src: `${LOCAL}/amirmasoud-vSYo3T4AR5Y-unsplash.jpg`, alt: "Black pepper ground on a wooden surface" },
  groundTurmeric: { src: `${LOCAL}/anju-ravindranath-Nihdo084Yos-unsplash.jpg`, alt: "Ground turmeric with its golden colour" },
  garamMasala: { src: `${LOCAL}/david-gabrielyan-rzrfWXiEWVc-unsplash.jpg`, alt: "Aromatic spice blend with whole spices" },
  redChilliPowder: { src: `${LOCAL}/jonas-kakaroto-B77ypBmpYuw-unsplash.jpg`, alt: "Red chilli powder in a white bowl" },
  groundFenugreek: { src: `${LOCAL}/ground-fenugreek.jpg`, alt: "Fenugreek prepared for use in blends" },
  curryPowder: { src: `${LOCAL}/karyna-panchenko-5352eOUYay4-unsplash.jpg`, alt: "Curry powder spooned from a bowl" },
  dryMangoPowder: { src: `${LOCAL}/chaunsa.jpg`, alt: "Mangoes used for amchur seasoning" },
  pinkSalt: { src: `${LOCAL}/kelsey-todd-XmfWnccTajs-unsplash.jpg`, alt: "Pink rock salt in bowls" },

  /* Seasonal fruit */
  chaunsa: { src: `${LOCAL}/chaunsa.jpg`, alt: "Ripe mangoes ready for selection" },
  langra: { src: `${LOCAL}/langra.jpg`, alt: "Mangoes in a crate" },
  anwarRatol: { src: `${LOCAL}/anwar-ratol.jpg`, alt: "Green mangoes in bulk" },
  sindhri: { src: `${LOCAL}/sindhri.jpg`, alt: "Mangoes stacked at market" },
  dussehri: { src: `${LOCAL}/dussehri.jpg`, alt: "Ripe mangoes being prepared for sale" },
  kinnow: { src: `${LOCAL}/kinnow.jpg`, alt: "Citrus fruit presented for selection" },
  sangtra: { src: `${LOCAL}/sangtra.jpg`, alt: "Halved citrus fruit showing flesh and segments" },
  fruiter: { src: `${LOCAL}/sangtra-benefits.jpg`, alt: "Sweet citrus fruit ready for packing" },
  malta: { src: `${LOCAL}/sangtra-benefits.jpg`, alt: "Citrus fruit stacked for sale" },

  /* NORM canned foods */
  bakedBeans: { src: `${LOCAL}/baked-beans.jpg`, alt: "Baked beans in tomato sauce" },
  blackBeans: { src: `${LOCAL}/baked-beans.jpg`, alt: "A bowl of black beans" },
  broadBeans: { src: `${LOCAL}/jacob-mcgowin-514ttExZr1U-unsplash.jpg`, alt: "Broad beans prepared for cooking" },
  chickpeas: { src: `${LOCAL}/jonas-kakaroto-B77ypBmpYuw-unsplash.jpg`, alt: "Cooked chickpeas in a bowl" },
  pintoBeans: { src: `${LOCAL}/mustafa-akin-D8PSaH0o7kk-unsplash.jpg`, alt: "A bowl of pinto beans" },
  redKidneyBeans: { src: `${LOCAL}/ratul-ghosh-NPrWYa69Mz0-unsplash.jpg`, alt: "Red kidney beans held in cupped hands" },
  whiteKidneyBeans: { src: `${LOCAL}/mustafa-akin-fTjvX9xcrXI-unsplash.jpg`, alt: "White kidney beans ready for use" },
  greenPeas: { src: `${LOCAL}/stephan-de-maranthi-GDn4iLAJijo-unsplash.jpg`, alt: "Green peas in a jar" },
  sweetcorn: { src: `${LOCAL}/sweetcorn.jpg`, alt: "Sweetcorn kernels" },
  creamedCorn: { src: `${LOCAL}/sweetcorn-2.jpg`, alt: "Creamed corn being prepared" },
  mixedVegetables: { src: `${LOCAL}/tomasz-anusiewicz-dq_f8dxdOsU-unsplash.jpg`, alt: "A mixed vegetable dish" },
  peasAndCarrots: { src: `${LOCAL}/vd-photography-1VTEK-sA8w8-unsplash.jpg`, alt: "Peas and carrots prepared for cooking" },
  wholePeeledTomatoes: { src: `${LOCAL}/wolfgang-hasselmann-BzaEULtJuDY-unsplash.jpg`, alt: "Tins of tomatoes" },
  sanMarzanoTomatoes: { src: `${LOCAL}/wouter-supardi-salari-HE_MjmWh9eQ-unsplash.jpg`, alt: "San Marzano tomatoes" },
} as const satisfies Record<string, { src: string; alt: string }>;

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

/** Sizing presets keep `sizes` consistent between card and detail layouts. */
export const IMAGE_SIZES = {
  card: "(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 88vw",
  grid: "(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 45vw, 88vw",
  detail: "(min-width: 1024px) 560px, 92vw",
  hero: "(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 92vw",
  wide: "(min-width: 1280px) 1200px, 100vw",
  band: "(min-width: 1024px) 600px, 92vw",
} as const;