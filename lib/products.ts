/**
 * The catalogue: 41 initial product records.
 *
 * 7 rice + 11 spices and seasonings + 9 seasonal fruit + 14 NORN canned foods.
 *
 * EDITING RULES (master build brief, section 55):
 * Never invent weights, case or pallet quantities, net contents, nutrition,
 * ingredients, allergens, storage, shelf life, grades, origins, seasons or
 * availability guarantees. Where a value is not confirmed, say it is agreed per
 * order. Product copy is edited here only - UI components never hardcode
 * product data.
 */

import { PRODUCT_IMAGES } from "@/lib/images";
import type { CategoryId } from "@/lib/categories";

export type ProductStatus = "active" | "draft";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  subgroup: string;
  subgroupName: string;
  brand: string;
  /** One sentence, used on cards and as the meta description seed. */
  summary: string;
  /** Two or three sentences for the detail page. */
  description: string;
  uses: string[];
  /** Confirmed facts only. Rendered as a definition list. */
  facts: { label: string; value: string }[];
  supplyNote: string;
  image: { src: string; alt: string };
  relatedProducts: string[];
  seoTitle: string;
  seoDescription: string;
  status: ProductStatus;
  enquiryEnabled: boolean;
};

const COMPANY = "The Lyndon Cook";
const BRAND_LINE = "A brand from The Lyndon Cook";

const RICE_SUPPLY =
  "Packing format and volume are confirmed per order. Final specification agreed with the customer.";
const SPICE_SUPPLY =
  "Grind, heat level and packing format are agreed to suit the application. Final specification agreed with the customer.";
const FRUIT_SUPPLY =
  "Variety, size, maturity, grade, origin and packing are confirmed per programme or order. Availability depends on crop and shipping conditions.";
const NORN_SUPPLY =
  "400 ml refers to the can format. Final net contents, drained weights and label details are confirmed by product specification.";

const RICE_FACTS = (variety: string, grouping: string) => [
  { label: "Variety", value: variety },
  { label: "Grouping", value: grouping },
  { label: "Brand", value: COMPANY },
  { label: "Specification", value: "Confirmed per order" },
];

const SPICE_FACTS = (form: string, extra: { label: string; value: string }[] = []) => [
  { label: "Form", value: form },
  ...extra,
  { label: "Brand", value: COMPANY },
  { label: "Specification", value: "Confirmed per order" },
];

const FRUIT_FACTS = (type: string, variety: string) => [
  { label: "Type", value: type },
  { label: "Variety", value: variety },
  { label: "Availability", value: "Depends on crop and shipping conditions" },
  { label: "Specification", value: "Confirmed per programme or order" },
];

const NORN_FACTS = (group: string) => [
  { label: "Brand", value: "NORN" },
  { label: "Brand line", value: BRAND_LINE },
  { label: "Group", value: group },
  { label: "Can format", value: "400 ml" },
  { label: "Opening", value: "Easy-open ring-pull" },
];

const riceProducts: Product[] = [
  {
    id: "rice-super-basmati",
    name: "Super Basmati",
    slug: "super-basmati",
    category: "rice",
    subgroup: "basmati",
    subgroupName: "Basmati",
    brand: COMPANY,
    summary:
      "Aromatic rice for pulao, pilafs and everyday dishes where fragrance and a light texture matter.",
    description:
      "Super Basmati is our aromatic Basmati option for kitchens that build flavour through the rice itself. It suits pulao, pilafs and everyday rice dishes where fragrance and a light texture are the priority. Grain specification and packing format are agreed before supply is planned.",
    uses: ["Pulao", "Pilafs", "Everyday rice dishes"],
    facts: RICE_FACTS("Super Basmati", "Basmati"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.superBasmati,
    relatedProducts: [],
    seoTitle: "Super Basmati Rice | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Aromatic Super Basmati rice for pulao, pilafs and everyday dishes. Agree grain specification, packing format and volume with The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-1121-steam-basmati",
    name: "1121 Steam Basmati",
    slug: "1121-steam-basmati",
    category: "rice",
    subgroup: "basmati",
    subgroupName: "Basmati",
    brand: COMPANY,
    summary:
      "Slender grains with an elegant appearance on the plate. Well suited to biryani and rice dishes where grain separation and presentation are priorities.",
    description:
      "1121 Steam Basmati is selected for its slender grain and its appearance once cooked, which matters for plated service and for dishes such as biryani where grain separation is visible. Grain dimensions and cooking performance are agreed against your product standard.",
    uses: ["Biryani", "Rice dishes", "Plated service"],
    facts: RICE_FACTS("1121 Steam Basmati", "Basmati"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.steamBasmati,
    relatedProducts: [],
    seoTitle: "1121 Steam Basmati Rice | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "1121 Steam Basmati with slender grains and a strong plated appearance, suited to biryani and rice dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-1121-sella-basmati",
    name: "1121 Sella Basmati",
    slug: "1121-sella-basmati",
    category: "rice",
    subgroup: "basmati",
    subgroupName: "Basmati",
    brand: COMPANY,
    summary:
      "A parboiled Basmati option for catering and batch preparation. Preferred grain appearance and cooking performance should be specified as part of the agreed product standard.",
    description:
      "1121 Sella Basmati is a parboiled Basmati option aimed at catering and batch preparation, where holding quality and predictable cooking are useful. The preferred grain appearance and cooking performance are specified as part of the agreed product standard.",
    uses: ["Catering service", "Batch preparation", "Hold and finish"],
    facts: RICE_FACTS("1121 Sella Basmati", "Basmati"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.sellaBasmati,
    relatedProducts: [],
    seoTitle: "1121 Sella Basmati Rice | Parboiled Basmati | The Lyndon Cook",
    seoDescription:
      "Parboiled 1121 Sella Basmati for catering and batch preparation. Preferred grain appearance and cooking performance are specified per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-irri-6-white-rice",
    name: "IRRI 6 White Rice",
    slug: "irri-6-white-rice",
    category: "rice",
    subgroup: "everyday",
    subgroupName: "Everyday varieties",
    brand: COMPANY,
    summary: "Straightforward, economical white rice for everyday meals and volume supply.",
    description:
      "IRRI 6 White Rice is our straightforward everyday white rice, suited to menus where the rice is a staple rather than the focus of the dish. It is a practical choice for volume supply across foodservice and institutional kitchens.",
    uses: ["Everyday meals", "Volume supply", "Staple menu items"],
    facts: RICE_FACTS("IRRI 6", "Non-Basmati white rice"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.irri6,
    relatedProducts: [],
    seoTitle: "IRRI 6 White Rice | Everyday Rice Supply | The Lyndon Cook",
    seoDescription:
      "IRRI 6 white rice for everyday meals and volume supply. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-pk-386-long-grain",
    name: "PK-386 Long Grain Rice",
    slug: "pk-386-long-grain-rice",
    category: "rice",
    subgroup: "everyday",
    subgroupName: "Everyday varieties",
    brand: COMPANY,
    summary:
      "A non-Basmati option with slender grains, suited to customers seeking a long-grain presentation for everyday cooking.",
    description:
      "PK-386 is a non-Basmati long grain option. It suits customers who want the slender long-grain look of an everyday rice without moving to an aromatic Basmati specification, and works well across high-volume everyday cooking.",
    uses: ["Everyday cooking", "Long grain presentation", "Batch service"],
    facts: RICE_FACTS("PK-386", "Non-Basmati long grain"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.pk386,
    relatedProducts: [],
    seoTitle: "PK-386 Long Grain Rice | Non-Basmati Supply | The Lyndon Cook",
    seoDescription:
      "PK-386 long grain rice with slender grains for everyday cooking and long-grain presentation. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-irri-9-c9",
    name: "IRRI 9 / C9 Rice",
    slug: "irri-9-c9-rice",
    category: "rice",
    subgroup: "everyday",
    subgroupName: "Everyday varieties",
    brand: COMPANY,
    summary:
      "A non-Basmati option. Grain dimensions, broken content and cooking requirements are confirmed against customer specification.",
    description:
      "IRRI 9 / C9 is a non-Basmati option for buyers who work to a precise internal standard. Grain dimensions, broken content and cooking requirements are confirmed against your specification before supply is planned.",
    uses: ["Specification-led buying", "Volume supply", "Batch cooking"],
    facts: RICE_FACTS("IRRI 9 / C9", "Non-Basmati"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.irri9,
    relatedProducts: [],
    seoTitle: "IRRI 9 / C9 Rice | Specification-Led Supply | The Lyndon Cook",
    seoDescription:
      "IRRI 9 / C9 non-Basmati rice. Grain dimensions, broken content and cooking requirements confirmed against customer specification.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "rice-100-broken",
    name: "100% Broken Rice",
    slug: "100-broken-rice",
    category: "rice",
    subgroup: "everyday",
    subgroupName: "Everyday varieties",
    brand: COMPANY,
    summary:
      "Broken-grain rice for applications where a whole-grain appearance is not essential, including porridge-style dishes and selected food-manufacturing uses.",
    description:
      "100% Broken Rice is supplied for applications where a whole-grain appearance is not essential. It is used in porridge-style dishes and in selected food-manufacturing processes, where the broken grain behaves predictably during cooking.",
    uses: ["Porridge-style dishes", "Food manufacturing", "Batching"],
    facts: RICE_FACTS("100% broken grain", "Non-Basmati broken"),
    supplyNote: RICE_SUPPLY,
    image: PRODUCT_IMAGES.brokenRice,
    relatedProducts: [],
    seoTitle: "100% Broken Rice | Bulk Rice Supply | The Lyndon Cook",
    seoDescription:
      "100% broken grain rice for porridge-style dishes and food-manufacturing uses where whole-grain appearance is not essential.",
    status: "active",
    enquiryEnabled: true,
  },
];

const spiceProducts: Product[] = [
  {
    id: "spice-ground-cumin",
    name: "Ground Cumin",
    slug: "ground-cumin",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary: "Warm and earthy, for curries, marinades, soups and savoury rice dishes.",
    description:
      "Ground cumin is the workhorse of the spice range: warm, earthy and familiar. It is used across curries, marinades, soups and savoury rice dishes, and is a common base in house blends where a buyer wants a single consistent ground spice.",
    uses: ["Curries", "Marinades", "Soups", "Savoury rice dishes"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundCumin,
    relatedProducts: [],
    seoTitle: "Ground Cumin | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground cumin for curries, marinades, soups and savoury rice dishes. Grind and packing format agreed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-ground-coriander",
    name: "Ground Coriander",
    slug: "ground-coriander",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary:
      "Gentle citrus notes and a rounded flavour, suited to sauces, vegetable dishes and everyday seasoning.",
    description:
      "Ground coriander brings gentle citrus notes and a rounded flavour rather than heat. It is used in sauces, vegetable dishes and as an everyday seasoning, and pairs naturally with cumin where a blend is built in-house.",
    uses: ["Sauces", "Vegetable dishes", "Everyday seasoning"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundCoriander,
    relatedProducts: [],
    seoTitle: "Ground Coriander | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground coriander with gentle citrus notes for sauces, vegetable dishes and everyday seasoning. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-ground-ginger",
    name: "Ground Ginger",
    slug: "ground-ginger",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary: "A warming ingredient for baking, sauces and spice blends.",
    description:
      "Ground ginger adds warmth without the sharpness of fresh ginger. It is used in baking, in sauces and as a component of house spice blends, where a consistent ground format keeps batch results repeatable.",
    uses: ["Baking", "Sauces", "Spice blends"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundGinger,
    relatedProducts: [],
    seoTitle: "Ground Ginger | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground ginger for baking, sauces and spice blends. Grind and packing format agreed to suit the application.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-ground-black-pepper",
    name: "Ground Black Pepper",
    slug: "ground-black-pepper",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary: "A familiar finishing spice with a lively bite.",
    description:
      "Ground black pepper is a familiar finishing spice with a lively bite. It is used as a table and finishing seasoning, and in sauce and seasoning work where a consistent grind keeps results predictable across services.",
    uses: ["Finishing", "Table service", "Seasoning blends"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundBlackPepper,
    relatedProducts: [],
    seoTitle: "Ground Black Pepper | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground black pepper for finishing and everyday seasoning. Grind and packing format confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-ground-turmeric",
    name: "Ground Turmeric",
    slug: "ground-turmeric",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary: "An earthy spice with a rich golden colour.",
    description:
      "Ground turmeric contributes an earthy note and a rich golden colour, so it does visible work as well as flavour work. It is used across curries, rice dishes, pickles and vegetable preparations.",
    uses: ["Curries", "Rice dishes", "Pickles and vegetable work"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundTurmeric,
    relatedProducts: [],
    seoTitle: "Ground Turmeric | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground turmeric for curries, rice dishes and vegetable work. Specification confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-garam-masala",
    name: "Garam Masala",
    slug: "garam-masala",
    category: "spices",
    subgroup: "blends",
    subgroupName: "Blends",
    brand: COMPANY,
    summary: "An aromatic spice blend for warmth and depth.",
    description:
      "Garam Masala is an aromatic blend used for warmth and depth rather than heat. It is typically finished towards the end of cooking, and suits curries and slow-cooked dishes where layered aroma is the aim. The blend profile is agreed against the intended menu.",
    uses: ["Curries", "Slow-cooked dishes", "Finishing blends"],
    facts: SPICE_FACTS("Blend", [{ label: "Heat level", value: "Agreed to suit customers" }]),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.garamMasala,
    relatedProducts: [],
    seoTitle: "Garam Masala | Wholesale Spice Blend | The Lyndon Cook",
    seoDescription:
      "Garam Masala, an aromatic spice blend for warmth and depth in curries and slow-cooked dishes. Blend profile agreed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-red-chilli-powder",
    name: "Red Chilli Powder",
    slug: "red-chilli-powder",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary:
      "A versatile source of heat and colour. Heat level and specification are agreed to suit customers.",
    description:
      "Red Chilli Powder provides heat and colour in one ingredient. It is used in curries, sauces, marinades and finishing work, and the heat level is agreed with the customer so a single product can suit different menus.",
    uses: ["Curries", "Sauces", "Marinades", "Finishing"],
    facts: SPICE_FACTS("Ground", [
      { label: "Heat level", value: "Agreed to suit customers" },
    ]),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.redChilliPowder,
    relatedProducts: [],
    seoTitle: "Red Chilli Powder | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Red chilli powder for heat and colour in curries, sauces and marinades. Heat level agreed to suit your menu.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-ground-fenugreek",
    name: "Ground Fenugreek",
    slug: "ground-fenugreek",
    category: "spices",
    subgroup: "ground",
    subgroupName: "Ground spices",
    brand: COMPANY,
    summary:
      "A distinctive, slightly bitter seasoning for balanced curry blends, sauces and marinades.",
    description:
      "Ground fenugreek is distinctive and slightly bitter, and it is the seasoning that gives many curry blends their depth. It is used in balanced blends, in sauces and in marinades, where a measured quantity shapes the finished dish.",
    uses: ["Curry blends", "Sauces", "Marinades"],
    facts: SPICE_FACTS("Ground"),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.groundFenugreek,
    relatedProducts: [],
    seoTitle: "Ground Fenugreek | Wholesale Spice Supply | The Lyndon Cook",
    seoDescription:
      "Ground fenugreek, a slightly bitter seasoning for balanced curry blends, sauces and marinades. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-curry-powder",
    name: "Curry Powder",
    slug: "curry-powder",
    category: "spices",
    subgroup: "blends",
    subgroupName: "Blends",
    brand: COMPANY,
    summary:
      "A convenient blend for curries, soups and sauces. Flavour profile and heat level can be selected for the intended menu.",
    description:
      "Curry Powder is a convenience blend that gives a consistent base without building a house blend from separate components. It is used in curries, soups and sauces, and the flavour profile and heat level are selected against the intended menu.",
    uses: ["Curries", "Soups", "Sauces"],
    facts: SPICE_FACTS("Blend", [
      { label: "Heat level", value: "Selected for the intended menu" },
    ]),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.curryPowder,
    relatedProducts: [],
    seoTitle: "Curry Powder | Wholesale Spice Blend | The Lyndon Cook",
    seoDescription:
      "Curry powder blend for curries, soups and sauces, with flavour profile and heat level selected for your menu.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-dry-mango-powder",
    name: "Dry Mango Powder",
    slug: "dry-mango-powder",
    category: "spices",
    subgroup: "seasonings",
    subgroupName: "Seasonings",
    brand: COMPANY,
    summary: "Also known as amchur. A tangy seasoning for chutneys, marinades and savoury dishes.",
    description:
      "Dry Mango Powder, also known as amchur, is a tangy seasoning that adds sourness without liquid. It is used in chutneys, in marinades and across savoury dishes, and works well where a finished dish needs acidity built in rather than added at the table.",
    uses: ["Chutneys", "Marinades", "Savoury dishes"],
    facts: SPICE_FACTS("Seasoning", [{ label: "Also known as", value: "Amchur" }]),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.dryMangoPowder,
    relatedProducts: [],
    seoTitle: "Dry Mango Powder (Amchur) | The Lyndon Cook",
    seoDescription:
      "Dry mango powder, also known as amchur: a tangy seasoning for chutneys, marinades and savoury dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "spice-himalayan-pink-salt",
    name: "Himalayan Pink Salt",
    slug: "himalayan-pink-salt",
    category: "spices",
    subgroup: "seasonings",
    subgroupName: "Seasonings",
    brand: COMPANY,
    summary:
      "Pink rock salt for everyday seasoning and finishing. Grain size and packing format are agreed to suit the application.",
    description:
      "Himalayan Pink Salt is supplied for everyday seasoning and for finishing. Grain size and packing format are agreed to suit the application, whether that is a back-of-house container, a table service or a retail-facing pack.",
    uses: ["Everyday seasoning", "Finishing", "Table service"],
    facts: SPICE_FACTS("Seasoning", [{ label: "Grain size", value: "Agreed to suit the application" }]),
    supplyNote: SPICE_SUPPLY,
    image: PRODUCT_IMAGES.pinkSalt,
    relatedProducts: [],
    seoTitle: "Himalayan Pink Salt | Wholesale Seasoning | The Lyndon Cook",
    seoDescription:
      "Himalayan pink rock salt for everyday seasoning and finishing. Grain size and packing format agreed to suit the application.",
    status: "active",
    enquiryEnabled: true,
  },
];

const fruitProducts: Product[] = [
  {
    id: "fruit-chaunsa",
    name: "Chaunsa",
    slug: "chaunsa",
    category: "seasonal-fruit",
    subgroup: "mangoes",
    subgroupName: "Mangoes",
    brand: COMPANY,
    summary:
      "A named mango variety supplied against an agreed programme, maturity and packing requirement.",
    description:
      "Chaunsa is one of the named mango varieties in our seasonal fruit programme. It is supplied against an agreed maturity, size and packing requirement for the intended use. Availability depends on crop and shipping conditions.",
    uses: ["Fresh retail programmes", "Foodservice menus", "Dessert and garnish work"],
    facts: FRUIT_FACTS("Mango", "Chaunsa"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.chaunsa,
    relatedProducts: [],
    seoTitle: "Chaunsa Mangoes | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Chaunsa mangoes supplied against an agreed programme. Variety, size, maturity, grade and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-langra",
    name: "Langra",
    slug: "langra",
    category: "seasonal-fruit",
    subgroup: "mangoes",
    subgroupName: "Mangoes",
    brand: COMPANY,
    summary:
      "A named mango variety supplied within the seasonal mango programme, subject to crop availability.",
    description:
      "Langra is offered within our seasonal mango programme. Packing format, maturity and volume are confirmed per programme or order, and availability depends on crop and shipping conditions. Tell us the destination and schedule you are working to.",
    uses: ["Seasonal fruit programmes", "Retail supply", "Foodservice menus"],
    facts: FRUIT_FACTS("Mango", "Langra"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.langra,
    relatedProducts: [],
    seoTitle: "Langra Mangoes | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Langra mangoes supplied within a seasonal programme. Packing format, maturity and volume confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-anwar-ratol",
    name: "Anwar Ratol",
    slug: "anwar-ratol",
    category: "seasonal-fruit",
    subgroup: "mangoes",
    subgroupName: "Mangoes",
    brand: COMPANY,
    summary:
      "A named mango variety supplied against an agreed programme and maturity requirement.",
    description:
      "Anwar Ratol is one of the named mango varieties we can plan supply around. Variety, size, maturity, grade, origin and packing are confirmed per programme or order. Availability depends on crop and shipping conditions.",
    uses: ["Seasonal fruit programmes", "Premium retail supply", "Foodservice menus"],
    facts: FRUIT_FACTS("Mango", "Anwar Ratol"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.anwarRatol,
    relatedProducts: [],
    seoTitle: "Anwar Ratol Mangoes | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Anwar Ratol mangoes supplied against an agreed programme and maturity requirement. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-sindhri",
    name: "Sindhri",
    slug: "sindhri",
    category: "seasonal-fruit",
    subgroup: "mangoes",
    subgroupName: "Mangoes",
    brand: COMPANY,
    summary:
      "A named mango variety supplied within the seasonal programme, confirmed per order.",
    description:
      "Sindhri is offered as a named option within the seasonal mango programme. The maturity, size and packing requirements are confirmed per programme or order so the fruit is matched to your handling and service plan.",
    uses: ["Seasonal fruit programmes", "Retail supply", "Kitchen preparation"],
    facts: FRUIT_FACTS("Mango", "Sindhri"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.sindhri,
    relatedProducts: [],
    seoTitle: "Sindhri Mangoes | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Sindhri mangoes supplied within a seasonal programme. Maturity, size and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-dussehri",
    name: "Dussehri",
    slug: "dussehri",
    category: "seasonal-fruit",
    subgroup: "mangoes",
    subgroupName: "Mangoes",
    brand: COMPANY,
    summary:
      "A named mango variety supplied within the seasonal programme, confirmed per order.",
    description:
      "Dussehri is another named variety in the seasonal mango programme. We confirm variety, size, maturity, grade, origin and packing per programme or order, and availability depends on crop and shipping conditions.",
    uses: ["Seasonal fruit programmes", "Retail supply", "Foodservice menus"],
    facts: FRUIT_FACTS("Mango", "Dussehri"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.dussehri,
    relatedProducts: [],
    seoTitle: "Dussehri Mangoes | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Dussehri mangoes supplied within a seasonal programme, subject to crop and shipping conditions.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-kinnow",
    name: "Kinnow",
    slug: "kinnow",
    category: "seasonal-fruit",
    subgroup: "citrus",
    subgroupName: "Citrus",
    brand: COMPANY,
    summary:
      "A named citrus option supplied against an agreed programme, size and packing requirement.",
    description:
      "Kinnow is one of the named citrus options in our seasonal fruit range. It is supplied against an agreed size, maturity and packing requirement for the intended use, with availability depending on crop and shipping conditions.",
    uses: ["Juice and beverage work", "Foodservice menus", "Fresh display"],
    facts: FRUIT_FACTS("Citrus", "Kinnow"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.kinnow,
    relatedProducts: [],
    seoTitle: "Kinnow Citrus | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Kinnow citrus supplied against an agreed programme, size and packing requirement. Availability depends on crop and shipping conditions.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-sangtra",
    name: "Sangtra",
    slug: "sangtra",
    category: "seasonal-fruit",
    subgroup: "citrus",
    subgroupName: "Citrus",
    brand: COMPANY,
    summary:
      "A named citrus option supplied against an agreed programme, confirmed per order.",
    description:
      "Sangtra is offered as a named citrus option. Variety, size, maturity, grade, origin and packing are confirmed per programme or order, so the fruit is matched to the way your kitchen handles and serves it.",
    uses: ["Foodservice menus", "Juice and beverage work", "Fresh display"],
    facts: FRUIT_FACTS("Citrus", "Sangtra"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.sangtra,
    relatedProducts: [],
    seoTitle: "Sangtra Citrus | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Sangtra citrus supplied against an agreed programme, with size, maturity and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-fruiter",
    name: "Fruiter",
    slug: "fruiter",
    category: "seasonal-fruit",
    subgroup: "citrus",
    subgroupName: "Citrus",
    brand: COMPANY,
    summary:
      "A named citrus option supplied against an agreed programme, size and packing requirement.",
    description:
      "Fruiter is one of the named citrus options available within a programme. The size, maturity and packing requirements are confirmed per programme or order, and availability depends on crop and shipping conditions.",
    uses: ["Fresh display", "Foodservice menus", "Retail supply"],
    facts: FRUIT_FACTS("Citrus", "Fruiter"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.fruiter,
    relatedProducts: [],
    seoTitle: "Fruiter Citrus | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Fruiter citrus supplied against an agreed programme, with size, maturity and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "fruit-malta",
    name: "Malta",
    slug: "malta",
    category: "seasonal-fruit",
    subgroup: "citrus",
    subgroupName: "Citrus",
    brand: COMPANY,
    summary:
      "A named citrus option supplied against an agreed programme, confirmed per order.",
    description:
      "Malta is offered as a named citrus option. Variety, size, maturity, grade, origin and packing are confirmed per programme or order, and availability depends on crop and shipping conditions.",
    uses: ["Juice and beverage work", "Foodservice menus", "Kitchen preparation"],
    facts: FRUIT_FACTS("Citrus", "Malta"),
    supplyNote: FRUIT_SUPPLY,
    image: PRODUCT_IMAGES.malta,
    relatedProducts: [],
    seoTitle: "Malta Citrus | Seasonal Fruit Supply | The Lyndon Cook",
    seoDescription:
      "Malta citrus supplied against an agreed programme, with size, maturity and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
];

const nornProducts: Product[] = [
  {
    id: "norn-baked-beans",
    name: "Baked Beans",
    slug: "baked-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Baked beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "Baked Beans from the NORN range: a straightforward, familiar pantry staple presented in a 400 ml easy-open can. Ingredients, net contents and drained weight are confirmed by product specification rather than published here.",
    uses: ["Breakfast and brunch service", "Canteen menus", "Pantry programmes"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.bakedBeans,
    relatedProducts: [],
    seoTitle: "NORN Baked Beans | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN baked beans in a 400 ml easy-open can. A brand from The Lyndon Cook. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-black-beans",
    name: "Black Beans",
    slug: "black-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Black beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Black Beans are a useful base for Mexican-inspired dishes, salads, bowls and chilled or heated counters. They come in the 400 ml easy-open can used across the range, with net contents and drained weight confirmed by product specification.",
    uses: ["Bowls and salads", "Chilli and Mexican-inspired dishes", "Hot counters"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.blackBeans,
    relatedProducts: [],
    seoTitle: "NORN Black Beans | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN black beans in a 400 ml easy-open can, for bowls, salads and Mexican-inspired dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-broad-beans",
    name: "Broad Beans",
    slug: "broad-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Broad beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Broad Beans suit seasonal menus and traditional dishes where prepared broad beans are needed without prep. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Seasonal menus", "Traditional dishes", "Cold and hot counters"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.broadBeans,
    relatedProducts: [],
    seoTitle: "NORN Broad Beans | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN broad beans in a 400 ml easy-open can for seasonal menus and traditional dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-chickpeas",
    name: "Chickpeas",
    slug: "chickpeas",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Chickpeas in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Chickpeas are a versatile pulse for salads, curries, hummus-style preparations and hot dishes. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Salads and mezze", "Curries", "Hot counters"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.chickpeas,
    relatedProducts: [],
    seoTitle: "NORN Chickpeas | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN chickpeas in a 400 ml easy-open can for salads, mezze, curries and hot dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-pinto-beans",
    name: "Pinto Beans",
    slug: "pinto-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Pinto beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Pinto Beans work in chilli and bean dishes, salads and where a softer, creamier pulse texture suits the dish. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Chilli and bean dishes", "Soups", "Salads and bowls"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.pintoBeans,
    relatedProducts: [],
    seoTitle: "NORN Pinto Beans | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN pinto beans in a 400 ml easy-open can for chilli, soups, salads and bowls. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-red-kidney-beans",
    name: "Red Kidney Beans",
    slug: "red-kidney-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "Red kidney beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Red Kidney Beans hold their shape well, which makes them a reliable choice for chillies, curries and mixed bean dishes. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Chilli and curry dishes", "Mixed bean dishes", "Menus and batch cooking"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.redKidneyBeans,
    relatedProducts: [],
    seoTitle: "NORN Red Kidney Beans | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN red kidney beans in a 400 ml easy-open can for chilli, curry and mixed bean dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-white-kidney-beans",
    name: "White Kidney Beans",
    slug: "white-kidney-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORN",
    summary:
      "White kidney beans in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN White Kidney Beans suit salads, soups, casseroles and Mediterranean-style dishes where a mild pulse is wanted. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Salads", "Soups and casseroles", "Mediterranean-style dishes"],
    facts: NORN_FACTS("Beans & pulses"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.whiteKidneyBeans,
    relatedProducts: [],
    seoTitle: "NORN White Kidney Beans | 400 ml Can | The Lyndon Cook",
    seoDescription:
      "NORN white kidney beans in a 400 ml easy-open can for salads, soups and casseroles. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-green-peas",
    name: "Green Peas",
    slug: "green-peas",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORN",
    summary:
      "Green peas in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Green Peas are a straightforward vegetable for rice dishes, pasta, salads and canteen menus. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Rice and pasta dishes", "Salads", "Canteen menus"],
    facts: NORN_FACTS("Vegetables"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.greenPeas,
    relatedProducts: [],
    seoTitle: "NORN Green Peas | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN green peas in a 400 ml easy-open can for rice dishes, pasta, salads and canteen menus. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-sweetcorn",
    name: "Sweetcorn",
    slug: "sweetcorn",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORN",
    summary:
      "Sweetcorn in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Sweetcorn works in rice dishes, salads, dips and alongside hot counters. They are supplied in the 400 ml easy-open can used across the range, with net contents and drained weight confirmed by product specification.",
    uses: ["Rice and grain dishes", "Salads and dips", "Hot counters"],
    facts: NORN_FACTS("Vegetables"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.sweetcorn,
    relatedProducts: [],
    seoTitle: "NORN Sweetcorn | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN sweetcorn in a 400 ml easy-open can for rice dishes, salads, dips and hot counters. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-creamed-corn",
    name: "Creamed Corn",
    slug: "creamed-corn",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORN",
    summary:
      "Creamed corn in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Creamed Corn is a ready-to-use option for buffet counters, fillings and vegetable dishes where a smooth corn preparation is wanted. It is supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Buffet counters", "Fillings and bakes", "Vegetable dishes"],
    facts: NORN_FACTS("Vegetables"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.creamedCorn,
    relatedProducts: [],
    seoTitle: "NORN Creamed Corn | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN creamed corn in a 400 ml easy-open can for buffet counters, fillings and vegetable dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-mixed-vegetables",
    name: "Mixed Vegetables",
    slug: "mixed-vegetables",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORN",
    summary:
      "Mixed vegetables in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Mixed Vegetables suit stir-fry style dishes, pies, pasta and batch cooking where a blended vegetable is more practical than separate preparation. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Stir-fry style dishes", "Pies and pasta", "Batch cooking"],
    facts: NORN_FACTS("Vegetables"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.mixedVegetables,
    relatedProducts: [],
    seoTitle: "NORN Mixed Vegetables | 400 ml Easy-Open Can | The Lyndon Cook",
    seoDescription:
      "NORN mixed vegetables in a 400 ml easy-open can for pies, pasta, stir-fry style dishes and batch cooking. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-peas-and-carrots",
    name: "Peas & Carrots",
    slug: "peas-and-carrots",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORN",
    summary:
      "Peas and carrots in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Peas & Carrots are a familiar combination for rice dishes, pies, buffets and canteen menus. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Rice dishes", "Pies and buffets", "Canteen menus"],
    facts: NORN_FACTS("Vegetables"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.peasAndCarrots,
    relatedProducts: [],
    seoTitle: "NORN Peas & Carrots | 400 ml Can | The Lyndon Cook",
    seoDescription:
      "NORN peas and carrots in a 400 ml easy-open can for rice dishes, pies, buffets and canteen menus. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-whole-peeled-tomatoes",
    name: "Whole Peeled Tomatoes",
    slug: "whole-peeled-tomatoes",
    category: "canned-food",
    subgroup: "tomatoes",
    subgroupName: "Tomatoes",
    brand: "NORN",
    summary:
      "Whole peeled tomatoes in a 400 ml easy-open can, part of the NORN canned-food range.",
    description:
      "NORN Whole Peeled Tomatoes are suited to sauces, stews and dishes where whole pieces are wanted rather than a crushed preparation. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Sauces", "Stews and braises", "Soups"],
    facts: NORN_FACTS("Tomatoes"),
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.wholePeeledTomatoes,
    relatedProducts: [],
    seoTitle: "NORN Whole Peeled Tomatoes | 400 ml Can | The Lyndon Cook",
    seoDescription:
      "NORN whole peeled tomatoes in a 400 ml easy-open can for sauces, stews and soups. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-san-marzano-tomatoes",
    name: "San Marzano Tomatoes",
    slug: "san-marzano-tomatoes",
    category: "canned-food",
    subgroup: "tomatoes",
    subgroupName: "Tomatoes",
    brand: "NORN",
    summary:
      "San Marzano tomatoes from Italy, for sauces, soups and slow-cooked dishes. Presented in a 400 ml easy-open can.",
    description:
      "San Marzano tomatoes from Italy, for sauces, soups and slow-cooked dishes. Presented in a 400 ml easy-open can. The pack carries British English and Italian wording with a small Italian tricolour. Final net contents and label details are confirmed by product specification.",
    uses: ["Pasta and pizza sauces", "Soups", "Slow-cooked dishes"],
    facts: [
      { label: "Brand", value: "NORN" },
      { label: "Brand line", value: BRAND_LINE },
      { label: "Group", value: "Tomatoes" },
      { label: "Variety", value: "San Marzano" },
      { label: "Country of origin", value: "Product of Italy" },
      { label: "Can format", value: "400 ml" },
      { label: "Opening", value: "Easy-open" },
      { label: "Pack language", value: "British English and Italian" },
    ],
    supplyNote: NORN_SUPPLY,
    image: PRODUCT_IMAGES.sanMarzanoTomatoes,
    relatedProducts: [],
    seoTitle: "NORN San Marzano Tomatoes | 400 ml Can | The Lyndon Cook",
    seoDescription:
      "NORN San Marzano tomatoes from Italy in a 400 ml easy-open can, for sauces, soups and slow-cooked dishes. A brand from The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
];

/**
 * Related products are derived rather than hand-maintained, so a record is never
 * orphaned. Priority: same subgroup, then same category, then cross-category
 * staples. Slugs only - resolved with `getProductBySlug` at render time.
 */
function withRelated(items: Product[]): Product[] {
  return items.map((product) => {
    const sameSubgroup = items
      .filter(
        (candidate) =>
          candidate.id !== product.id &&
          candidate.category === product.category &&
          candidate.subgroup === product.subgroup
      )
      .map((candidate) => candidate.slug);
    const sameCategory = items
      .filter(
        (candidate) =>
          candidate.id !== product.id &&
          candidate.category === product.category &&
          candidate.subgroup !== product.subgroup
      )
      .map((candidate) => candidate.slug);
    return { ...product, relatedProducts: [...sameSubgroup, ...sameCategory].slice(0, 3) };
  });
}

const nornRiceProducts: Product[] = [
  {
    id: "norn-rice-1lb-white",
    name: "NORN White Rice 1lb",
    slug: "norn-white-rice-1lb",
    category: "norn-rice-1lb",
    subgroup: "norn-rice",
    subgroupName: "NORN Rice",
    brand: "NORN",
    summary:
      "White rice in a convenient 1 lb pack format, part of the NORN product range.",
    description:
      "NORN White Rice in a 1 lb pack format is a practical option for retail shelves and smaller foodservice requirements. The pack format keeps portioning straightforward. Final specification is confirmed by product specification.",
    uses: ["Retail shelves", "Small foodservice packs", "Everyday cooking"],
    facts: [
      { label: "Brand", value: "NORN" },
      { label: "Brand line", value: BRAND_LINE },
      { label: "Pack format", value: "1 lb" },
      { label: "Type", value: "White rice" },
    ],
    supplyNote:
      "1 lb refers to the pack format. Final net contents and label details are confirmed by product specification.",
    image: PRODUCT_IMAGES.nornRice1lb,
    relatedProducts: [],
    seoTitle: "NORN White Rice 1lb | The Lyndon Cook",
    seoDescription:
      "NORN White Rice in a 1 lb pack format. A brand from The Lyndon Cook. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-rice-1lb-basmati",
    name: "NORN Basmati Rice 1lb",
    slug: "norn-basmati-rice-1lb",
    category: "norn-rice-1lb",
    subgroup: "norn-rice",
    subgroupName: "NORN Rice",
    brand: "NORN",
    summary:
      "Aromatic Basmati rice in a 1 lb pack format, part of the NORN product range.",
    description:
      "NORN Basmati Rice in a 1 lb pack format brings an aromatic option to the NORN range. Suited to retail and smaller foodservice requirements where fragrance and grain appearance matter. Final specification is confirmed by product specification.",
    uses: ["Retail shelves", "Speciality foodservice", "Pulao and biryani"],
    facts: [
      { label: "Brand", value: "NORN" },
      { label: "Brand line", value: BRAND_LINE },
      { label: "Pack format", value: "1 lb" },
      { label: "Type", value: "Basmati rice" },
    ],
    supplyNote:
      "1 lb refers to the pack format. Final net contents and label details are confirmed by product specification.",
    image: PRODUCT_IMAGES.nornRiceBasmati,
    relatedProducts: [],
    seoTitle: "NORN Basmati Rice 1lb | The Lyndon Cook",
    seoDescription:
      "NORN Basmati Rice in a 1 lb pack format. A brand from The Lyndon Cook. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norn-rice-1lb-sella",
    name: "NORN Sella Rice 1lb",
    slug: "norn-sella-rice-1lb",
    category: "norn-rice-1lb",
    subgroup: "norn-rice",
    subgroupName: "NORN Rice",
    brand: "NORN",
    summary:
      "Parboiled Sella rice in a 1 lb pack format, part of the NORN product range.",
    description:
      "NORN Sella Rice in a 1 lb pack format is a parboiled option suited to batch preparation and catering. The pack format keeps portioning straightforward. Final specification is confirmed by product specification.",
    uses: ["Catering service", "Batch preparation", "Retail shelves"],
    facts: [
      { label: "Brand", value: "NORN" },
      { label: "Brand line", value: BRAND_LINE },
      { label: "Pack format", value: "1 lb" },
      { label: "Type", value: "Parboiled Sella rice" },
    ],
    supplyNote:
      "1 lb refers to the pack format. Final net contents and label details are confirmed by product specification.",
    image: PRODUCT_IMAGES.nornRiceSella,
    relatedProducts: [],
    seoTitle: "NORN Sella Rice 1lb | The Lyndon Cook",
    seoDescription:
      "NORN Sella Rice in a 1 lb pack format. A brand from The Lyndon Cook. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
];

const pastaProducts: Product[] = [
  {
    id: "pasta-spaghetti",
    name: "Spaghetti",
    slug: "spaghetti",
    category: "pasta",
    subgroup: "dry-pasta",
    subgroupName: "Dry pasta",
    brand: COMPANY,
    summary:
      "Classic thin, long pasta strands for a wide range of dishes.",
    description:
      "Spaghetti is a versatile long pasta that suits tomato-based sauces, oil-based preparations and baked dishes. It is a staple across professional kitchens and retail shelves. Packing format and volume are agreed per order.",
    uses: ["Tomato-based sauces", "Oil-based preparations", "Baked dishes"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.spaghetti,
    relatedProducts: [],
    seoTitle: "Spaghetti | Wholesale Pasta Supply | The Lyndon Cook",
    seoDescription:
      "Classic spaghetti pasta for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "pasta-penne",
    name: "Penne",
    slug: "penne",
    category: "pasta",
    subgroup: "dry-pasta",
    subgroupName: "Dry pasta",
    brand: COMPANY,
    summary:
      "Tube-shaped pasta with angled cuts, ideal for baked dishes and sauces.",
    description:
      "Penne is a tube-shaped pasta with angled cuts that holds sauces well, making it a strong choice for baked dishes, pasta salads and hearty sauces. Packing format and volume are agreed per order.",
    uses: ["Baked dishes", "Pasta salads", "Hearty sauces"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.penne,
    relatedProducts: [],
    seoTitle: "Penne Pasta | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Penne tube-shaped pasta for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "pasta-macaroni",
    name: "Macaroni",
    slug: "macaroni",
    category: "pasta",
    subgroup: "dry-pasta",
    subgroupName: "Dry pasta",
    brand: COMPANY,
    summary:
      "Curved tube pasta for casseroles, salads and cheese-based dishes.",
    description:
      "Macaroni is a curved tube pasta that works well in casseroles, pasta salads and cheese-based dishes. It is a familiar format across canteen menus and retail. Packing format and volume are agreed per order.",
    uses: ["Casseroles", "Pasta salads", "Cheese-based dishes"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.macaroni,
    relatedProducts: [],
    seoTitle: "Macaroni Pasta | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Macaroni curved tube pasta for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "pasta-fusilli",
    name: "Fusilli",
    slug: "fusilli",
    category: "pasta",
    subgroup: "pasta-formats",
    subgroupName: "Pasta formats",
    brand: COMPANY,
    summary:
      "Spiral-shaped pasta that holds chunky sauces and dressings well.",
    description:
      "Fusilli is a spiral-shaped pasta that traps chunky sauces and dressings effectively, making it a popular choice for pasta salads and robust sauce preparations. Packing format and volume are agreed per order.",
    uses: ["Pasta salads", "Chunky sauces", "Cold preparations"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.fusilli,
    relatedProducts: [],
    seoTitle: "Fusilli Pasta | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Fusilli spiral-shaped pasta for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "pasta-elbow-macaroni",
    name: "Elbow Macaroni",
    slug: "elbow-macaroni",
    category: "pasta",
    subgroup: "pasta-formats",
    subgroupName: "Pasta formats",
    brand: COMPANY,
    summary:
      "Short curved pasta tubes for soups, salads and baked dishes.",
    description:
      "Elbow Macaroni is a short curved pasta tube commonly used in soups, pasta salads and baked dishes. Its compact shape makes it practical for batch cooking and canteen service. Packing format and volume are agreed per order.",
    uses: ["Soups", "Pasta salads", "Baked dishes"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.elbowMacaroni,
    relatedProducts: [],
    seoTitle: "Elbow Macaroni | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Elbow macaroni pasta for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "pasta-assorted-shapes",
    name: "Assorted Pasta Shapes",
    slug: "assorted-pasta-shapes",
    category: "pasta",
    subgroup: "pasta-formats",
    subgroupName: "Pasta formats",
    brand: COMPANY,
    summary:
      "A selection of pasta shapes for varied menus and retail ranges.",
    description:
      "Assorted Pasta Shapes gives buyers a range of formats within a single supply conversation. Shapes and sizes can be selected to suit the intended menu or retail range. Packing format and volume are agreed per order.",
    uses: ["Varied menus", "Retail ranges", "Canteen service"],
    facts: SPICE_FACTS("Dry pasta"),
    supplyNote:
      "Packing format and volume are confirmed per order. Final specification agreed with the customer.",
    image: PRODUCT_IMAGES.pastaShapes,
    relatedProducts: [],
    seoTitle: "Assorted Pasta Shapes | Wholesale Supply | The Lyndon Cook",
    seoDescription:
      "Assorted pasta shapes for wholesale and foodservice. Packing format and volume confirmed per order by The Lyndon Cook.",
    status: "active",
    enquiryEnabled: true,
  },
];

const allProducts: Product[] = [
  ...riceProducts,
  ...spiceProducts,
  ...fruitProducts,
  ...nornProducts,
  ...nornRiceProducts,
  ...pastaProducts,
].map((product) => ({ ...product, relatedProducts: [] as string[] }));

export const PRODUCTS: Product[] = withRelated(allProducts);

export const ACTIVE_PRODUCTS: Product[] = PRODUCTS.filter(
  (product) => product.status === "active"
);

/** Enquiry links carry the product slug: /enquire?product=super-basmati */
export function getProductHref(product: Pick<Product, "category" | "slug">): string {
  return `/products/${product.category}/${product.slug}/`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return ACTIVE_PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return ACTIVE_PRODUCTS.find((product) => product.id === id);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return ACTIVE_PRODUCTS.filter((product) => product.category === category);
}

export function getProductsBySubgroup(
  category: CategoryId,
  subgroup: string
): Product[] {
  return getProductsByCategory(category).filter(
    (product) => product.subgroup === subgroup
  );
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return product.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item))
    .slice(0, limit);
}

export function getSubgroupName(category: CategoryId, subgroup: string): string {
  const product = getProductsByCategory(category).find(
    (item) => item.subgroup === subgroup
  );
  return product?.subgroupName ?? subgroup;
}

export const CATALOGUE_COUNTS = {
  total: ACTIVE_PRODUCTS.length,
  rice: getProductsByCategory("rice").length,
  spices: getProductsByCategory("spices").length,
  fruit: getProductsByCategory("seasonal-fruit").length,
  canned: getProductsByCategory("canned-food").length,
  nornRice: getProductsByCategory("norn-rice-1lb").length,
  pasta: getProductsByCategory("pasta").length,
} as const;
