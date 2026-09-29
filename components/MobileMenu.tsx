"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Slide-in mobile navigation.
 *
 * Accessibility:
 *  - The trigger is a real button with `aria-expanded` and `aria-controls`.
 *  - The panel is a labelled dialog; Escape closes it and focus returns to the
 *    trigger.
 *  - Tab is trapped inside the panel while open.
 *  - Background scroll is locked, and the panel sits below the fixed header.
 */
export default function MobileMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close when the route changes.
  useEffect(() => {
    onClose();
    // `onClose` is stable enough for this purpose; the route is the trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, triggerRef]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-x-0 bottom-0 top-[var(--header-h,4.5rem)] z-50 overflow-y-auto overscroll-contain border-t border-teal-100 bg-ivory lg:hidden"
    >
      <div className="container-page flex min-h-full flex-col gap-8 py-8">
        <div className="flex items-center justify-between border-b border-teal-100 pb-4">
          <p className="eyebrow">Menu</p>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[3px] text-teal-800 hover:bg-teal-50"
          >
            <X aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only-focusable absolute">Close menu</span>
          </button>
        </div>

        <nav aria-label="Primary">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href);
              return (
                <li key={link.href} className="border-b border-teal-100">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-between py-3 font-serif text-[1.375rem] ${
                      active ? "text-teal-800" : "text-body"
                    }`}
                  >
                    {link.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-copper-600" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-4">
          <Link
            href="/enquire/"
            onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center rounded-[3px] bg-teal-800 px-6 py-3 font-semibold text-ivory"
          >
            Enquire
          </Link>
          <div className="border-t border-teal-100 pt-4 text-[0.9375rem]">
            <p className="font-semibold text-teal-800">{SITE.name}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline link-underline-hover mt-2 inline-block"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="link-underline link-underline-hover mt-1 inline-block"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
