"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Sticky primary header.
 *
 * Client component because it owns two pieces of genuinely interactive state:
 * the mobile menu open/closed flag and the shadow shown after scrolling.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "border-teal-100 shadow-[0_1px_18px_rgba(8,75,80,0.08)]" : "border-transparent"
      }`}
      style={{ ["--header-h" as string]: "4.5rem" }}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo priority width={158} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-[3px] px-3.5 text-[0.9375rem] font-medium transition-colors ${
                      active
                        ? "text-teal-800 after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-0.5 after:bg-copper-600"
                        : "text-body hover:text-teal-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] px-2 text-[0.9375rem] font-medium text-body transition-colors hover:text-teal-800"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-copper-600" />
            {SITE.phone}
          </a>
          <Button href="/enquire/">Enquire</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href="/enquire/" className="min-h-11 px-4 py-2 text-sm">
            Enquire
          </Button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-teal-200 text-teal-800 transition-colors hover:bg-teal-50"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only-focusable absolute">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={close} triggerRef={triggerRef} />
    </header>
  );
}
