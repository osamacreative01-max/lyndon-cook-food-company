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
  | "canned-food";

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
    seoTitle: "Rice Supply | Basmati & White Rice | The Lyndon Cook Food Company",
    seoDescription:
      "Basmati and everyday white rice for wholesale, foodservice and institutional buyers. Agree variety, packing format and volume with The Lyndon Cook Food Company.",
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
    seoTitle: "Spices & Seasonings | The Lyndon Cook Food Company",
    seoDescription:
      "Ground spices, blends and finishing seasonings for B2B food buyers. Agree specification, packing format and planned volumes with The Lyndon Cook Food Company.",
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
    seoTitle: "Seasonal Fruit | Mangoes & Citrus | The Lyndon Cook Food Company",
    seoDescription:
      "Mangoes and citrus for wholesale and foodservice buyers. Variety, size, maturity and packing confirmed per programme. Availability depends on crop and shipping conditions.",
  },
  {
    id: "canned-food",
    slug: "canned-food",
    name: "NORM canned foods",
    shortName: "NORM",
    navLabel: "NORM",
    eyebrow: "Product brand",
    summary: "Beans, pulses, vegetables and tomatoes in easy-open cans.",
    description:
      "NORM is our canned-food brand: fourteen choices across beans and pulses, vegetables and tomatoes, in a 400 ml easy-open can format. 400 ml refers to the can format. Final net contents, drained weights and label details are confirmed by product specification.",
    image: CATEGORY_IMAGES["canned-food"],
    ctaLabel: "Explore NORM",
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
    seoTitle: "NORM Canned Foods | The Lyndon Cook Food Company",
    seoDescription:
      "NORM canned foods from The Lyndon Cook Food Company: fourteen choices in a 400 ml easy-open can format across beans and pulses, vegetables and tomatoes.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isCategorySlug(value: string): boolean {
  return CATEGORIES.some((category) => category.slug === value);
}
