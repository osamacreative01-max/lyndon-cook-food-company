"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { NAV_LINKS, PRODUCT_MENU_LINKS, SITE } from "@/lib/site";

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
  const [hidden, setHidden] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLLIElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastYRef = useRef(0);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  // The product menu closes on an outside click, on Escape and on navigation.
  useEffect(() => {
    if (!productsOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProductsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [productsOpen]);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      lastYRef.current = y;

      setScrolled(y > 8);

      // Hide only after leaving the top of the page, and only for
      // deliberate swipes so tiny jitter does not toggle the header.
      if (y <= 96) {
        setHidden(false);
        return;
      }
      if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never hide the header while the user is interacting with it.
  const headerHidden = hidden && !open && !productsOpen;

  // The announcement bar stacks on narrow viewports, so the header height is
  // measured rather than hard-coded. The value is published on <html> for the
  // fixed mobile panel and for anchor scroll padding.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;

    const sync = () => {
      const height = header.offsetHeight;
      root.style.setProperty("--header-h", `${height}px`);
      root.style.scrollPaddingTop = `${height + 16}px`;
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--header-h");
      root.style.removeProperty("scroll-padding-top");
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 border-b bg-ivory/92 backdrop-blur-sm transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate] ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-sand shadow-[0_2px_24px_rgba(8,75,80,0.10)]"
            : "border-transparent"
        }`}
        style={{ ["--header-h" as string]: HEADER_H }}
      >
        <div className="relative bg-teal-800 text-ivory">
          <div className="container-page flex flex-col items-center justify-center gap-1 py-2 text-center text-[0.8125rem] leading-snug sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:py-2.5 sm:text-left sm:text-sm">
            <p className="text-ivory/90">
              Bespoke bedding handcrafted in 15-21 days.
            </p>
            <Link
              href="/enquire/"
              className="order-first font-semibold text-ivory underline decoration-copper-400 underline-offset-4 transition-colors hover:text-copper-100 sm:order-none sm:justify-self-center sm:no-underline sm:hover:underline"
            >
              For Retailers and Wholesale Customers
            </Link>
            <span aria-hidden="true" className="hidden sm:block" />
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] bg-copper-600"
          />
        </div>

        <div className="container-page flex h-[6rem] items-center justify-between gap-4">
          <Logo priority width={300} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                if (link.menu) {
                  return (
                    <li key={link.href} ref={productsRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setProductsOpen((value) => !value)}
                        aria-expanded={productsOpen}
                        aria-controls="products-menu"
                        className={`relative inline-flex min-h-12 items-center gap-1.5 rounded-[4px] px-4 text-base font-medium transition-all duration-200 ${
                          active
                            ? "bg-white text-teal-800"
                            : "text-body hover:bg-white/75 hover:text-teal-800"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 text-copper-600 transition-transform duration-200 ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                        />
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-copper-600"
                          />
                        ) : null}
                      </button>

                      {productsOpen ? (
                        <div
                          id="products-menu"
                          className="absolute left-0 top-full z-50 mt-1 w-60 rounded-[6px] border border-sand bg-white p-2 shadow-[0_18px_44px_rgba(8,75,80,0.16)]"
                        >
                          <ul className="flex flex-col gap-0.5">
                            {PRODUCT_MENU_LINKS.map((item) => {
                              const itemActive = pathname === item.href;
                              return (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setProductsOpen(false)}
                                    aria-current={itemActive ? "page" : undefined}
                                    className={`flex min-h-11 items-center rounded-[4px] px-3 text-[0.9375rem] font-medium transition-colors ${
                                      itemActive
                                        ? "bg-ivory text-teal-800"
                                        : "text-body hover:bg-ivory hover:text-teal-800"
                                    }`}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                }

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
