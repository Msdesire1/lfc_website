"use client";

/**
 * The app's toast system, on react-toastify.
 *
 * The public surface is unchanged from the hand-rolled version this replaced —
 * `useToast()` still returns { success, error, info, dismiss, clear } — so all
 * twenty-nine call sites across the portal and the auth pages kept working
 * without an edit. react-toastify now owns the parts that were fiddly to get
 * right by hand: the queue, the auto-close timers, pause-on-hover,
 * drag-to-dismiss and the aria plumbing.
 *
 * The look is still ours. react-toastify's own stylesheet is not imported
 * anywhere; the styling lives in app/globals.css against react-toastify's
 * documented class hooks. See the long comment there for why.
 *
 * Call it as `toast.success(...)`, never destructured as `{ success, error }` —
 * almost every page in this app already has an `error` in scope from
 * useApi/useAction, and destructuring shadows it.
 */

import { createContext, useContext, useMemo } from "react";
import { ToastContainer, toast as toastify } from "react-toastify";
import { Check, Info, TriangleAlert, X } from "lucide-react";

/**
 * An error gets longer than a confirmation because it usually asks the reader to
 * do something, and "Please complete the required fields on this step." is no use
 * if it has gone by the time they look up from the form.
 */
const DURATION = { success: 3200, info: 3600, error: 6000 };

/** Cap the stack. Four toasts at once is a wall, not feedback. */
const MAX_VISIBLE = 3;

const TONE = {
  success: { className: "wofbi-toast--success", Icon: Check },
  error: { className: "wofbi-toast--error", Icon: TriangleAlert },
  info: { className: "wofbi-toast--info", Icon: Info },
};

const CloseButton = ({ closeToast }) => (
  <button
    type="button"
    onClick={closeToast}
    aria-label="Dismiss notification"
    className="-mr-1 mt-0.5 shrink-0 rounded p-0.5 text-white/70 transition hover:text-white"
  >
    <X size={15} />
  </button>
);

const push = (message, type) => {
  const text = String(message ?? "").trim();
  // An empty toast is worse than none — it looks like a rendering fault.
  if (!text) return;

  const { className, Icon } = TONE[type] ?? TONE.info;
  toastify(text, {
    type,
    // Dedupe for free: react-toastify refuses to open a second toast with an id
    // that is already on screen, so a double-clicked Save shows one confirmation
    // rather than two identical ones stacked up.
    toastId: `${type}:${text}`,
    className,
    autoClose: DURATION[type] ?? DURATION.info,
    icon: <Icon size={18} className="mt-0.5 shrink-0" />,
    // Errors interrupt a screen reader; confirmations wait their turn.
    role: type === "error" ? "alert" : "status",
  });
};

/**
 * Module-level and frozen: these functions close over nothing, so there is no
 * reason to rebuild them per render or to hang them off component state.
 */
const controls = Object.freeze({
  success: (message) => push(message, "success"),
  error: (message) => push(message, "error"),
  info: (message) => push(message, "info"),
  /** Close one toast by the id `push` generated, i.e. `${type}:${text}`. */
  dismiss: (id) => toastify.dismiss(id),
  clear: () => toastify.dismiss(),
});

const ToastContext = createContext(null);

/**
 * Mounted once in app/layout.jsx, outside AppShell, so the shell itself can
 * raise toasts and so a toast survives the shell swapping its children on
 * navigation — that is what lets "Welcome back, Grace." land on the dashboard
 * after the login page has already gone.
 */
export function ToastProvider({ children }) {
  const value = useMemo(() => controls, []);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        limit={MAX_VISIBLE}
        autoClose={DURATION.info}
        closeButton={CloseButton}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </ToastContext.Provider>
  );
}

/** @returns {{success: (m: string) => void, error: (m: string) => void, info: (m: string) => void, dismiss: (id: string) => void, clear: () => void}} */
export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used inside <ToastProvider> (mounted in app/layout.jsx).");
  }
  return value;
}

export default ToastProvider;
