/**
 * Site-wide loading state.
 *
 * Note for future routes: this file wraps every page in a Suspense boundary. A
 * `notFound()` thrown from inside a page is therefore streamed *after* the
 * response status has been sent, which turns the 404 into a 200 with a blank
 * page. That is why both catalogue routes set `dynamicParams = false` — unknown
 * category/slug combinations are rejected at the routing layer, before any page
 * renders. Keep it that way for any new dynamic route that can 404, or move
 * that route's `loading.tsx` down to the route itself.
 */
export default function Loading() {
  return (
    <div
      className="bg-ivory"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only-focusable absolute">Loading page</span>
      <div className="h-[46vh] w-full animate-pulse bg-teal-100/40" />
      <div className="container-page py-14">
        <div className="h-4 w-32 rounded bg-teal-100/60" />
        <div className="mt-5 h-10 w-full max-w-lg rounded bg-teal-100/60" />
        <div className="mt-4 h-10 w-full max-w-md rounded bg-teal-100/40" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-52 rounded-[4px] bg-teal-100/40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
