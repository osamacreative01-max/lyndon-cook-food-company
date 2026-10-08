"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import Button from "@/components/Button";
import {
  BUYER_TYPES,
  CATEGORY_OPTIONS,
  DELIVERY_SCHEDULES,
  ENQUIRY_MESSAGES,
  QUANTITY_UNITS,
  THANK_YOU_URL,
  defaultEnquiryValues,
  enquirySchema,
  type EnquiryValues,
} from "@/lib/enquiry";
import type { Product } from "@/lib/products";

type FieldErrors = Partial<Record<keyof EnquiryValues, string>>;

type Props = {
  /** All products, used to build the pre-filled product select. */
  products: Product[];
  /** Slug from `?product=` so a product can be pre-selected. */
  initialProductSlug?: string;
  /** Server-rendered field errors, keyed by field name. */
  serverErrors?: FieldErrors;
  /** Values echoed back from a failed submission, so nothing is lost. */
  previousValues?: EnquiryValues;
};

/**
 * Enquiry form.
 *
 * - The same zod schema runs on the client and on the server.
 * - On validation failure the field values are preserved; the server also echoes
 *   the submitted values back so a failure never wipes the form.
 * - Spam protection: a honeypot field plus a minimum fill time. A submission
 *   that trips either one is silently accepted, so bots get no signal.
 * - A success message is only shown after the server confirms durable
 *   acceptance (email sent or stored).
 */
export default function EnquiryForm({
  products,
  initialProductSlug,
  serverErrors,
  previousValues,
}: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [failureMessage, setFailureMessage] = useState("");
  const failureRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const initialProductLabel = initialProductSlug
    ? (products.find((product) => product.slug === initialProductSlug)?.name ?? "")
    : "";

  /**
   * Time the form was first rendered, used as the lower bound for the server's
   * minimum fill time. It is submitted with the enquiry and refreshed whenever
   * the visitor starts a new one.
   */
  const [startedAt, setStartedAt] = useState(() => String(Date.now()));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      ...defaultEnquiryValues,
      ...(previousValues ?? {}),
      ...(initialProductLabel && !previousValues?.products
        ? { products: initialProductLabel }
        : {}),
    },
  });

  const isSubmittingOrPending = isSubmitting || status === "submitting";

  // Focus moves to the outcome once it is on screen, so keyboard and screen
  // reader users are not left at the submit button.
  const previousStatus = useRef(status);
  useEffect(() => {
    if (previousStatus.current === status) return;
    previousStatus.current = status;
    if (status === "error") failureRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: EnquiryValues) => {
    setStatus("submitting");
    setFailureMessage("");

    try {
      const response = await fetch("/api/enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
        values?: EnquiryValues;
      };

      if (response.ok && payload.ok) {
        // Durable acceptance confirmed. Move to the confirmation route and
        // clear the local copy of the enquiry.
        setStatus("success");
        reset(defaultEnquiryValues);
        router.push(THANK_YOU_URL);
        return;
      }

      // Server-side validation failure: keep everything the visitor typed.
      if (payload.errors) {
        setStatus("error");
        setFailureMessage(ENQUIRY_MESSAGES.failure);
        // Re-sync the form with the values the server actually received.
        if (payload.values) reset(payload.values as EnquiryValues);
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setFailureMessage(payload.message ?? ENQUIRY_MESSAGES.rateLimited);
        return;
      }

      setStatus("error");
      setFailureMessage(payload.message ?? ENQUIRY_MESSAGES.failure);
    } catch {
      setStatus("error");
      setFailureMessage(ENQUIRY_MESSAGES.failure);
    }
  };

  /* ------------------------------------------------------------- Success state
     Only reached after the server confirms durable acceptance. The visible
     confirmation lives at /thank-you/, so the visitor lands on a real URL
     rather than a transient state. The live region announces the outcome in
     case navigation is blocked. */
  if (status === "success") {
    return (
      <div
        tabIndex={-1}
        role="status"
        className="rounded-[4px] border border-sand-600 bg-white p-8 sm:p-10"
      >
        <div className="flex gap-4">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-7 w-7 shrink-0 text-teal-700"
          />
          <div>
            <h2 className="font-serif text-[1.5rem] text-teal-800">
              Enquiry received
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
              {ENQUIRY_MESSAGES.success}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={THANK_YOU_URL}>Go to confirmation</Button>
              <Button
                variant="quiet"
                onClick={() => {
                  setStatus("idle");
                  setStartedAt(String(Date.now()));
                }}
              >
                Send another enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ The form */
  const fieldError = (name: keyof EnquiryValues): string | undefined =>
    (serverErrors?.[name] ?? errors[name]?.message) as string | undefined;

  const describedBy = (name: keyof EnquiryValues, hintId?: string) => {
    const ids: string[] = [];
    if (hintId) ids.push(hintId);
    if (fieldError(name)) ids.push(`${name}-error`);
    return ids.length ? ids.join(" ") : undefined;
  };

  /** Border, type and focus styling shared by every control. The 16px floor
   *  (text-base) stops iOS Safari auto-zooming the page on focus. */
  const baseControl = (name: keyof EnquiryValues) =>
    `w-full rounded-[6px] border bg-white px-4 text-base text-body transition-colors placeholder:text-muted/60 hover:border-copper-600 focus:outline-none focus:ring-2 focus:ring-copper-100 ${
      fieldError(name)
        ? "border-red-700 hover:border-red-700 focus:border-red-700 focus:ring-red-100"
        : "border-sand-600 focus:border-copper-600"
    }`;

  /** Single-line controls share one exact height, inputs and selects alike. */
  const controlClass = (name: keyof EnquiryValues) =>
    `${baseControl(name)} h-12`;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[6px] border border-sand bg-white p-6 shadow-[0_1px_3px_rgba(8,75,80,0.04)] sm:p-8"
      aria-describedby="enquiry-form-intro"
    >
      <p id="enquiry-form-intro" className="text-[0.9375rem] leading-relaxed text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only-focusable absolute">star</span> are required.
        Everything else helps us quote accurately.
      </p>

      {status === "error" ? (
        <div
          ref={failureRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-[3px] border border-red-700 bg-red-50 p-4"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-red-800"
          />
          <p className="text-[0.9375rem] leading-relaxed text-red-900">
            {failureMessage}
          </p>
        </div>
      ) : null}

      {/* ------------------------------------------------------------ Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      {/* Two equal columns on sm and up, one column below it. The gap is the
          same horizontally and vertically so every field sits on one rhythm. */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SectionHeading
          className="sm:col-span-2"
          step={1}
          title="About you"
          hint="Who we should reply to."
        />

        <Field
          name="name"
          label="Name"
          required
          error={fieldError("name")}
          hint="The person we should reply to."
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={controlClass("name")}
            aria-invalid={Boolean(fieldError("name"))}
            aria-describedby={describedBy("name", "name-hint")}
            {...register("name")}
          />
        </Field>

        <Field
          name="organisation"
          label="Organisation"
          required
          error={fieldError("organisation")}
        >
          <input
            id="organisation"
            type="text"
            autoComplete="organization"
            className={controlClass("organisation")}
            aria-invalid={Boolean(fieldError("organisation"))}
            aria-describedby={describedBy("organisation")}
            {...register("organisation")}
          />
        </Field>

        <Field
          name="email"
          label="Email"
          required
          error={fieldError("email")}
          hint="We use this to reply to you."
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={controlClass("email")}
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby={describedBy("email", "email-hint")}
            {...register("email")}
          />
        </Field>

        <Field
          name="telephone"
          label="Telephone"
          error={fieldError("telephone")}
          hint="Optional, but useful for delivery conversations."
        >
          <input
            id="telephone"
            type="tel"
            autoComplete="tel"
            className={controlClass("telephone")}
            aria-invalid={Boolean(fieldError("telephone"))}
            aria-describedby={describedBy("telephone", "telephone-hint")}
            {...register("telephone")}
          />
        </Field>

        <SectionHeading
          className="mt-2 sm:col-span-2"
          step={2}
          title="What you need"
          hint="The product, format and volume you have in mind."
        />

        <Field
          name="buyerType"
          label="Buyer type"
          required
          error={fieldError("buyerType")}
        >
          <select
            id="buyerType"
            className={controlClass("buyerType")}
            aria-invalid={Boolean(fieldError("buyerType"))}
            aria-describedby={describedBy("buyerType")}
            {...register("buyerType")}
          >
            <option value="">Please select</option>
            {BUYER_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          name="products"
          label="Product or category"
          required
          error={fieldError("products")}
          hint="Choose a category, or type a specific product."
        >
          <input
            id="products"
            type="text"
            list="enquiry-product-options"
            className={controlClass("products")}
            aria-invalid={Boolean(fieldError("products"))}
            aria-describedby={describedBy("products", "products-hint")}
            {...register("products")}
          />
          <datalist id="enquiry-product-options">
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option} />
            ))}
            {products.map((product) => (
              <option key={product.id} value={product.name} />
            ))}
          </datalist>
        </Field>

        <Field name="quantity" label="Quantity" error={fieldError("quantity")}>
          <input
            id="quantity"
            type="text"
            inputMode="decimal"
            placeholder="e.g. 25"
            className={controlClass("quantity")}
            aria-invalid={Boolean(fieldError("quantity"))}
            aria-describedby={describedBy("quantity")}
            {...register("quantity")}
          />
        </Field>

        <Field
          name="quantityUnit"
          label="Unit"
          error={fieldError("quantityUnit")}
          hint="Quantities are not converted between units."
        >
          <select
            id="quantityUnit"
            className={controlClass("quantityUnit")}
            aria-invalid={Boolean(fieldError("quantityUnit"))}
            aria-describedby={describedBy("quantityUnit", "quantityUnit-hint")}
            {...register("quantityUnit")}
          >
            <option value="">Please select</option>
            {QUANTITY_UNITS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <SectionHeading
          className="mt-2 sm:col-span-2"
          step={3}
          title="Delivery & specification"
          hint="Where it goes, when you need it and anything we should know."
        />

        <Field
          name="destination"
          label="Delivery destination"
          error={fieldError("destination")}
          hint="Postcode or delivery address."
        >
          <input
            id="destination"
            type="text"
            autoComplete="postal-code"
            className={controlClass("destination")}
            aria-invalid={Boolean(fieldError("destination"))}
            aria-describedby={describedBy("destination", "destination-hint")}
            {...register("destination")}
          />
        </Field>

        <Field
          name="deliverySchedule"
          label="Delivery schedule"
          error={fieldError("deliverySchedule")}
        >
          <select
            id="deliverySchedule"
            className={controlClass("deliverySchedule")}
            aria-invalid={Boolean(fieldError("deliverySchedule"))}
            aria-describedby={describedBy("deliverySchedule")}
            {...register("deliverySchedule")}
          >
            <option value="">Please select</option>
            {DELIVERY_SCHEDULES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          name="message"
          label="Specification or message"
          error={fieldError("message")}
          hint="Variety, quality parameters, pack format, pack sizes, delivery windows, or anything else we should know."
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            rows={6}
            className={`${baseControl("message")} min-h-32 resize-y py-3`}
            aria-invalid={Boolean(fieldError("message"))}
            aria-describedby={describedBy("message", "message-hint")}
            {...register("message")}
          />
        </Field>
      </div>

      <div
        className="mt-8 flex flex-col gap-4 rounded-[6px] border border-sand bg-ivory/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        style={{ borderTopWidth: "4px", borderTopColor: "var(--color-copper-600)" }}
      >
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          We use your details only to respond to this enquiry. See our{" "}
          <a
            href="/privacy/"
            className="link-underline link-underline-hover font-medium text-teal-800"
          >
            privacy notice
          </a>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmittingOrPending}
          className="w-full sm:w-auto sm:min-w-56"
        >
          {isSubmittingOrPending ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending enquiry
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only-focusable absolute">
        {isSubmittingOrPending ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  name,
  label,
  required = false,
  error,
  hint,
  className = "",
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /** Grid placement, e.g. a full-width field. */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {/* Fixed label height: the "Optional" badge never grows the line box,
          so labels in both columns share one baseline. */}
      <label
        htmlFor={name}
        className="flex min-h-7 flex-wrap items-center gap-1 text-[0.9375rem] font-semibold text-teal-800"
      >
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="text-copper-700">
            *
          </span>
        ) : (
          <span className="ml-1 inline-flex h-7 items-center rounded-full bg-ivory px-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Optional
          </span>
        )}
      </label>
      {/* Reserved helper slot (two lines): with or without hint text the
          control below starts at exactly the same height. */}
      {hint ? (
        <p id={`${name}-hint`} className="mt-1 min-h-11 text-[0.8125rem] text-muted">
          {hint}
        </p>
      ) : (
        <span aria-hidden="true" className="mt-1 block min-h-11" />
      )}
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${name}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-red-800"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Numbered section rule that matches the guidance cards on the enquire page. */
function SectionHeading({
  step,
  title,
  hint,
  className = "",
}: {
  step: number;
  title: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 border-b border-sand pb-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-800 font-serif text-[0.8125rem] font-semibold text-ivory"
      >
        {step}
      </span>
      <div>
        <h3 className="font-serif text-[1.0625rem] leading-snug text-teal-800">
          {title}
        </h3>
        {hint ? (
          <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
