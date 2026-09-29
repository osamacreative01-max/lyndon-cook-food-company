/**
 * Small in-memory rate limiter for the enquiry endpoint.
 *
 * Scope: per-instance. On serverless or multi-instance deployments each instance
 * keeps its own counters, so the limit is a floor rather than a hard global cap.
 * The honeypot and the minimum-time-to-submit check in the route handler are the
 * additional layers. Swap this module for a shared store (Upstash, Redis) if
 * stricter limits are needed - the interface stays the same.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_SECONDS = Number(process.env.RATE_LIMIT_WINDOW ?? 900);
/**
 * Generous enough that a shared office IP or NAT is not locked out by a
 * handful of corrected validation errors, tight enough to stop scripted
 * abuse. Counts every attempt, including ones that fail validation.
 */
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 10);

/** Evict expired buckets so the map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const windowMs = WINDOW_SECONDS * 1000;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, MAX_REQUESTS - 1),
      retryAfterSeconds: WINDOW_SECONDS,
    };
  }

  existing.count += 1;
  const allowed = existing.count <= MAX_REQUESTS;

  return {
    allowed,
    remaining: Math.max(0, MAX_REQUESTS - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function clearRateLimit(key: string) {
  buckets.delete(key);
}

/**
 * A form completed faster than a human could plausibly type it is a bot.
 * Deliberately conservative so slow mobile users are never blocked.
 */
export const MIN_FILL_TIME_MS = 2500;

export function isSubmittedTooQuickly(startedAt?: string): boolean {
  if (!startedAt) return false;
  const started = Number(startedAt);
  if (!Number.isFinite(started)) return false;
  return Date.now() - started < MIN_FILL_TIME_MS;
}
