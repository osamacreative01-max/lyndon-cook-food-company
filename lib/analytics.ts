/**
 * Analytics bridge.
 *
 * No analytics or advertising script is installed (see the cookies page), so
 * this exists purely to give the approved events a single, typed call site for
 * when a provider is confirmed. It is a no-op until `window.dataLayer` exists,
 * and it never sends personal data.
 */

import { ANALYTICS_EVENTS } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event });
}
