"use client";

/**
 * The student's registration-fee payment, from GET /api/payments/me.
 *
 * This page used to rebuild the payment from the `wofbi-application` draft in
 * localStorage and invent a reference with a char-code hash. Both are gone: the
 * reference ("PAY-26041") is issued by the server when the application is
 * submitted, and the status is whatever the admissions team last decided — which
 * a browser copy of the form could never know.
 *
 * Amount, date and course arrive display-ready ("₦3,000", "10 Aug 2026"), so
 * nothing here formats them a second time.
 */

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, ReceiptText, ShieldCheck, FileText, Upload } from "lucide-react";
import { api, authorizedFileUrl } from "@/lib/api";
import { messageOf, useAction, useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import { useToast } from "@/components/ui/Toast";

const statusTone = (status) =>
  status === "Successful" || status === "Approved"
    ? "bg-emerald-50 text-emerald-700"
    : status === "Rejected"
    ? "bg-red-50 text-red-700"
    : "bg-amber-50 text-amber-700";

export default function UserPaymentsPage() {
  const loaded = useApi(() => api.payments.get());
  const send = useAction((file) => api.payments.uploadReceipt(file));
  const picker = useRef(null);
  const toast = useToast();

  const payment = loaded.data?.payment || null;
  const rows = loaded.data?.payments || [];
  const summary = loaded.data?.summary || null;

  const replaceReceipt = async (event) => {
    const file = event.target.files?.[0];
    // Clear the input straight away, otherwise choosing the same file twice
    // after a failed upload fires no change event and looks like a dead button.
    event.target.value = "";
    if (!file) return;

    const { ok, data, error } = await send.run(file);
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    toast.success(data?.message || "Your new receipt has been uploaded and is awaiting review.");
    loaded.reload();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-red-500">Payments</p>
            <h1 className="mt-3 text-3xl font-bold">Payment history</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">
              Your payment for the course you registered for, and its current review status.
            </p>
          </div>
          <Link
            href="/dashboard/user"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft size={16} /> Back to dashboard
          </Link>
        </div>
      </section>

      {loaded.loading && <Loading label="Loading your payment…" />}
      {!loaded.loading && loaded.error && (
        <ErrorNote error={loaded.error} onRetry={loaded.reload} />
      )}

      {!loaded.loading && !loaded.error && (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            {[
              ["Amount paid", summary?.amountPaid || "—", CreditCard],
              ["Registered course", summary?.course || "Not registered", ReceiptText],
              ["Status", summary?.status || "No payment", ShieldCheck],
            ].map(([label, value, Icon]) => (
              <article key={label} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 text-red-500">
                  <Icon size={20} />
                  <p className="text-sm font-semibold">{label}</p>
                </div>
                <p className="mt-5 text-2xl font-bold text-slate-900">{value}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Your payment</h2>
            <p className="mt-1 text-sm text-slate-500">The payment linked to your course registration.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-180 text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-[.16em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Ref</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row) => (
                      <tr key={row.ref} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-4 font-medium text-slate-900">{row.ref}</td>
                        <td className="px-4 py-4">{row.name}</td>
                        <td className="px-4 py-4">{row.course}</td>
                        <td className="px-4 py-4 font-semibold">{row.amount}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">{row.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                        You have not registered for a course yet.{" "}
                        <Link href="/dashboard/user/new" className="font-semibold text-red-600 hover:underline">
                          Register and make payment
                        </Link>{" "}
                        to see it here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Why a receipt was turned down. Without this the applicant can see
                "Rejected" but has no idea what to fix. */}
            {payment?.status === "Rejected" && payment.reviewNote && (
              <p className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <span className="font-semibold">Why this was rejected:</span> {payment.reviewNote}
              </p>
            )}

            {/* Upload success and failure are toasts now. The rejection note
                above stays on screen, because it is the reason the applicant is
                re-uploading and they need it while they choose a file. */}

            {payment && (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-red-500">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">Uploaded receipt</p>
                    {authorizedFileUrl(payment.receipt) ? (
                      <a
                        href={authorizedFileUrl(payment.receipt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block font-medium text-red-600 hover:underline"
                      >
                        {payment.receiptName}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-slate-800">{payment.receiptName}</p>
                    )}
                  </div>
                </div>
                {/* An approved payment is closed, so there is nothing to replace.
                    Anything else can be re-uploaded — a rejected receipt is
                    usually just a blurred photo, and a phone call is a poor fix. */}
                {payment.status !== "Approved" && payment.status !== "Successful" && (
                  <div>
                    <input
                      ref={picker}
                      type="file"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={replaceReceipt}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => picker.current?.click()}
                      disabled={send.busy}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload size={16} />
                      {send.busy ? "Uploading…" : "Replace receipt"}
                    </button>
                    <p className="mt-2 text-xs text-slate-400">PNG, JPG or PDF, up to 5 MB.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
