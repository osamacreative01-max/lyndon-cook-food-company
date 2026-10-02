/**
 * Photography manifest.
 *
 * All imagery is served from local public/ and optimised by `next/image`
 * (AVIF/WebP, responsive `sizes`, explicit dimensions to avoid layout shift).
 */

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
    src: "/Editorial images (13)/pantryStack.jpg",
    alt: "Rice and pulses arranged for food service supply",
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

/* -------------------------------------------------------------------------- */
/* Category imagery                                                            */
/* -------------------------------------------------------------------------- */

export const CATEGORY_IMAGES = {
  rice: {
    src: "/images/norn/norn-rice-5kg.jpg",
    alt: "NORN 5kg basmati rice sacks",
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
    src: "/images/norn/norn-range-wide.jpg",
    alt: "NORN canned foods with rice, pasta and spices",
  },
  "norn-rice-1lb": {
    src: "/images/norn/norn-rice-1lb.jpg",
    alt: "NORN Rice 1lb packs",
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
  superBasmati: { src: "/Png/supper Basmati Rice.png", alt: "NORN Super Basmati Rice sack" },
  steamBasmati: { src: "/Png/Steam Basmati Rice.png", alt: "NORN Steam Basmati Rice sack" },
  sellaBasmati: { src: "/Png/Sella Basmati Rice.png", alt: "NORN Sella Basmati Rice sack" },
  irri6: { src: "/Png/LONG GRAIN WHITE RICE.png", alt: "NORN Long Grain White Rice pack" },
  pk386: { src: "/Product images (41)/rice/pk386.jpg", alt: "Cooked long grain rice in a dish" },
  irri9: { src: "/Png/LONG GRAIN PARABOLIED RICE.png", alt: "NORN Long Grain Parboiled Rice pack" },
  brokenRice: { src: "/Product images (41)/rice/brokenRice.jpg", alt: "Dry goods in sacks, ready for milling and packing" },

  /* Spices */
  groundCumin: { src: "/Png/CUMIN.png", alt: "NORN cumin jar" },
  groundCoriander: { src: "/Product images (41)/Spices (11)/groundCoriander.jpg", alt: "Coriander prepared for grinding" },
  groundGinger: { src: "/Product images (41)/Spices (11)/groundGinger.jpg", alt: "Ground ginger in a bowl" },
  groundBlackPepper: { src: "/Png/BLACKPAPPERCORNS.png", alt: "NORN black peppercorns jar" },
  groundTurmeric: { src: "/Png/TURMERIC.png", alt: "NORN turmeric jar" },
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
  sindhri: { src: "/Product images (41)/Seasonal fruit (9)/sindhri,.jpg", alt: "Mangoes stacked at market" },
  dussehri: { src: "/Product images (41)/Seasonal fruit (9)/dussehri.jpg", alt: "Ripe mangoes being prepared for sale" },
  kinnow: { src: "/Product images (41)/Seasonal fruit (9)/kinnow.jpg", alt: "Citrus fruit presented for selection" },
  sangtra: { src: "/Product images (41)/Seasonal fruit (9)/sangtra.jpg", alt: "Halved citrus fruit showing flesh and segments" },
  fruiter: { src: "/Product images (41)/Seasonal fruit (9)/fruiter.jpg", alt: "Sweet citrus fruit ready for packing" },
  malta: { src: "/Product images (41)/Seasonal fruit (9)/malta.jpg", alt: "Citrus fruit stacked for sale" },

  /* NORN canned foods */
  bakedBeans: { src: "/Png/Baked Beans.png", alt: "NORN Baked Beans can" },
  blackBeans: { src: "/Png/Black Beans.png", alt: "NORN Black Beans can" },
  broadBeans: { src: "/Png/Broad Beans.png", alt: "NORN Broad Beans can" },
  chickpeas: { src: "/Png/Chickpeans.png", alt: "NORN Chickpeas can" },
  pintoBeans: { src: "/Png/Pinto Beans.png", alt: "NORN Pinto Beans can" },
  redKidneyBeans: { src: "/Png/Red Kidney Beans.png", alt: "NORN Red Kidney Beans can" },
  whiteKidneyBeans: { src: "/Png/White Kidney Beans.png", alt: "NORN White Kidney Beans can" },
  greenPeas: { src: "/Png/Green Peas.png", alt: "NORN Green Peas can" },
  sweetcorn: { src: "/Png/Sweetscorn.png", alt: "NORN Sweetcorn can" },
  creamedCorn: { src: "/Png/Creamed Corn.png", alt: "NORN Creamed Corn can" },
  mixedVegetables: { src: "/Png/Mixed Vegetables.png", alt: "NORN Mixed Vegetables can" },
  peasAndCarrots: { src: "/Png/Peas & Carrots.png", alt: "NORN Peas and Carrots can" },
  wholePeeledTomatoes: { src: "/Png/Whole Peeled Tomato.png", alt: "NORN Whole Peeled Tomatoes can" },
  sanMarzanoTomatoes: { src: "/Png/San Marzano Tomatos.png", alt: "NORN San Marzano Tomatoes can" },

  /* NORN Rice 1lb */
  nornRice1lb: { src: "/Png/LONG GRAIN WHITE RICE 454 g.png", alt: "NORN Long Grain White Rice 454g pack" },
  nornRiceBasmati: { src: "/Png/supper Basmati Rice.png", alt: "NORN Basmati Rice pack" },
  nornRiceSella: { src: "/Png/Sella Basmati Rice.png", alt: "NORN Sella Basmati Rice pack" },

  /* Pasta */
  spaghetti: { src: "/Png/Spaghetti.png", alt: "NORN Spaghetti pack" },
  penne: { src: "/Png/Penne Rigate.png", alt: "NORN Penne Rigate pack" },
  macaroni: { src: "/Png/Elbows.png", alt: "NORN elbow macaroni pack" },
  fusilli: { src: "/Png/Rotini.png", alt: "NORN fusilli pack" },
  elbowMacaroni: { src: "/Png/Elbows.png", alt: "NORN Elbow Macaroni pack" },
  pastaShapes: { src: "/images/norn/norn-pasta-row.jpg", alt: "NORN dry pasta range in assorted shapes" },
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