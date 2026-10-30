"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search } from "lucide-react";
import { admin } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import TablePagination from "@/components/dashboard/TablePagination";

const PAGE_SIZE = 25;
const EMPTY_MEMBERS = [];
const displayDate = (value) => (value ? new Date(value).toLocaleDateString() : "—");

export default function AdminChurchMembersPage() {
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const list = useApi(() => admin.churchMembers.list({ search, page, limit: PAGE_SIZE }), {
    as: "admin",
    deps: [search, page],
  });
  const members = list.data?.members ?? EMPTY_MEMBERS;
  const total = list.data?.pagination?.total ?? 0;

  const downloadCsv = async () => {
    setExporting(true);
    setExportError("");
    try {
      const file = await admin.churchMembers.exportCsv({ search });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "church-members.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setExportError(error.message || "The member list could not be downloaded.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Membership module</p>
            <h1 className="mt-3 text-3xl font-bold">Church members</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Review public Join Us submissions and export the complete matching roster as a spreadsheet-friendly CSV document.
            </p>
          </div>
          <Link href="/dashboard/admin" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Member records</h2>
            <p className="mt-1 text-sm text-slate-500">{total} record{total === 1 ? "" : "s"}</p>
          </div>
          <button type="button" onClick={downloadCsv} disabled={exporting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">
            <Download size={16} /> {exporting ? "Preparing download..." : "Download CSV"}
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(term.trim());
            setPage(1);
          }}
          className="mt-5 flex w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"
        >
          <Search size={16} className="shrink-0 text-slate-400" />
          <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search name, email, phone..." className="min-w-0 flex-1 text-sm outline-none" />
          <button type="submit" className="text-xs font-semibold text-emerald-700">Search</button>
        </form>

        {exportError && <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{exportError}</p>}
        {list.loading && <Loading label="Loading church members..." />}
        {!list.loading && list.error && <ErrorNote error={list.error} onRetry={list.reload} />}
        {!list.loading && !list.error && (
          <>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[1700px] text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-[.12em] text-slate-400">
                  <tr>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Phone</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Birthday</th>
                    <th className="px-3 py-3">Gender</th>
                    <th className="px-3 py-3">Marital status</th>
                    <th className="px-3 py-3">Anniversary</th>
                    <th className="px-3 py-3">Address</th>
                    <th className="px-3 py-3">Membership</th>
                    <th className="px-3 py-3">WSF centre</th>
                    <th className="px-3 py-3">Service unit</th>
                    <th className="px-3 py-3">SMS consent</th>
                    <th className="px-3 py-3">Updates used</th>
                    <th className="px-3 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 && (
                    <tr><td colSpan={15} className="px-4 py-10 text-center text-slate-500">No member records found.</td></tr>
                  )}
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-slate-100 align-top hover:bg-slate-50">
                      <td className="px-3 py-4 font-semibold">{member.fullName}</td>
                      <td className="px-3 py-4">{member.title}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{member.phone}</td>
                      <td className="px-3 py-4">{member.email}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.dateOfBirth)}</td>
                      <td className="px-3 py-4">{member.gender}</td>
                      <td className="px-3 py-4">{member.maritalStatus}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.weddingAnniversary)}</td>
                      <td className="px-3 py-4">{member.address}</td>
                      <td className="px-3 py-4">{member.membershipStatus}</td>
                      <td className="px-3 py-4">{member.wsfLocation || "—"}</td>
                      <td className="px-3 py-4">{member.serviceUnit || "—"}</td>
                      <td className="px-3 py-4">{member.birthdayAnniversarySmsConsent ? "Yes" : "No"}</td>
                      <td className="px-3 py-4">{member.editCount}/3</td>
                      <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
          </>
        )}
      </section>
    </div>
  );
}
