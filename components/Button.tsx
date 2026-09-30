import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "onDark";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders as a button element when provided. */
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  download?: boolean;
  prefetch?: boolean;
  "aria-describedby"?: string;
};

type Props = LinkProps | BaseProps;

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-teal-800 text-ivory border border-teal-800 hover:bg-teal-700 hover:border-teal-700 active:bg-teal-900",
  secondary:
    "bg-transparent text-teal-800 border border-teal-800 hover:bg-teal-800 hover:text-ivory active:bg-teal-900",
  quiet:
    "bg-white text-teal-800 border border-teal-200 hover:border-teal-800 hover:bg-teal-50",
  onDark:
    "bg-copper-600 text-teal-950 border border-copper-600 hover:bg-copper-400 hover:border-copper-400 active:bg-copper-700 active:text-ivory",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
  lg: "min-h-12 px-7 py-3 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[4px] font-sans font-semibold leading-tight tracking-[0.01em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55";

/**
 * The only button in the system. Minimum height is 44px (Size.md) so every
 * interactive target meets the tap-target guidance in the brief.
 */
export default function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props as BaseProps;
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if ("href" in props && props.href) {
    const {
      href,
      external,
      download,
      prefetch,
      onClick,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
    } = props;

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          {...(download ? { download: true } : {})}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        prefetch={prefetch}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...(download ? { download: true } : {})}
      >
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    onClick,
    disabled,
    "aria-label": ariaLabel,
  } = props as BaseProps;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
