/**
 * Photography manifest.
 *
 * All imagery is served from local public/ and optimised by `next/image`
 * (AVIF/WebP, responsive `sizes`, explicit dimensions to avoid layout shift).
 */

const LOCAL = "";

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
    src: "/Editorial images (13)/palletCans.jpg",
    alt: "Pallet of canned goods ready for despatch",
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
    src: "/Editorial images (13)/cannedShelf.jpg",
    alt: "Display of canned goods on a store shelf",
  },
  companyProfile: {
    src: "/companyProfile/rice.jpg",
    alt: "Food retail shelves representing our supply categories",
  },
} as const satisfies Record<EditorialImageKey, { src: string; alt: string }>;

/* -------------------------------------------------------------------------- */
/* Category imagery                                                            */
/* -------------------------------------------------------------------------- */

export const CATEGORY_IMAGES = {
  rice: {
    src: "/companyProfile/rice.jpg",
    alt: "Cooked basmati rice served in a bowl",
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
    alt: "An opened tin of beans in tomato sauce",
  },
  "norm-rice-1lb": {
    src: "/companyProfile/rice.jpg",
    alt: "NORM Rice 1lb packaging",
  },
  "pasta": {
    src: "/companyProfile/rice.jpg",
    alt: "Pasta products",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Product imagery                                                             */
/* -------------------------------------------------------------------------- */

export const PRODUCT_IMAGES = {
  /* Rice */
  superBasmati: { src: "/Product images (41)/rice/superBasmati.jpg", alt: "Close texture of long grain white rice" },
  steamBasmati: { src: "/Product images (41)/rice/steamBasmati,.jpg", alt: "Cooked basmati rice prepared as biryani" },
  sellaBasmati: { src: "/Product images (41)/rice/sellaBasmati.jpg", alt: "Basmati rice served in a glass bowl" },
  irri6: { src: "/Product images (41)/rice/irri6.jpg", alt: "Mounds of long grain white rice" },
  pk386: { src: "/Product images (41)/rice/pk386.jpg", alt: "Cooked long grain rice in a dish" },
  irri9: { src: "/Product images (41)/rice/irri9.jpg", alt: "Rice and grains prepared as a porridge dish" },
  brokenRice: { src: "/Product images (41)/rice/brokenRice.jpg", alt: "Dry goods in sacks, ready for milling and packing" },

  /* Spices */
  groundCumin: { src: "/Product images (41)/Spices (11)/groundCumin.jpg", alt: "Ground cumin spooned for measuring" },
  groundCoriander: { src: "/Product images (41)/Spices (11)/groundCoriander.jpg", alt: "Coriander prepared for grinding" },
  groundGinger: { src: "/Product images (41)/Spices (11)/groundGinger.jpg", alt: "Ground ginger in a bowl" },
  groundBlackPepper: { src: "/Product images (41)/Spices (11)/groundBlackPepper.jpg", alt: "Black pepper ground on a wooden surface" },
  groundTurmeric: { src: "/Product images (41)/Spices (11)/groundTurmeric.jpg", alt: "Ground turmeric with its golden colour" },
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

  /* NORM canned foods */
  bakedBeans: { src: "/Product images (41)/Canned foods (14)/bakedBeans.webp", alt: "Baked beans in tomato sauce" },
  blackBeans: { src: "/Product images (41)/Canned foods (14)/blackBeans.jpg", alt: "A bowl of black beans" },
  broadBeans: { src: "/Product images (41)/Canned foods (14)/broadBeans.jpg", alt: "Broad beans prepared for cooking" },
  chickpeas: { src: "/Product images (41)/Canned foods (14)/chickpeas.webp", alt: "Cooked chickpeas in a bowl" },
  pintoBeans: { src: "/Product images (41)/Canned foods (14)/pintoBeans.jpg", alt: "A bowl of pinto beans" },
  redKidneyBeans: { src: "/Product images (41)/Canned foods (14)/redKidneyBeans.jpg", alt: "Red kidney beans held in cupped hands" },
  whiteKidneyBeans: { src: "/Product images (41)/Canned foods (14)/whiteKidneyBeans.jpg", alt: "White kidney beans ready for use" },
  greenPeas: { src: "/Product images (41)/Canned foods (14)/greenPeas.jpg", alt: "Green peas in a jar" },
  sweetcorn: { src: "/Product images (41)/Canned foods (14)/sweetcorn.jpg", alt: "Sweetcorn kernels" },
  creamedCorn: { src: "/Product images (41)/Canned foods (14)/creamedCorn.jpg", alt: "Creamed corn being prepared" },
  mixedVegetables: { src: "/Product images (41)/Canned foods (14)/mixedVegetables.jpg", alt: "A mixed vegetable dish" },
  peasAndCarrots: { src: "/Product images (41)/Canned foods (14)/peasAndCarrots.jpg", alt: "Peas and carrots prepared for cooking" },
  wholePeeledTomatoes: { src: "/Product images (41)/Canned foods (14)/wholePeeledTomatoes.jpg", alt: "Tins of tomatoes" },
  sanMarzanoTomatoes: { src: "/Product images (41)/Canned foods (14)/sanMarzanoTomatoes.jpg", alt: "San Marzano tomatoes" },

  /* NORM Rice 1lb */
  normRice1lb: { src: "/companyProfile/rice.jpg", alt: "NORM Rice 1lb pack" },
  normRiceBasmati: { src: "/Product images (41)/rice/superBasmati.jpg", alt: "NORM Basmati Rice 1lb pack" },
  normRiceSella: { src: "/Product images (41)/rice/sellaBasmati.jpg", alt: "NORM Sella Rice 1lb pack" },

  /* Pasta */
  spaghetti: { src: "/companyProfile/rice.jpg", alt: "Spaghetti pasta" },
  penne: { src: "/companyProfile/rice.jpg", alt: "Penne pasta" },
  macaroni: { src: "/companyProfile/rice.jpg", alt: "Macaroni pasta" },
  fusilli: { src: "/companyProfile/rice.jpg", alt: "Fusilli pasta" },
  elbowMacaroni: { src: "/companyProfile/rice.jpg", alt: "Elbow macaroni pasta" },
  pastaShapes: { src: "/companyProfile/rice.jpg", alt: "Assorted pasta shapes" },
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