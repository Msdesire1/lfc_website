"use client";

/**
 * Shared loading and error states.
 *
 * Every panel and table in the portal routes its loading state through
 * `Loading`, so the spinner below is the one the whole app shows — restyle it
 * here and the student dashboard, the admin tables and both detail modals follow.
 *
 * `Loading` renders in place of the table it is waiting for, which is why it
 * centres itself and claims a minimum height instead of being a single line of
 * text: without that the surrounding card collapses to nothing and the page
 * jumps when the data lands.
 */

import { messageOf } from "@/lib/useApi";

/**
 * A plain SVG rather than an icon-library component, so no icon rename can turn
 * a loading state into a build error.
 *
 * The faint full circle is the track and the arc is the moving part — an arc on
 * its own reads as a broken circle, and a full ring with no gap looks static no
 * matter how fast it turns. Both are drawn in `currentColor`, so the colour is
 * set by a text class on the parent.
 */
export function Spinner({ size = 30, className = "" }) {
  return (
    <svg
      viewBox="0 0 50 50"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`animate-spin ${className}`}
    >
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" opacity=".18" />
      <path
        d="M25 5a20 20 0 0 1 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Centred both ways inside whatever slot it is given.
 *
 * The spinner is slate rather than the red or emerald accent on purpose: this
 * component appears on both the student portal and the admin console, and a
 * neutral spinner is the one thing that does not clash with either.
 */
export function Loading({ label = "Loading…", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-40 w-full flex-col items-center justify-center gap-3 py-12 text-slate-400 ${className}`}
    >
      <Spinner />
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

/**
 * A row-shaped error for the same slot, centred to match `Loading` so the panel
 * does not visibly shift when a failed request is retried.
 */
export function ErrorNote({ error, onRetry, className = "" }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className={`flex min-h-40 w-full flex-col items-center justify-center gap-3 px-4 py-12 text-center ${className}`}
    >
      <p className="max-w-md text-sm text-red-600">{messageOf(error)}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Try again
        </button>
      )}
    </div>
  );
}

/**
 * Loading, then error, then content — the order every panel wants.
 *
 * `children` is a function so the data is only read once it exists, which saves
 * every call site from writing `data?.thing?.other`.
 */
export function Async({ state, children, label, className = "" }) {
  if (state.loading) return <Loading label={label} className={className} />;
  if (state.error) return <ErrorNote error={state.error} onRetry={state.reload} className={className} />;
  if (!state.data) return null;
  return children(state.data);
}
