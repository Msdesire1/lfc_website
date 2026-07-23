import Link from "next/link";
import { ArrowLeft, CreditCard, ReceiptText, ShieldCheck } from "lucide-react";

const payments = [
  ["PAY-0842", "Aisha Abimbola", "₦120,000", "Successful", "Jul 18"],
  ["PAY-0841", "Daniel Emeka", "₦120,000", "Pending", "Jul 17"],
  ["PAY-0840", "Ruth Okon", "₦120,000", "Successful", "Jul 16"],
];

export default function UserPaymentsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-red-500">Payments</p>
            <h1 className="mt-3 text-3xl font-bold">Payment history</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">
              View recent payments, pending invoices, and your receipt history.
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

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Paid to date", "₦3,240,000", CreditCard],
          ["Pending invoices", "1", ReceiptText],
          ["Verified", "Yes", ShieldCheck],
        ].map(([label, value, Icon]) => (
          <article key={label} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-red-500">
              <Icon size={20} />
              <p className="text-sm font-semibold">{label}</p>
            </div>
            <p className="mt-5 text-3xl font-bold text-slate-900">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Recent payments</h2>
        <p className="mt-1 text-sm text-slate-500">All payment activity for your enrolment.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm text-slate-700">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[.16em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(([ref, name, amount, status, date]) => (
                <tr key={ref} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">{ref}</td>
                  <td className="px-4 py-4">{name}</td>
                  <td className="px-4 py-4">{amount}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "Successful" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
