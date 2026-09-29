/**
 * Enquiry form contract.
 *
 * The same zod schema validates on the client (react-hook-form) and on the
 * server (API route), so a field can never pass one and fail the other.
 *
 * Content rules: no case-to-pallet conversion happens anywhere, because no
 * approved conversion data exists. Quantities stay in the unit the buyer chose.
 */

import { z } from "zod";
import { CATEGORIES } from "@/lib/categories";

export const BUYER_TYPES = [
  "Wholesale",
  "Foodservice",
  "Institutional",
  "Retail",
  "Other",
] as const;

export const QUANTITY_UNITS = [
  "Pallets",
  "Tonnes",
  "Cases",
  "To be discussed",
] as const;

export const DELIVERY_SCHEDULES = [
  "One-off supply",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "Seasonal programme",
  "To be discussed",
] as const;

export const CATEGORY_OPTIONS = [
  ...CATEGORIES.map((category) => category.shortName),
  "Not sure yet",
] as const;

const trimmed = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message);

/** Strips CR/LF and control characters so values are safe for mail headers. */
export const headerSafe = (value: string): string =>
  value.replace(/[\r\n\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();

export const enquirySchema = z.object({
  name: trimmed(120, "Please keep your name under 120 characters")
    .min(2, "Please enter your name"),
  organisation: trimmed(160, "Please keep your organisation under 160 characters").min(
    2,
    "Please enter your organisation"
  ),
  email: trimmed(180, "Please keep your email under 180 characters")
    .email("Please enter a valid email address"),
  telephone: trimmed(40, "Please keep your telephone number under 40 characters").default(""),
  buyerType: z
    .string()
    .trim()
    .refine(
      (value) => (BUYER_TYPES as readonly string[]).includes(value),
      "Please choose a buyer type"
    ),
  products: trimmed(200, "Please keep your selection under 200 characters").min(
    1,
    "Please select the product or category you are interested in"
  ),
  quantity: trimmed(60, "Please keep the quantity under 60 characters").default(""),
  quantityUnit: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || (QUANTITY_UNITS as readonly string[]).includes(value),
      "Please choose one of the listed units"
    )
    .default(""),
  destination: trimmed(160, "Please keep the destination under 160 characters").default(""),
  deliverySchedule: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" || (DELIVERY_SCHEDULES as readonly string[]).includes(value),
      "Please choose one of the listed schedules"
    )
    .default(""),
  message: trimmed(4000, "Please keep your message under 4000 characters").default(""),
  /**
   * Hidden field. Any value means a bot filled the form. It is deliberately
   * *not* rejected by the schema: failing validation would tell an automated
   * client that the field exists. The route accepts the request silently and
   * sends nothing.
   */
  companyWebsite: z.string().max(200).default(""),
  /** Client timestamp in ms. Used together with rate limiting. */
  startedAt: z.string().trim().default(""),
});

export type EnquiryValues = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export const defaultEnquiryValues: EnquiryValues = {
  name: "",
  organisation: "",
  email: "",
  telephone: "",
  buyerType: "",
  products: "",
  quantity: "",
  quantityUnit: "",
  destination: "",
  deliverySchedule: "",
  message: "",
  companyWebsite: "",
  startedAt: "",
};

export const ENQUIRY_MESSAGES = {
  success:
    "Thank you. Your enquiry has been received. Our team will review your requirements and contact you.",
  failure:
    "We could not send your enquiry. Please try again or email info@tlcfc.co.uk.",
  rateLimited:
    "We have already received a number of enquiries from this connection. Please try again later, or email info@tlcfc.co.uk.",
} as const;

export const ENQUIRY_URL = "/enquire/";
export const THANK_YOU_URL = "/thank-you/";

/** Builds an enquiry URL with a product pre-selected. */
export function enquiryHref(productSlug?: string | null): string {
  return productSlug
    ? `${ENQUIRY_URL}?product=${encodeURIComponent(productSlug)}`
    : ENQUIRY_URL;
}
