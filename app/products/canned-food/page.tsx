import type { Metadata } from "next";

import CategoryPageView from "@/components/CategoryPageView";
import { getCategory } from "@/lib/categories";
import { categoryMetadata } from "@/lib/seo";

const category = getCategory("canned-food")!;

export const metadata: Metadata = categoryMetadata(category);

export default function CannedFoodPage() {
  return <CategoryPageView category={category} />;
}
