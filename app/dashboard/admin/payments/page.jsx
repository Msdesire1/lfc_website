import Link from "next/link";
import { ArrowLeft, CreditCard, ReceiptText, RefreshCcw } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Payment management</p>
            <h1 className="mt-3 text-3xl font-bold">Payments</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">
              Review payment records, receipts, pending items, failed transactions, and refunds.
            </p>
          </div>
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

 <h1 className=" Coming Soon">Coming Soon</h1>
{/*
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Records", ReceiptText, "View payment history and receipts."],
          ["Pending", CreditCard, "Monitor pending and successful payments."],
          ["Refunds", RefreshCcw, "Track refunds and failed transactions."],
        ].map(([title, Icon, description]) => (
          <article key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-700">
              <Icon size={20} />
              <p className="font-semibold">{title}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </section> */}
    </div>
  );
}
