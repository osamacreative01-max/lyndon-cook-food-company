/**
 * Category and subgroup definitions.
 *
 * Content rules: descriptions describe the range and the commercial process only.
 * No grades, weights, origins, seasons or availability promises are stated
 * because those are agreed per programme (see the master build brief).
 */

import { CATEGORY_IMAGES } from "@/lib/images";

export type CategoryId =
  | "rice"
  | "spices"
  | "seasonal-fruit"
  | "canned-food"
  | "norn-rice-1lb"
  | "pasta";

export type Category = {
  id: CategoryId;
  /** URL segment under /products/ */
  slug: CategoryId;
  name: string;
  /** Short label for navigation and chips. */
  shortName: string;
  /** Nav label from the master navigation. */
  navLabel: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: { src: string; alt: string };
  ctaLabel: string;
  groups: { id: string; name: string; description: string }[];
  seoTitle: string;
  seoDescription: string;
  /** Optional PDF datasheet download link. */
  pdf?: { href: string; label: string };
};

export const CATEGORIES: Category[] = [
  {
    id: "rice",
    slug: "rice",
    name: "Rice",
    shortName: "Rice",
    navLabel: "Rice",
    eyebrow: "Category",
    summary:
      "Everyday white rice and aromatic Basmati for a range of kitchens and purchasing requirements.",
    description:
      "Our rice range covers aromatic Basmati options alongside long grain and everyday white rice. Variety, grain specification, packing format and volume are agreed against your requirements before supply is planned.",
    image: CATEGORY_IMAGES.rice,
    ctaLabel: "Explore rice",
    groups: [
      {
        id: "basmati",
        name: "Basmati",
        description:
          "Aromatic Basmati options selected around grain length, fragrance and cooking performance.",
      },
      {
        id: "everyday",
        name: "Everyday varieties",
        description:
          "Straightforward long grain and white rice for everyday meals, batch cooking and volume supply.",
      },
    ],
    seoTitle: "Rice Supply | Basmati & White Rice | The Lyndon Cook",
    seoDescription:
      "Basmati and everyday white rice for wholesale, foodservice and institutional buyers. Agree variety, packing format and volume with The Lyndon Cook.",
  },
  {
    id: "spices",
    slug: "spices",
    name: "Spices & seasonings",
    shortName: "Spices",
    navLabel: "Spices",
    eyebrow: "Category",
    summary: "Familiar spices and blends for depth, warmth and character.",
    description:
      "Ground spices, blends and finishing seasonings for professional kitchens and food manufacturing. Heat level, packing format and volume are agreed to suit the intended application.",
    image: CATEGORY_IMAGES.spices,
    ctaLabel: "Explore spices",
    groups: [
      {
        id: "ground",
        name: "Ground spices",
        description:
          "Single-origin style ground spices in everyday formats for curries, sauces and seasoning.",
      },
      {
        id: "blends",
        name: "Blends",
        description:
          "Compound blends for consistent flavour across menus and production batches.",
      },
      {
        id: "seasonings",
        name: "Seasonings",
        description:
          "Finishing seasonings, including salt and dried fruit seasoning, for the last stage of cooking.",
      },
    ],
    seoTitle: "Spices & Seasonings | The Lyndon Cook",
    seoDescription:
      "Ground spices, blends and finishing seasonings for B2B food buyers. Agree specification, packing format and planned volumes with The Lyndon Cook.",
  },
  {
    id: "seasonal-fruit",
    slug: "seasonal-fruit",
    name: "Seasonal fruit",
    shortName: "Seasonal fruit",
    navLabel: "Seasonal fruit",
    eyebrow: "Category",
    summary:
      "Mangoes and citrus selected around variety, maturity and seasonal availability.",
    description:
      "Named mango varieties and citrus, supplied against a programme. Variety, size, maturity, grade, origin and packing are confirmed per programme or order. Availability depends on crop and shipping conditions.",
    image: CATEGORY_IMAGES["seasonal-fruit"],
    ctaLabel: "Explore seasonal fruit",
    groups: [
      {
        id: "mangoes",
        name: "Mangoes",
        description:
          "Named varieties supplied against an agreed programme and maturity requirement.",
      },
      {
        id: "citrus",
        name: "Citrus",
        description:
          "Fresh citrus selected around variety, maturity and packing format for the intended menu.",
      },
    ],
    seoTitle: "Seasonal Fruit | Mangoes & Citrus | The Lyndon Cook",
    seoDescription:
      "Mangoes and citrus for wholesale and foodservice buyers. Variety, size, maturity and packing confirmed per programme. Availability depends on crop and shipping conditions.",
  },
  {
    id: "canned-food",
    slug: "canned-food",
    name: "NORN canned foods",
    shortName: "NORN",
    navLabel: "NORN",
    eyebrow: "Product brand",
    summary: "Beans, pulses, vegetables and tomatoes in easy-open cans.",
    description:
      "NORN is our canned-food brand: fourteen choices across beans and pulses, vegetables and tomatoes, in a 400 ml easy-open can format. 400 ml refers to the can format. Final net contents, drained weights and label details are confirmed by product specification.",
    image: CATEGORY_IMAGES["canned-food"],
    ctaLabel: "Explore NORN",
    groups: [
      {
        id: "beans-pulses",
        name: "Beans & pulses",
        description: "Baked beans, black, broad, pinto and kidney beans, and chickpeas.",
      },
      {
        id: "vegetables",
        name: "Vegetables",
        description: "Green peas, sweetcorn, creamed corn, mixed vegetables and peas & carrots.",
      },
      {
        id: "tomatoes",
        name: "Tomatoes",
        description: "Whole peeled tomatoes and San Marzano tomatoes.",
      },
    ],
    seoTitle: "NORN Canned Foods | The Lyndon Cook",
    seoDescription:
      "NORN canned foods from The Lyndon Cook: fourteen choices in a 400 ml easy-open can format across beans and pulses, vegetables and tomatoes.",
  },
  {
    id: "norn-rice-1lb",
    slug: "norn-rice-1lb",
    name: "NORN Rice 1lb",
    shortName: "NORN Rice 1lb",
    navLabel: "NORN Rice 1lb",
    eyebrow: "Product brand",
    summary:
      "NORN Rice in a convenient 1 lb pack format for retail and foodservice.",
    description:
      "NORN Rice 1lb is part of the NORN product range from The Lyndon Cook, supplied in a 1 lb pack format. Download the product datasheet for full specifications, or contact us to discuss your requirements.",
    image: CATEGORY_IMAGES["norn-rice-1lb"],
    ctaLabel: "Explore NORN Rice",
    groups: [
      {
        id: "norn-rice",
        name: "NORN Rice",
        description:
          "NORN Rice available in 1 lb pack format for retail and foodservice.",
      },
    ],
    pdf: {
      href: "/downloads/Norn Rice 1lb.pdf",
      label: "Download NORN Rice 1lb datasheet",
    },
    seoTitle: "NORN Rice 1lb | The Lyndon Cook",
    seoDescription:
      "NORN Rice in a 1 lb pack format from The Lyndon Cook. Download the product datasheet or contact us to discuss supply requirements.",
  },
  {
    id: "pasta",
    slug: "pasta",
    name: "Pasta",
    shortName: "Pasta",
    navLabel: "Pasta",
    eyebrow: "Category",
    summary:
      "Pasta products for retail, foodservice and institutional supply.",
    description:
      "Our pasta range covers a variety of formats for professional kitchens and retail. Download the product datasheet for full specifications, or contact us to discuss your requirements.",
    image: CATEGORY_IMAGES["pasta"],
    ctaLabel: "Explore pasta",
    groups: [
      {
        id: "dry-pasta",
        name: "Dry pasta",
        description:
          "Dried pasta formats for professional kitchens and retail supply.",
      },
      {
        id: "pasta-formats",
        name: "Pasta formats",
        description:
          "A range of pasta shapes and sizes for different applications.",
      },
    ],
    pdf: {
      href: "/downloads/Pasta.pdf",
      label: "Download Pasta datasheet",
    },
    seoTitle: "Pasta Supply | The Lyndon Cook",
    seoDescription:
      "Pasta products for wholesale, foodservice and institutional buyers. Download the product datasheet or contact us to discuss supply requirements with The Lyndon Cook.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isCategorySlug(value: string): boolean {
  return CATEGORIES.some((category) => category.slug === value);
}
