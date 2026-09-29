import type { Metadata } from "next";

import CategoryPageView from "@/components/CategoryPageView";
import { getCategory } from "@/lib/categories";
import { categoryMetadata } from "@/lib/seo";

const category = getCategory("seasonal-fruit")!;

export const metadata: Metadata = categoryMetadata(category);

export default function SeasonalFruitPage() {
  return <CategoryPageView category={category} />;
}
