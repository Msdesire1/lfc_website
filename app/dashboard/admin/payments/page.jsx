"use client";

/**
 * The payment review queue, from GET /api/admin/payments.
 *
 * The three cards above the table come from the endpoint's own summary rather
 * than being counted from the rows on screen — with paging, the visible rows are
 * not the whole queue, and "3 pending" would quietly mean "3 pending on page 1".
 *
 * The table hands the modal a reference ("PAY-26041"), which fetches the record
 * and posts the approve/reject decision itself.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CreditCard, ReceiptText, RefreshCcw, Search } from "lucide-react";
import PaymentDetailsModal from "./PaymentDetailsModal";
import { admin } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import SortableTableHeader from "@/components/dashboard/SortableTableHeader";
import TablePagination from "@/components/dashboard/TablePagination";
import { nextSort, sortRows } from "@/lib/tableSort";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];
const EMPTY_PAYMENTS = [];
const PAGE_SIZE = 10;

const statusTone = (status) => {
  if (status === "Approved") return "bg-emerald-50 text-emerald-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
};

export default function AdminPaymentsPage() {
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [status, setStatus] = useState("All");
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ column: "date", direction: "desc" });
  const [page, setPage] = useState(1);

  const list = useApi(() => admin.payments.list({ status, search, page, limit: PAGE_SIZE }), {
    as: "admin",
    deps: [status, search, page],
  });
  const payments = list.data?.payments ?? EMPTY_PAYMENTS;
  const sortedPayments = useMemo(
    () => sortRows(payments, sort, (payment, column) => {
      if (column === "amount") return Number(String(payment.amount).replace(/[^0-9.-]/g, ""));
      if (column === "date" && !Number.isNaN(Date.parse(payment.date))) return Date.parse(payment.date);
      return payment[column];
    }),
    [payments, sort]
  );
  const summary = list.data?.summary || { records: 0, pending: 0, processed: 0 };
  const total = list.data?.pagination?.total ?? payments.length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Payment management</p>
            <h1 className="mt-3 text-3xl font-bold">Payments</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">Review submitted receipts and approve or reject payment records.</p>
          </div>
          <Link href="/dashboard/admin" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Records", ReceiptText, `${summary.records} payment receipt${summary.records === 1 ? "" : "s"}`],
          ["Pending", CreditCard, `${summary.pending} awaiting review`],
          ["Processed", RefreshCcw, `${summary.processed} approved or rejected`],
        ].map(([title, Icon, description]) => (
          <article key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-700"><Icon size={20} /><p className="font-semibold">{title}</p></div>
            <p className="mt-4 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div><h2 className="text-xl font-bold">Payment receipts</h2><p className="mt-1 text-sm text-slate-500">Select a payment to view its receipt and review it.</p></div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { setStatus(option); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  status === option ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(term.trim());
              setPage(1);
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"
          >
            <Search size={16} className="text-slate-400" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Name, PAY- or RCT- reference…"
              className="w-52 text-sm outline-none"
            />
            <button type="submit" className="text-xs font-semibold text-emerald-700">Search</button>
          </form>
        </div>

        {list.loading && <Loading label="Loading receipts…" />}
        {!list.loading && list.error && <ErrorNote error={list.error} onRetry={list.reload} />}

        {!list.loading && !list.error && (
          <>
            <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-220 text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[.16em] text-slate-400"><tr>
                <SortableTableHeader column="name" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Student</SortableTableHeader><SortableTableHeader column="id" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Payment ID</SortableTableHeader><SortableTableHeader column="amount" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Amount</SortableTableHeader><SortableTableHeader column="date" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Date</SortableTableHeader><SortableTableHeader column="status" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Status</SortableTableHeader><th className="px-4 py-3">Receipt</th>
              </tr></thead>
              <tbody>
                {payments.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">No payments match this filter.</td></tr>
                )}
                {sortedPayments.map((payment) => <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium">{payment.name}<span className="mt-1 block text-xs font-normal text-slate-400">{payment.programme}</span></td>
                  <td className="px-4 py-4 font-semibold">{payment.id}</td><td className="px-4 py-4 font-semibold">{payment.amount}</td><td className="px-4 py-4">{payment.date}</td>
                  <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(payment.status)}`}>{payment.status}</span></td>
                  <td className="px-4 py-4"><button type="button" onClick={() => setSelectedPaymentId(payment.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline"><ReceiptText size={15} /> View receipt</button></td>
                </tr>)}
              </tbody>
            </table>
            </div>
            <TablePagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
          </>
        )}
      </section>

      <PaymentDetailsModal
        reference={selectedPaymentId}
        onClose={() => setSelectedPaymentId(null)}
        onDecided={() => list.reload()}
      />
    </div>
  );
}
