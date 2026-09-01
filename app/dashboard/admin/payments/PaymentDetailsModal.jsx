"use client";

/**
 * The receipt review modal.
 *
 * It is handed the reference the table rendered ("PAY-26041") and fetches the
 * payment itself; the detail route also accepts the receipt number in the
 * heading ("RCT-26041"), so either identifier works.
 *
 * A rejection requires a note. The student's only route back is to re-upload, and
 * they cannot know whether to send a clearer photo or to pay again unless somebody
 * tells them.
 */

import { useEffect, useState } from "react";
import { Check, CreditCard, FileText, Hash, User, X } from "lucide-react";
import { admin, authorizedFileUrl } from "@/lib/api";
import { messageOf, useAction, useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";

const statusTone = (status) => {
  if (status === "Approved") return "bg-emerald-50 text-emerald-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
};

function ReceiptDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-700">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}

/** @param {{reference: string|null, onClose: () => void, onDecided?: (result: object) => void}} props */
export default function PaymentDetailsModal({ reference, onClose, onDecided }) {
  const detail = useApi(() => admin.payments.get(reference), {
    as: "admin",
    enabled: Boolean(reference),
    deps: [reference],
  });
  const decide = useAction((status, note) => admin.payments.decide(reference, status, note), {
    as: "admin",
  });
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!reference) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [reference, onClose]);

  useEffect(() => {
    setNote("");
    setNotice("");
  }, [reference]);

  if (!reference) return null;

  const payment = detail.data?.payment || null;
  const account = detail.data?.account || null;
  const receiptUrl = authorizedFileUrl(payment?.receipt, "admin");
  const isPending = payment?.status === "Pending";

  const send = async (status) => {
    setNotice("");
    const { ok, data, error } = await decide.run(status, note.trim());
    if (!ok) {
      setNotice(messageOf(error));
      return;
    }
    setNotice(data?.message || "Saved.");
    onDecided?.(data);
    detail.reload();
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`Payment receipt ${reference}`} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button type="button" aria-label="Close payment details" onClick={onClose} className="absolute inset-0 cursor-default bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
        <div className="flex items-start justify-between gap-4 bg-[#343A40] p-6 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-200">Payment receipt</p>
            <h2 className="mt-2 text-2xl font-bold">{payment?.receiptNumber || reference}</h2>
            {payment?.status && (
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone(payment.status)}`}>{payment.status}</span>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {detail.loading && <Loading label="Loading the receipt…" />}
          {!detail.loading && detail.error && <ErrorNote error={detail.error} onRetry={detail.reload} />}

          {!detail.loading && payment && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <ReceiptDetail icon={User} label="Student" value={payment.name} />
                <ReceiptDetail icon={Hash} label="Payment ID" value={payment.id} />
                <ReceiptDetail icon={CreditCard} label="Payment method" value={payment.method} />
                <ReceiptDetail icon={FileText} label="Date paid" value={payment.date} />
                <ReceiptDetail icon={Check} label="Amount" value={payment.amount} />
                <ReceiptDetail icon={FileText} label="Programme" value={payment.programme} />
                {account?.email && <ReceiptDetail icon={User} label="Account email" value={account.email} />}
              </div>

              {/* The receipt itself — the only thing there is to review. Opened
                  through the authenticated file route, hence the token-bearing URL. */}
              {receiptUrl ? (
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  <FileText size={16} /> Open receipt
                </a>
              ) : (
                <p className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-700">
                  No receipt has been attached to this payment yet, so it cannot be approved.
                </p>
              )}

              {payment.reviewNote && (
                <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold">Last review note:</span> {payment.reviewNote}
                </p>
              )}

              {isPending && (
                <label className="mt-6 block text-sm">
                  <span className="font-semibold text-slate-700">Note to the student</span>
                  <span className="ml-1 text-slate-400">— required to reject</span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder="Say what was wrong with the receipt so they can fix it."
                    className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-600"
                  />
                </label>
              )}

              {notice && (
                <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {notice}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300">Close</button>
          {isPending && <>
            <button type="button" onClick={() => send("Rejected")} disabled={decide.busy} className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60">Reject</button>
            <button type="button" onClick={() => send("Approved")} disabled={decide.busy} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60">
              {decide.busy ? "Saving…" : "Approve payment"}
            </button>
          </>}
        </div>
      </div>
    </div>
  );
}
