/**
 * Photography manifest.
 *
 * All imagery is served from local public/ and optimised by `next/image`
 * (AVIF/WebP, responsive `sizes`, explicit dimensions to avoid layout shift).
 */

export type EditorialImageKey =
  | "hero"
  | "nornRange"
  | "heroBanner1"
  | "heroBanner2"
  | "websiteBanner1"
  | "websiteBanner2"
  | "websiteBanner3"
  | "websiteBanner4"
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
    src: "/Editorial images (13)/pantryStack.jpg",
    alt: "Rice and pulses arranged for food service supply",
  },
  /* The complete NORN collection: the homepage opening photograph. */
  nornRange: {
    src: "/images/norn/norn-range-wide.jpg",
    alt: "The complete NORN collection: basmati rice sacks, pasta, canned beans and vegetables, spices and fresh mangoes",
  },
  /* Homepage hero slider banners (1920x800, empty left third for the headline). */
  heroBanner1: {
    src: "/Home page bannar-01.jpg",
    alt: "NORN sedani, penne, shells, elbows and charleston pasta packs on a flour-dusted backdrop",
  },
  heroBanner2: {
    src: "/Home page bannar-02 (1).jpg",
    alt: "NORN steam basmati rice, canned tomatoes, baked beans, mixed vegetables and spices on a counter",
  },
  /* Website banners (8000x2358): the left third is deliberately empty so the
     headline always lands on clear ground and the range stays on the right. */
  websiteBanner1: {
    src: "/Website Banner-01.jpg",
    alt: "NORN rice, canned beans, pasta and spices arranged against a deep teal backdrop",
  },
  websiteBanner2: {
    src: "/Website Banner-02.jpg",
    alt: "The complete NORN range of rice, pasta, canned food, spices and mangoes",
  },
  websiteBanner3: {
    src: "/Website Banner-03.jpg",
    alt: "NORN penne, shells, elbows and sedani pasta packs on a flour-dusted backdrop",
  },
  websiteBanner4: {
    src: "/Website Banner-04.jpg",
    alt: "NORN pinto beans, baked beans, black beans and chickpeas in easy-open cans",
  },
  heroPantry: {
    src: "/Editorial images (13)/heroPantry.jpg",
    alt: "Shelves of canned food in a grocery store",
  },
  pantryStack: {
    src: "/Editorial images (13)/pantryStack.jpg",
    alt: "Rice and pulses arranged for food service supply",
  },
  palletCans: {
    src: "/images/norn/norn-range-wide.jpg",
    alt: "NORN canned foods, rice, pasta and spices arranged for supply",
  },
  warehouse: {
    src: "/Editorial images (13)/warehouse.jpg",
    alt: "Goods handling operation with pallets in a distribution space",
  },
  riceSacks: {
    src: "/Editorial images (13)/Ricesacks.jpg",
    alt: "Stacked sacks of dry goods in a storage space",
  },
  kitchen: {
    src: "/Editorial images (13)/kitchen.jpg",
    alt: "Chef preparing food in a commercial kitchen",
  },
  kitchenTeam: {
    src: "/Editorial images (13)/kitchenTeam.jpg",
    alt: "Two chefs preparing food together in a kitchen",
  },
  plating: {
    src: "/Editorial images (13)/plating.jpg",
    alt: "Dishes plated for service",
  },
  spiceBowls: {
    src: "/Editorial images (13)/spiceBowls.jpg",
    alt: "Bowls of ground spices arranged for use",
  },
  spiceMarket: {
    src: "/Editorial images (13)/spiceMarket.jpg",
    alt: "Colourful spices presented in bowls",
  },
  produceCrates: {
    src: "/Editorial images (13)/produceCrates.jpg",
    alt: "Fresh produce arranged in crates",
  },
  cannedShelf: {
    src: "/images/norn/norn-range.jpg",
    alt: "NORN canned foods, pasta, rice and spices laid out as a full range",
  },
  companyProfile: {
    src: "/images/norn/norn-range-wide.jpg",
    alt: "The NORN product range supplied by The Lyndon Cook",
  },
} as const satisfies Record<EditorialImageKey, { src: string; alt: string }>;

/**
 * The four website banners, in the order every hero runs through them.
 * Typed as a plain mutable array so they can be handed straight to the slider.
 */
export const WEBSITE_BANNERS: { src: string; alt: string }[] = [
  IMAGES.websiteBanner1,
  IMAGES.websiteBanner2,
  IMAGES.websiteBanner3,
  IMAGES.websiteBanner4,
];

/** The two banners the homepage hero runs through. */
export const HOME_BANNERS: { src: string; alt: string }[] = [
  IMAGES.heroBanner1,
  IMAGES.heroBanner2,
];

/* -------------------------------------------------------------------------- */
/* Category imagery                                                            */
/* -------------------------------------------------------------------------- */

export const CATEGORY_IMAGES = {
  rice: {
    src: "/companyProfile/rice.jpg",
    alt: "Rice supplied by The Lyndon Cook",
  },
  spices: {
    src: "/companyProfile/spices.jpg",
    alt: "Ground spices presented in small bowls",
  },
  "seasonal-fruit": {
    src: "/companyProfile/seasonal-fruit.jpg",
    alt: "Mangoes in a crate, ready for selection",
  },
  "canned-food": {
    src: "/companyProfile/canned-food.jpg",
    alt: "NORN canned foods supplied by The Lyndon Cook",
  },
  "pasta": {
    src: "/images/norn/norn-pasta-lifestyle.jpg",
    alt: "NORN dry pasta packs served with finished dishes",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Product imagery                                                             */
/* -------------------------------------------------------------------------- */

export const PRODUCT_IMAGES = {
  /* Rice */
  superBasmati: { src: "/Png/Rice/supper Basmati Rice.png", alt: "NORN Super Basmati Rice sack" },
  steamBasmati: { src: "/Png/Rice/Steam Basmati Rice.png", alt: "NORN Steam Basmati Rice sack" },
  sellaBasmati: { src: "/Png/Rice/Sella Basmati Rice.png", alt: "NORN Sella Basmati Rice sack" },
  irri6: { src: "/Png/Rice/LONG GRAIN WHITE RICE.png", alt: "NORN Long Grain White Rice pack" },
  pk386: { src: "/Product images (41)/rice/pk386.jpg", alt: "Cooked long grain rice in a dish" },
  irri9: { src: "/Png/Rice/LONG GRAIN PARABOLIED RICE.png", alt: "NORN Long Grain Parboiled Rice pack" },
  brokenRice: { src: "/Product images (41)/rice/brokenRice.jpg", alt: "Dry goods in sacks, ready for milling and packing" },

  /* Spices */
  groundCumin: { src: "/Product images (41)/Spices (11)/groundCumin.jpg", alt: "Ground cumin prepared for use" },
  groundCoriander: { src: "/Product images (41)/Spices (11)/groundCoriander.jpg", alt: "Coriander prepared for grinding" },
  groundGinger: { src: "/Product images (41)/Spices (11)/groundGinger.jpg", alt: "Ground ginger in a bowl" },
  groundBlackPepper: { src: "/Product images (41)/Spices (11)/groundBlackPepper.jpg", alt: "Ground black pepper prepared for use" },
  groundTurmeric: { src: "/Product images (41)/Spices (11)/groundTurmeric.jpg", alt: "Ground turmeric prepared for use" },
  garamMasala: { src: "/Product images (41)/Spices (11)/garamMasala.jpeg", alt: "Aromatic spice blend with whole spices" },
  redChilliPowder: { src: "/Product images (41)/Spices (11)/redChilliPowder.jpg", alt: "Red chilli powder in a white bowl" },
  groundFenugreek: { src: "/Product images (41)/Spices (11)/groundFenugreek.jpg", alt: "Fenugreek prepared for use in blends" },
  curryPowder: { src: "/Product images (41)/Spices (11)/curryPowder.jpg", alt: "Curry powder spooned from a bowl" },
  dryMangoPowder: { src: "/Product images (41)/Spices (11)/dryMangoPowder.jpg", alt: "Mangoes used for amchur seasoning" },
  pinkSalt: { src: "/Product images (41)/Spices (11)/pinkSalt.jpg", alt: "Pink rock salt in bowls" },

  /* Seasonal fruit */
  chaunsa: { src: "/Product images (41)/Seasonal fruit (9)/chaunsa.jpg", alt: "Ripe mangoes ready for selection" },
  langra: { src: "/Product images (41)/Seasonal fruit (9)/langra.jpg", alt: "Mangoes in a crate" },
  anwarRatol: { src: "/Product images (41)/Seasonal fruit (9)/anwarRatol.webp", alt: "Green mangoes in bulk" },
  sindhri: { src: "/Product images (41)/Seasonal fruit (9)/sindhri.jpg", alt: "Mangoes stacked at market" },
  dussehri: { src: "/Product images (41)/Seasonal fruit (9)/dussehri.jpg", alt: "Ripe mangoes being prepared for sale" },
  kinnow: { src: "/Product images (41)/Seasonal fruit (9)/kinnow.jpg", alt: "Citrus fruit presented for selection" },
  sangtra: { src: "/Product images (41)/Seasonal fruit (9)/sangtra.jpg", alt: "Halved citrus fruit showing flesh and segments" },
  fruiter: { src: "/Product images (41)/Seasonal fruit (9)/fruiter.jpg", alt: "Sweet citrus fruit ready for packing" },
  malta: { src: "/Product images (41)/Seasonal fruit (9)/malta.jpg", alt: "Citrus fruit stacked for sale" },

  /* NORN canned foods */
  bakedBeans: { src: "/Png/NORN canned foods/Baked Beans.png", alt: "NORN Baked Beans can" },
  blackBeans: { src: "/Png/NORN canned foods/Black Beans.png", alt: "NORN Black Beans can" },
  broadBeans: { src: "/Png/NORN canned foods/Broad Beans.png", alt: "NORN Broad Beans can" },
  chickpeas: { src: "/Png/NORN canned foods/Chickpeas.png", alt: "NORN Chickpeas can" },
  pintoBeans: { src: "/Png/NORN canned foods/Pinto Beans.png", alt: "NORN Pinto Beans can" },
  redKidneyBeans: { src: "/Png/NORN canned foods/Red Kidney Beans.png", alt: "NORN Red Kidney Beans can" },
  whiteKidneyBeans: { src: "/Png/NORN canned foods/White Kidney Beans.png", alt: "NORN White Kidney Beans can" },
  greenPeas: { src: "/Png/NORN canned foods/Green Peas.png", alt: "NORN Green Peas can" },
  sweetcorn: { src: "/Png/NORN canned foods/Sweetscorn.png", alt: "NORN Sweetcorn can" },
  creamedCorn: { src: "/Png/NORN canned foods/Creamed Corn.png", alt: "NORN Creamed Corn can" },
  mixedVegetables: { src: "/Png/NORN canned foods/Mixed Vegetables.png", alt: "NORN Mixed Vegetables can" },
  peasAndCarrots: { src: "/Png/NORN canned foods/Peas and Carrots.png", alt: "NORN Peas and Carrots can" },
  wholePeeledTomatoes: { src: "/Png/NORN canned foods/Whole Peeled Tomato.png", alt: "NORN Whole Peeled Tomatoes can" },
  sanMarzanoTomatoes: { src: "/Png/NORN canned foods/San Marzano Tomatos.png", alt: "NORN San Marzano Tomatoes can" },

  /* Pasta */
  spaghetti: { src: "/Png/Pasta/Spaghetti.png", alt: "NORN Spaghetti pack" },
  penne: { src: "/Png/Pasta/Penne Rigate.png", alt: "NORN Penne Rigate pack" },
  macaroni: { src: "/Png/Pasta/Elbows.png", alt: "NORN elbow macaroni pack" },
  fusilli: { src: "/Png/Pasta/Rotini.png", alt: "NORN fusilli pack" },
  elbowMacaroni: { src: "/Png/Pasta/Elbows.png", alt: "NORN Elbow Macaroni pack" },
  pastaShapes: { src: "/images/norn/norn-pasta-row.jpg", alt: "NORN dry pasta range in assorted shapes" },
} as const satisfies Record<string, { src: string; alt: string }>;

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

/** Sizing presets keep `sizes` consistent between card and detail layouts. */
export const IMAGE_SIZES = {
  card: "(min-width: 1280px) 600px, (min-width: 1024px) 470px, (min-width: 768px) 340px, 92vw",
  grid: "(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw",
  detail: "(min-width: 1280px) 572px, (min-width: 1024px) 46vw, 92vw",
  hero: "(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 92vw",
  wide: "(min-width: 1280px) 1280px, 100vw",
  band: "(min-width: 1024px) 620px, 92vw",
} as const;