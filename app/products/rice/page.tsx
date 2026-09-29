import type { Metadata } from "next";

import CategoryPageView from "@/components/CategoryPageView";
import { getCategory } from "@/lib/categories";
import { categoryMetadata } from "@/lib/seo";

const category = getCategory("rice")!;

export const metadata: Metadata = categoryMetadata(category);

export default function RicePage() {
  return <CategoryPageView category={category} />;
}
