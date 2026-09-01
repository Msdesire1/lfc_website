"use client";

/**
 * The three things every wired page needs: load data, run an action, and know
 * whether anybody is signed in.
 *
 * Everything here is deliberately small. The pages in app/dashboard and
 * app/onboarding own their own markup — these helpers only handle the parts that
 * would otherwise be copy-pasted fifteen times: the loading flag, the caught
 * error, the retry, and signing out when a token has expired.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { tokens } from "@/lib/api";

/** Where each kind of session sends you when it is missing or expired. */
export const LOGIN_PATH = {
  student: "/onboarding/login",
  admin: "/onboarding/admin",
};

/** Drop the stored token. Does not redirect — callers decide where to go. */
export const signOut = (as = "student") => {
  if (as === "admin") tokens.clearAdmin();
  else tokens.clearStudent();
};

const tokenFor = (as) => (as === "admin" ? tokens.admin() : tokens.student());

/**
 * Turn an ApiError into one sentence a person can act on.
 *
 * Rate limiting is the only case that needs assembling: the API sends the wait in
 * `errors.retryAfterSeconds` rather than in the message, because the message is
 * the same however long the wait is.
 */
export const messageOf = (error) => {
  if (!error) return "";
  if (error.code === "RATE_LIMITED") {
    const seconds = Number(error.errors?.retryAfterSeconds) || 0;
    if (seconds > 60) {
      const minutes = Math.ceil(seconds / 60);
      return `${error.message} Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`;
    }
    if (seconds > 0) {
      return `${error.message} Try again in ${seconds} second${seconds === 1 ? "" : "s"}.`;
    }
  }
  return error.message || "Something went wrong. Please try again.";
};

/**
 * GET something once, with a loading flag, a caught error and a retry.
 *
 *   const { data, loading, error, reload } = useApi(() => api.dashboard.get());
 *
 * `deps` behaves like a useEffect dependency list — pass the filter values a
 * refetch should follow. An expired session clears the token and returns to the
 * sign-in page, because every other outcome (a blank page, an error the user
 * cannot fix) is worse.
 */
export function useApi(load, { deps = [], as = "student", enabled = true } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: enabled });
  const [attempt, setAttempt] = useState(0);
  const router = useRouter();

  // The loader is almost always an inline arrow, so it is a new function on every
  // render. Holding it in a ref keeps it out of the dependency list, which means
  // the effect runs when the caller's own `deps` change and not once per render.
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, error: null, loading: false });
      return undefined;
    }

    let live = true;
    setState((current) => ({ ...current, loading: true, error: null }));

    Promise.resolve()
      .then(() => loadRef.current())
      .then((data) => {
        if (live) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (!live) return;
        if (error?.status === 401) {
          signOut(as);
          router.replace(LOGIN_PATH[as] || LOGIN_PATH.student);
          return;
        }
        setState({ data: null, error, loading: false });
      });

    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, enabled, as, ...deps]);

  const reload = useCallback(() => setAttempt((count) => count + 1), []);
  return { ...state, reload };
}

/**
 * Run a write — a submit, an upload, an approval.
 *
 *   const save = useAction((file) => api.payments.uploadReceipt(file));
 *   const result = await save.run(file);
 *   if (result.ok) reload();
 *
 * `run` resolves rather than rejects, so a failed click cannot become an
 * unhandled promise rejection in the console. The error is on the returned
 * object and also in `save.error` for rendering.
 */
export function useAction(perform, { as = "student" } = {}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const performRef = useRef(perform);
  performRef.current = perform;

  const run = useCallback(
    async (...args) => {
      setBusy(true);
      setError(null);
      try {
        const data = await performRef.current(...args);
        return { ok: true, data, error: null };
      } catch (caught) {
        if (caught?.status === 401) {
          signOut(as);
          router.replace(LOGIN_PATH[as] || LOGIN_PATH.student);
          return { ok: false, data: null, error: caught };
        }
        setError(caught);
        return { ok: false, data: null, error: caught };
      } finally {
        setBusy(false);
      }
    },
    [as, router],
  );

  return { run, busy, error, setError, reset: () => setError(null) };
}

/**
 * Guards a page. Returns false until a token has been seen, so a protected page
 * never renders its shell for a signed-out visitor.
 *
 * The check runs in an effect because localStorage does not exist while the page
 * is being server-rendered.
 */
export function useSession({ as = "student" } = {}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (tokenFor(as)) setReady(true);
    else router.replace(LOGIN_PATH[as] || LOGIN_PATH.student);
  }, [as, router]);

  return ready;
}

/**
 * One query-string value, read after mount.
 *
 * Deliberately not `useSearchParams()`: that hook forces the page into a Suspense
 * boundary at build time, and these are small client pages where reading
 * `window.location` once is all that is wanted.
 */
export function useQueryParam(name) {
  const [state, setState] = useState({ value: null, ready: false });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setState({ value: params.get(name), ready: true });
  }, [name]);

  return state;
}
