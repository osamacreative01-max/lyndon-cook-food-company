import type { Metadata } from "next";

import CategoryPageView from "@/components/CategoryPageView";
import { getCategory } from "@/lib/categories";
import { categoryMetadata } from "@/lib/seo";

const category = getCategory("spices")!;

export const metadata: Metadata = categoryMetadata(category);

export default function SpicesPage() {
  return <CategoryPageView category={category} />;
}
