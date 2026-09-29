import type { ReactNode } from "react";

/**
 * Responsive product grid.
 *
 * The full catalogue is present in the server-rendered HTML; filtering and
 * search layer on top of it, so the catalogue is never hidden behind a
 * JavaScript-only interaction.
 */
export default function ProductGrid({
  children,
  columns = 3,
  className = "",
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const columnClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul
      className={`grid grid-cols-1 gap-5 sm:gap-6 ${columnClass} ${className}`}
    >
      {children}
    </ul>
  );
}
