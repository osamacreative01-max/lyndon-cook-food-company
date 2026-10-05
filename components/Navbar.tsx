"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { NAV_LINKS, SITE } from "@/lib/site";

const HEADER_H = "6rem";

/**
 * Sticky primary header.
 *
 * Client component because it owns two pieces of genuinely interactive state:
 * the mobile menu open/closed flag and the shadow shown after scrolling.
 *
 * The header is deliberately tall so the lockup reads as a brand mark rather
 * than a nav decoration, and carries a copper hairline as a signature detail.
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
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-ivory/92 backdrop-blur-sm transition-shadow duration-200 ${
          scrolled
            ? "border-sand shadow-[0_2px_24px_rgba(8,75,80,0.10)]"
            : "border-transparent"
        }`}
        style={{ ["--header-h" as string]: HEADER_H }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-copper-600"
        />
        <div className="container-page flex h-[6rem] items-center justify-between gap-4">
          <Logo priority width={300} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex min-h-12 items-center rounded-[4px] px-4 text-base font-medium transition-all duration-200 ${
                        active
                          ? "bg-white text-teal-800"
                          : "text-body hover:bg-white/75 hover:text-teal-800"
                      }`}
                    >
                      {link.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-copper-600"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-[4px] px-3 text-base font-medium text-body transition-colors hover:bg-white hover:text-teal-800"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-copper-600" />
              {SITE.phone}
            </a>
            <Button href="/enquire/" size="lg">
              Enquire
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <span className="hidden sm:inline-flex">
              <Button href="/enquire/" className="px-4 sm:px-5">
                Enquire
              </Button>
            </span>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-sand-600 text-teal-800 transition-colors hover:border-copper-600 hover:bg-white"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only-focusable absolute">
                {open ? "Close menu" : "Open menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={close} triggerRef={triggerRef} />
    </>
  );
}
