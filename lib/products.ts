/**
 * The catalogue: 41 initial product records.
 *
 * 7 rice + 11 spices and seasonings + 9 seasonal fruit + 14 NORM canned foods.
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

const COMPANY = "The Lyndon Cook Food Company";
const BRAND_LINE = "A brand from The Lyndon Cook Food Company";

const RICE_SUPPLY =
  "Packing format and volume are confirmed per order. Final specification agreed with the customer.";
const SPICE_SUPPLY =
  "Grind, heat level and packing format are agreed to suit the application. Final specification agreed with the customer.";
const FRUIT_SUPPLY =
  "Variety, size, maturity, grade, origin and packing are confirmed per programme or order. Availability depends on crop and shipping conditions.";
const NORM_SUPPLY =
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

const NORM_FACTS = (group: string) => [
  { label: "Brand", value: "NORM" },
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
    seoTitle: "Super Basmati Rice | Wholesale Supply | The Lyndon Cook Food Company",
    seoDescription:
      "Aromatic Super Basmati rice for pulao, pilafs and everyday dishes. Agree grain specification, packing format and volume with The Lyndon Cook Food Company.",
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
    seoTitle: "1121 Steam Basmati Rice | Wholesale Supply | The Lyndon Cook Food Company",
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
    seoTitle: "1121 Sella Basmati Rice | Parboiled Basmati | The Lyndon Cook Food Company",
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
    seoTitle: "IRRI 6 White Rice | Everyday Rice Supply | The Lyndon Cook Food Company",
    seoDescription:
      "IRRI 6 white rice for everyday meals and volume supply. Packing format and volume confirmed per order by The Lyndon Cook Food Company.",
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
    seoTitle: "PK-386 Long Grain Rice | Non-Basmati Supply | The Lyndon Cook Food Company",
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
    seoTitle: "IRRI 9 / C9 Rice | Specification-Led Supply | The Lyndon Cook Food Company",
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
    seoTitle: "100% Broken Rice | Bulk Rice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Cumin | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Coriander | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Ginger | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Black Pepper | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Turmeric | Wholesale Spice Supply | The Lyndon Cook Food Company",
    seoDescription:
      "Ground turmeric for curries, rice dishes and vegetable work. Specification confirmed per order by The Lyndon Cook Food Company.",
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
    seoTitle: "Garam Masala | Wholesale Spice Blend | The Lyndon Cook Food Company",
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
    seoTitle: "Red Chilli Powder | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Ground Fenugreek | Wholesale Spice Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Curry Powder | Wholesale Spice Blend | The Lyndon Cook Food Company",
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
    seoTitle: "Dry Mango Powder (Amchur) | The Lyndon Cook Food Company",
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
    seoTitle: "Himalayan Pink Salt | Wholesale Seasoning | The Lyndon Cook Food Company",
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
    seoTitle: "Chaunsa Mangoes | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Langra Mangoes | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Anwar Ratol Mangoes | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Sindhri Mangoes | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Dussehri Mangoes | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Kinnow Citrus | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Sangtra Citrus | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Fruiter Citrus | Seasonal Fruit Supply | The Lyndon Cook Food Company",
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
    seoTitle: "Malta Citrus | Seasonal Fruit Supply | The Lyndon Cook Food Company",
    seoDescription:
      "Malta citrus supplied against an agreed programme, with size, maturity and packing confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
];

const normProducts: Product[] = [
  {
    id: "norm-baked-beans",
    name: "Baked Beans",
    slug: "baked-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Baked beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "Baked Beans from the NORM range: a straightforward, familiar pantry staple presented in a 400 ml easy-open can. Ingredients, net contents and drained weight are confirmed by product specification rather than published here.",
    uses: ["Breakfast and brunch service", "Canteen menus", "Pantry programmes"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.bakedBeans,
    relatedProducts: [],
    seoTitle: "NORM Baked Beans | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM baked beans in a 400 ml easy-open can. A brand from The Lyndon Cook Food Company. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-black-beans",
    name: "Black Beans",
    slug: "black-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Black beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Black Beans are a useful base for Mexican-inspired dishes, salads, bowls and chilled or heated counters. They come in the 400 ml easy-open can used across the range, with net contents and drained weight confirmed by product specification.",
    uses: ["Bowls and salads", "Chilli and Mexican-inspired dishes", "Hot counters"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.blackBeans,
    relatedProducts: [],
    seoTitle: "NORM Black Beans | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM black beans in a 400 ml easy-open can, for bowls, salads and Mexican-inspired dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-broad-beans",
    name: "Broad Beans",
    slug: "broad-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Broad beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Broad Beans suit seasonal menus and traditional dishes where prepared broad beans are needed without prep. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Seasonal menus", "Traditional dishes", "Cold and hot counters"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.broadBeans,
    relatedProducts: [],
    seoTitle: "NORM Broad Beans | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM broad beans in a 400 ml easy-open can for seasonal menus and traditional dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-chickpeas",
    name: "Chickpeas",
    slug: "chickpeas",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Chickpeas in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Chickpeas are a versatile pulse for salads, curries, hummus-style preparations and hot dishes. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Salads and mezze", "Curries", "Hot counters"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.chickpeas,
    relatedProducts: [],
    seoTitle: "NORM Chickpeas | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM chickpeas in a 400 ml easy-open can for salads, mezze, curries and hot dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-pinto-beans",
    name: "Pinto Beans",
    slug: "pinto-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Pinto beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Pinto Beans work in chilli and bean dishes, salads and where a softer, creamier pulse texture suits the dish. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Chilli and bean dishes", "Soups", "Salads and bowls"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.pintoBeans,
    relatedProducts: [],
    seoTitle: "NORM Pinto Beans | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM pinto beans in a 400 ml easy-open can for chilli, soups, salads and bowls. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-red-kidney-beans",
    name: "Red Kidney Beans",
    slug: "red-kidney-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "Red kidney beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Red Kidney Beans hold their shape well, which makes them a reliable choice for chillies, curries and mixed bean dishes. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Chilli and curry dishes", "Mixed bean dishes", "Menus and batch cooking"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.redKidneyBeans,
    relatedProducts: [],
    seoTitle: "NORM Red Kidney Beans | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM red kidney beans in a 400 ml easy-open can for chilli, curry and mixed bean dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-white-kidney-beans",
    name: "White Kidney Beans",
    slug: "white-kidney-beans",
    category: "canned-food",
    subgroup: "beans-pulses",
    subgroupName: "Beans & pulses",
    brand: "NORM",
    summary:
      "White kidney beans in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM White Kidney Beans suit salads, soups, casseroles and Mediterranean-style dishes where a mild pulse is wanted. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Salads", "Soups and casseroles", "Mediterranean-style dishes"],
    facts: NORM_FACTS("Beans & pulses"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.whiteKidneyBeans,
    relatedProducts: [],
    seoTitle: "NORM White Kidney Beans | 400 ml Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM white kidney beans in a 400 ml easy-open can for salads, soups and casseroles. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-green-peas",
    name: "Green Peas",
    slug: "green-peas",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORM",
    summary:
      "Green peas in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Green Peas are a straightforward vegetable for rice dishes, pasta, salads and canteen menus. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Rice and pasta dishes", "Salads", "Canteen menus"],
    facts: NORM_FACTS("Vegetables"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.greenPeas,
    relatedProducts: [],
    seoTitle: "NORM Green Peas | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM green peas in a 400 ml easy-open can for rice dishes, pasta, salads and canteen menus. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-sweetcorn",
    name: "Sweetcorn",
    slug: "sweetcorn",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORM",
    summary:
      "Sweetcorn in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Sweetcorn works in rice dishes, salads, dips and alongside hot counters. They are supplied in the 400 ml easy-open can used across the range, with net contents and drained weight confirmed by product specification.",
    uses: ["Rice and grain dishes", "Salads and dips", "Hot counters"],
    facts: NORM_FACTS("Vegetables"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.sweetcorn,
    relatedProducts: [],
    seoTitle: "NORM Sweetcorn | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM sweetcorn in a 400 ml easy-open can for rice dishes, salads, dips and hot counters. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-creamed-corn",
    name: "Creamed Corn",
    slug: "creamed-corn",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORM",
    summary:
      "Creamed corn in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Creamed Corn is a ready-to-use option for buffet counters, fillings and vegetable dishes where a smooth corn preparation is wanted. It is supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Buffet counters", "Fillings and bakes", "Vegetable dishes"],
    facts: NORM_FACTS("Vegetables"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.creamedCorn,
    relatedProducts: [],
    seoTitle: "NORM Creamed Corn | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM creamed corn in a 400 ml easy-open can for buffet counters, fillings and vegetable dishes. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-mixed-vegetables",
    name: "Mixed Vegetables",
    slug: "mixed-vegetables",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORM",
    summary:
      "Mixed vegetables in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Mixed Vegetables suit stir-fry style dishes, pies, pasta and batch cooking where a blended vegetable is more practical than separate preparation. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Stir-fry style dishes", "Pies and pasta", "Batch cooking"],
    facts: NORM_FACTS("Vegetables"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.mixedVegetables,
    relatedProducts: [],
    seoTitle: "NORM Mixed Vegetables | 400 ml Easy-Open Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM mixed vegetables in a 400 ml easy-open can for pies, pasta, stir-fry style dishes and batch cooking. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-peas-and-carrots",
    name: "Peas & Carrots",
    slug: "peas-and-carrots",
    category: "canned-food",
    subgroup: "vegetables",
    subgroupName: "Vegetables",
    brand: "NORM",
    summary:
      "Peas and carrots in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Peas & Carrots are a familiar combination for rice dishes, pies, buffets and canteen menus. They are supplied in the 400 ml easy-open can, with net contents and drained weight confirmed by product specification.",
    uses: ["Rice dishes", "Pies and buffets", "Canteen menus"],
    facts: NORM_FACTS("Vegetables"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.peasAndCarrots,
    relatedProducts: [],
    seoTitle: "NORM Peas & Carrots | 400 ml Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM peas and carrots in a 400 ml easy-open can for rice dishes, pies, buffets and canteen menus. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-whole-peeled-tomatoes",
    name: "Whole Peeled Tomatoes",
    slug: "whole-peeled-tomatoes",
    category: "canned-food",
    subgroup: "tomatoes",
    subgroupName: "Tomatoes",
    brand: "NORM",
    summary:
      "Whole peeled tomatoes in a 400 ml easy-open can, part of the NORM canned-food range.",
    description:
      "NORM Whole Peeled Tomatoes are suited to sauces, stews and dishes where whole pieces are wanted rather than a crushed preparation. They are supplied in the 400 ml easy-open can, with specification confirmed by product datasheet.",
    uses: ["Sauces", "Stews and braises", "Soups"],
    facts: NORM_FACTS("Tomatoes"),
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.wholePeeledTomatoes,
    relatedProducts: [],
    seoTitle: "NORM Whole Peeled Tomatoes | 400 ml Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM whole peeled tomatoes in a 400 ml easy-open can for sauces, stews and soups. Specification confirmed per order.",
    status: "active",
    enquiryEnabled: true,
  },
  {
    id: "norm-san-marzano-tomatoes",
    name: "San Marzano Tomatoes",
    slug: "san-marzano-tomatoes",
    category: "canned-food",
    subgroup: "tomatoes",
    subgroupName: "Tomatoes",
    brand: "NORM",
    summary:
      "San Marzano tomatoes from Italy, for sauces, soups and slow-cooked dishes. Presented in a 400 ml easy-open can.",
    description:
      "San Marzano tomatoes from Italy, for sauces, soups and slow-cooked dishes. Presented in a 400 ml easy-open can. The pack carries British English and Italian wording with a small Italian tricolour. Final net contents and label details are confirmed by product specification.",
    uses: ["Pasta and pizza sauces", "Soups", "Slow-cooked dishes"],
    facts: [
      { label: "Brand", value: "NORM" },
      { label: "Brand line", value: BRAND_LINE },
      { label: "Group", value: "Tomatoes" },
      { label: "Variety", value: "San Marzano" },
      { label: "Country of origin", value: "Product of Italy" },
      { label: "Can format", value: "400 ml" },
      { label: "Opening", value: "Easy-open" },
      { label: "Pack language", value: "British English and Italian" },
    ],
    supplyNote: NORM_SUPPLY,
    image: PRODUCT_IMAGES.sanMarzanoTomatoes,
    relatedProducts: [],
    seoTitle: "NORM San Marzano Tomatoes | 400 ml Can | The Lyndon Cook Food Company",
    seoDescription:
      "NORM San Marzano tomatoes from Italy in a 400 ml easy-open can, for sauces, soups and slow-cooked dishes. A brand from The Lyndon Cook Food Company.",
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

const allProducts: Product[] = [
  ...riceProducts,
  ...spiceProducts,
  ...fruitProducts,
  ...normProducts,
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
} as const;
