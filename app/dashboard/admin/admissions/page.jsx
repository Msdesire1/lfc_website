"use client";

/**
 * The admissions queue, from GET /api/admin/applications.
 *
 * Drafts are excluded by default — a half-typed form is not a submission — but
 * they are still reachable by choosing "Draft" in the filter. The search box
 * matches the reference, name, email or phone, and runs on the server, so it
 * searches every application rather than only the page on screen.
 *
 * The table carries just enough for its own row and hands the reference
 * ("APP-1284") to the modal, which fetches the full record itself.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import ApplicantDetailsModal from "../_components/ApplicantDetailsModal";
import { admin } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import SortableTableHeader from "@/components/dashboard/SortableTableHeader";
import TablePagination from "@/components/dashboard/TablePagination";
import { nextSort, sortRows } from "@/lib/tableSort";

const FILTERS = ["All", "Review", "Request info", "Approved", "Rejected", "Draft"];
const EMPTY_APPLICATIONS = [];
const PAGE_SIZE = 10;

const statusTone = (status) =>
  status === "Paid" || status === "Approved"
    ? "bg-emerald-50 text-emerald-700"
    : status === "Rejected"
    ? "bg-red-50 text-red-700"
    : status === "Draft"
    ? "bg-slate-100 text-slate-700"
    : "bg-amber-50 text-amber-700";

export default function AdminAdmissionsPage() {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("Review");
  // Typing filters on submit rather than on every keystroke: one request per
  // search, not one per letter.
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ column: "name", direction: "asc" });
  const [page, setPage] = useState(1);

  const list = useApi(() => admin.applications.list({ status, search, page, limit: PAGE_SIZE }), {
    as: "admin",
    deps: [status, search, page],
  });
  const applications = list.data?.applications ?? EMPTY_APPLICATIONS;
  const sortedApplications = useMemo(
    () => sortRows(applications, sort, (applicant, column) => applicant[column]),
    [applications, sort]
  );
  const total = list.data?.pagination?.total ?? 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Admissions module</p>
            <h1 className="mt-3 text-3xl font-bold">Admissions dashboard</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">
              Manage applications, review submissions, and process approvals from a dedicated admissions workspace.
            </p>
          </div>
          <Link
            href="/dashboard/admin"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Application table</h2>
            <p className="mt-1 text-sm text-slate-500">Search, filter, and take action on applicant records.</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {total} record{total === 1 ? "" : "s"}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { setStatus(option); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  status === option
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
              placeholder="Name, reference, email…"
              className="w-48 text-sm outline-none"
            />
            <button type="submit" className="text-xs font-semibold text-emerald-700">
              Search
            </button>
          </form>
        </div>

        {list.loading && <Loading label="Loading applications…" />}
        {!list.loading && list.error && <ErrorNote error={list.error} onRetry={list.reload} />}

        {!list.loading && !list.error && (
          <>
            <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[.16em] text-slate-400">
                <tr>
                  <SortableTableHeader column="name" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Applicant</SortableTableHeader>
                  <SortableTableHeader column="id" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Application ID</SortableTableHeader>
                  <SortableTableHeader column="programme" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Programme</SortableTableHeader>
                  <SortableTableHeader column="intake" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Intake</SortableTableHeader>
                  <SortableTableHeader column="status" sort={sort} onSort={(column) => setSort(nextSort(sort, column))}>Status</SortableTableHeader>
                  <th className="px-4 py-3"> View details</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                      No applications match this filter.
                    </td>
                  </tr>
                )}
                {sortedApplications.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4">{applicant.name}</td>
                    <td className="px-4 py-4 font-semibold">{applicant.id}</td>
                    <td className="px-4 py-4">{applicant.programme}</td>
                    <td className="px-4 py-4">{applicant.intake}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelected(applicant.id)}
                        className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <TablePagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
          </>
        )}
      </section>

      <ApplicantDetailsModal
        reference={selected}
        onClose={() => setSelected(null)}
        // A decision changes which filter the row belongs to, so the queue has to
        // be refetched rather than patched in place.
        onDecided={() => list.reload()}
      />
    </div>
  );
}
