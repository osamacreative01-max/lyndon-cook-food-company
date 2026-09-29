/**
 * Photography manifest.
 *
 * All imagery is served from the Pexels CDN and optimised by `next/image`
 * (AVIF/WebP, responsive `sizes`, explicit dimensions to avoid layout shift).
 *
 * TODO(assets): the client has not yet supplied approved product photography.
 * Every image below is licensed placeholder stock chosen to match the brief.
 * Replace the URLs with approved client assets (dropped into
 * `public/images/...`) when they are delivered — the data layer only ever
 * stores the path in `src`, so no component changes are required.
 */

const PEXELS = "https://images.pexels.com/photos";

/** Crops the source to a given width; Pexels handles resizing and CDN caching. */
function px(id: number, slug: string, width = 1600): string {
  return `${PEXELS}/${id}/pexels-photo-${id}/${slug}?auto=compress&cs=tinysrgb&w=${width}`;
}

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
    src: px(34585130, "free-photo-of-pallet-of-green-bean-cans-in-outdoor-distribution-center.jpeg", 1800),
    alt: "Palletised canned goods staged for distribution",
  },
  heroPantry: {
    src: px(35285854, "free-photo-of-vintage-grocery-store-shelves-with-canned-goods.jpeg", 1800),
    alt: "Shelves of canned food in a grocery store",
  },
  pantryStack: {
    src: px(4778355, "pexels-photo-4778355.jpeg", 1600),
    alt: "Rice and pulses arranged for food service supply",
  },
  palletCans: {
    src: px(34585130, "free-photo-of-pallet-of-green-bean-cans-in-outdoor-distribution-center.jpeg"),
    alt: "Pallet of canned goods ready for despatch",
  },
  warehouse: {
    src: px(4481328, "pexels-photo-4481328.jpeg"),
    alt: "Goods handling operation with pallets in a distribution space",
  },
  riceSacks: {
    src: px(18053128, "free-photo-of-stacked-pile-of-fabric-sacks.jpeg"),
    alt: "Stacked sacks of dry goods in a storage space",
  },
  kitchen: {
    src: px(15671373, "pexels-photo-15671373.jpeg"),
    alt: "Chef preparing food in a commercial kitchen",
  },
  kitchenTeam: {
    src: px(27685507, "free-photo-of-two-chefs-in-a-kitchen-preparing-food-in-a-small-room.jpeg"),
    alt: "Two chefs preparing food together in a kitchen",
  },
  plating: {
    src: px(4253315, "pexels-photo-4253315.jpeg"),
    alt: "Dishes plated for service",
  },
  spiceBowls: {
    src: px(18649134, "free-photo-of-close-up-of-bowls-with-spices.jpeg"),
    alt: "Bowls of ground spices arranged for use",
  },
  spiceMarket: {
    src: px(31116539, "free-photo-of-vibrant-moroccan-spices-in-colorful-bowls.jpeg"),
    alt: "Colourful spices presented in bowls",
  },
  produceCrates: {
    src: px(12519455, "pexels-photo-12519455.jpeg"),
    alt: "Fresh produce arranged in crates",
  },
  cannedShelf: {
    src: px(32063427, "free-photo-of-colorful-display-of-canned-goods-in-store-shelf.jpeg"),
    alt: "Display of canned goods on a store shelf",
  },
  companyProfile: {
    src: px(16211537, "free-photo-of-shelves-in-grocery-store.jpeg", 1400),
    alt: "Food retail shelves representing our supply categories",
  },
} as const satisfies Record<EditorialImageKey, { src: string; alt: string }>;

/* -------------------------------------------------------------------------- */
/* Category imagery                                                            */
/* -------------------------------------------------------------------------- */

export const CATEGORY_IMAGES = {
  rice: {
    src: px(39493668, "free-photo-of-delicious-basmati-rice-in-glass-bowl-for-festive-meal.jpeg"),
    alt: "Cooked basmati rice served in a bowl",
  },
  spices: {
    src: px(672046, "pexels-photo-672046.jpeg"),
    alt: "Ground spices presented in small bowls",
  },
  "seasonal-fruit": {
    src: px(24514515, "free-photo-of-mangoes-in-crate.jpeg"),
    alt: "Mangoes in a crate, ready for selection",
  },
  "canned-food": {
    src: px(4874483, "pexels-photo-4874483.jpeg"),
    alt: "An opened tin of beans in tomato sauce",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Product imagery                                                             */
/* -------------------------------------------------------------------------- */

export const PRODUCT_IMAGES = {
  /* Rice */
  superBasmati: { src: px(15879426, "free-photo-of-texture-of-white-rise.jpeg"), alt: "Close texture of long grain white rice" },
  steamBasmati: { src: px(9738983, "pexels-photo-9738983.jpeg"), alt: "Cooked basmati rice prepared as biryani" },
  sellaBasmati: { src: px(39493668, "free-photo-of-delicious-basmati-rice-in-glass-bowl-for-festive-meal.jpeg"), alt: "Basmati rice served in a glass bowl" },
  irri6: { src: px(4187615, "pexels-photo-4187615.jpeg"), alt: "Mounds of long grain white rice" },
  pk386: { src: px(20500495, "free-photo-of-rice-in-a-dish.jpeg"), alt: "Cooked long grain rice in a dish" },
  irri9: { src: px(5652188, "pexels-photo-5652188.jpeg"), alt: "Rice and grains prepared as a porridge dish" },
  brokenRice: { src: px(18053128, "free-photo-of-stacked-pile-of-fabric-sacks.jpeg"), alt: "Dry goods in sacks, ready for milling and packing" },

  /* Spices */
  groundCumin: { src: px(4871244, "pexels-photo-4871244.jpeg"), alt: "Ground cumin spooned for measuring" },
  groundCoriander: { src: px(10487771, "pexels-photo-10487771.jpeg"), alt: "Coriander prepared for grinding" },
  groundGinger: { src: px(7803349, "pexels-photo-7803349.jpeg"), alt: "Ground ginger in a bowl" },
  groundBlackPepper: { src: px(7925714, "pexels-photo-7925714.jpeg"), alt: "Black pepper ground on a wooden surface" },
  groundTurmeric: { src: px(6104651, "pexels-photo-6104651.jpeg"), alt: "Ground turmeric with its golden colour" },
  garamMasala: { src: px(32144901, "free-photo-of-traditional-indian-spice-mix-with-ingredients.jpeg"), alt: "Aromatic spice blend with whole spices" },
  redChilliPowder: { src: px(33440710, "free-photo-of-rich-red-chili-powder-in-white-bowl.jpeg"), alt: "Red chilli powder in a white bowl" },
  groundFenugreek: { src: px(35156984, "free-photo-of-top-view-fenugreek-seeds-in-glass-jar.jpeg"), alt: "Fenugreek prepared for use in blends" },
  curryPowder: { src: px(5213946, "pexels-photo-5213946.jpeg"), alt: "Curry powder spooned from a bowl" },
  dryMangoPowder: { src: px(33079558, "free-photo-of-close-up-of-fresh-green-mangoes-in-abundance.jpeg"), alt: "Mangoes used for amchur seasoning" },
  pinkSalt: { src: px(10636881, "pexels-photo-10636881.jpeg"), alt: "Pink rock salt in bowls" },

  /* Seasonal fruit */
  chaunsa: { src: px(31757889, "pexels-photo-31757889.jpeg"), alt: "Ripe mangoes ready for selection" },
  langra: { src: px(24514515, "free-photo-of-mangoes-in-crate.jpeg"), alt: "Mangoes in a crate" },
  anwarRatol: { src: px(33079558, "free-photo-of-close-up-of-fresh-green-mangoes-in-abundance.jpeg"), alt: "Green mangoes in bulk" },
  sindhri: { src: px(38080052, "free-photo-of-ripe-alphonso-mangoes-stacked-at-market.jpeg"), alt: "Mangoes stacked at market" },
  dussehri: { src: px(37586665, "free-photo-of-local-vendor-selling-ripe-mangoes-in-mingora.jpeg"), alt: "Ripe mangoes being prepared for sale" },
  kinnow: { src: px(13750562, "pexels-photo-13750562.jpeg"), alt: "Citrus fruit presented for selection" },
  sangtra: { src: px(11387550, "pexels-photo-11387550.jpeg"), alt: "Halved citrus fruit showing flesh and segments" },
  fruiter: { src: px(7543156, "pexels-photo-7543156.jpeg"), alt: "Sweet citrus fruit ready for packing" },
  malta: { src: px(20267214, "free-photo-of-stall-abundance-of-lemons.jpeg"), alt: "Citrus fruit stacked for sale" },

  /* NORM canned foods */
  bakedBeans: { src: px(4874483, "pexels-photo-4874483.jpeg"), alt: "Baked beans in tomato sauce" },
  blackBeans: { src: px(31672561, "free-photo-of-close-up-of-hands-holding-bowl-of-black-beans.jpeg"), alt: "A bowl of black beans" },
  broadBeans: { src: px(7792149, "pexels-photo-7792149.jpeg"), alt: "Broad beans prepared for cooking" },
  chickpeas: { src: px(13714685, "pexels-photo-13714685.jpeg"), alt: "Cooked chickpeas in a bowl" },
  pintoBeans: { src: px(7509364, "pexels-photo-7509364.jpeg"), alt: "A bowl of pinto beans" },
  redKidneyBeans: { src: px(9898355, "pexels-photo-9898355.jpeg"), alt: "Red kidney beans held in cupped hands" },
  whiteKidneyBeans: { src: px(9898363, "pexels-photo-9898363.jpeg"), alt: "White kidney beans ready for use" },
  greenPeas: { src: px(15206677, "free-photo-of-green-peas-in-jar.jpeg"), alt: "Green peas in a jar" },
  sweetcorn: { src: px(38802738, "free-photo-of-close-up-of-fresh-yellow-corn-kernels.jpeg"), alt: "Sweetcorn kernels" },
  creamedCorn: { src: px(10475890, "pexels-photo-10475890.jpeg"), alt: "Creamed corn being prepared" },
  mixedVegetables: { src: px(9399981, "pexels-photo-9399981.jpeg"), alt: "A mixed vegetable dish" },
  peasAndCarrots: { src: px(5870328, "pexels-photo-5870328.jpeg"), alt: "Peas and carrots prepared for cooking" },
  wholePeeledTomatoes: { src: px(18216881, "free-photo-of-close-up-of-cans-with-crushed-tomatoes.jpeg"), alt: "Tins of tomatoes" },
  sanMarzanoTomatoes: { src: px(10332298, "pexels-photo-10332298.jpeg"), alt: "San Marzano tomatoes" },
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
