import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

/** Full-width content frame with responsive gutters (no max-width cap). */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={`container-page ${className}`}>
      {children}
    </Tag>
  );
}
