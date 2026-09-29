import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { breadcrumbSchema } from "@/lib/seo";
import type { Crumb } from "@/lib/seo";

type Props = {
  items: Crumb[];
  /** Trailing crumb is the current page and is not a link. */
  onDark?: boolean;
  className?: string;
};

/**
 * Visual breadcrumb trail plus matching BreadcrumbList structured data.
 * Keyboard navigable: every crumb except the current page is a real link.
 */
export default function Breadcrumbs({ items, onDark = false, className = "" }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] ${
          onDark ? "text-teal-200" : "text-muted"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-teal-400" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`link-underline rounded-[2px] hover:text-teal-800 ${
                    onDark ? "hover:text-ivory" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? (onDark ? "text-ivory" : "text-teal-800") : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
      />
    </nav>
  );
}
