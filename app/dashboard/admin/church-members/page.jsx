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
const memberDetails = (member) => [
  ["Title", member.title || "—"],
  ["Phone", member.phone || "—"],
  ["Email", member.email || "—"],
  ["Birthday", displayDate(member.dateOfBirth)],
  ["Date ordained", displayDate(member.dateOrdained)],
  ["Occupation", member.occupation || "—"],
  ["Working place", member.workingPlace || "—"],
  ["Date joined commission", displayDate(member.dateJoinedCommission)],
  ["Commission location", member.commissionLocation || "—"],
  ["New birth date", displayDate(member.newBirthDate)],
  ["Date joined LFC New Jerusalem", displayDate(member.dateJoinedLfcNewJerusalem)],
  ["WOFBI programme", member.wofbiProgramme || "—"],
  ["WOFBI attendance date", displayDate(member.wofbiDateAttended)],
  ["Gender", member.gender || "—"],
  ["Marital status", member.maritalStatus || "—"],
  ["Anniversary", displayDate(member.weddingAnniversary)],
  ["Address", member.address || "—"],
  ["Membership", member.membershipStatus || "—"],
  ["WSF centre", member.wsfLocation || "—"],
  ["Service unit", member.serviceUnit || "—"],
  ["SMS consent", member.birthdayAnniversarySmsConsent ? "Yes" : "No"],
  ["Updates used", `${member.editCount}/3`],
  ["Submitted", displayDate(member.createdAt)],
];

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
      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Membership module</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Church members</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Review public Join Us submissions and export the complete matching roster as a spreadsheet-friendly CSV document.
            </p>
          </div>
          <Link href="/dashboard/admin" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 sm:w-auto">
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Member records</h2>
            <p className="mt-1 text-sm text-slate-500">{total} record{total === 1 ? "" : "s"}</p>
          </div>
          <button type="button" onClick={downloadCsv} disabled={exporting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60 sm:w-auto">
            <Download size={16} /> {exporting ? "Preparing download..." : "Download CSV"}
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(term.trim());
            setPage(1);
          }}
          className="mt-5 flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 sm:max-w-md"
        >
          <Search size={16} className="shrink-0 text-slate-400" />
          <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search name, email, phone..." className="min-w-0 flex-1 text-sm outline-none" />
          <button type="submit" className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-700">Search</button>
        </form>

        {exportError && <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{exportError}</p>}
        {list.loading && <Loading label="Loading church members..." />}
        {!list.loading && list.error && <ErrorNote error={list.error} onRetry={list.reload} />}
        {!list.loading && !list.error && (
          <>
            {members.length === 0 ? (
              <p className="mt-5 rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                No member records found.
              </p>
            ) : (
              <>
                <div className="mt-5 space-y-3 xl:hidden">
                  {members.map((member) => (
                    <article key={member.id} className="min-w-0 rounded-2xl border border-slate-200 p-4">
                      <h3 className="break-words text-base font-semibold text-slate-900">{member.fullName || "Unnamed member"}</h3>
                      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        {memberDetails(member).map(([label, value]) => (
                          <div key={label} className={`min-w-0 ${label === "Address" ? "sm:col-span-2" : ""}`}>
                            <dt className="text-xs font-medium text-slate-500">{label}</dt>
                            <dd className="mt-1 break-words text-sm text-slate-800">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  ))}
                </div>
                <div className="mt-5 hidden overflow-x-auto xl:block">
                  <table className="w-full min-w-[2500px] text-left text-sm text-slate-700">
                    <thead className="border-b border-slate-200 text-xs uppercase tracking-[.12em] text-slate-400">
                      <tr>
                        <th className="px-3 py-3">Name</th>
                        <th className="px-3 py-3">Title</th>
                        <th className="px-3 py-3">Phone</th>
                        <th className="px-3 py-3">Email</th>
                        <th className="px-3 py-3">Birthday</th>
                        <th className="px-3 py-3">Date ordained</th>
                        <th className="px-3 py-3">Occupation</th>
                        <th className="px-3 py-3">Working place</th>
                        <th className="px-3 py-3">Date joined commission</th>
                        <th className="px-3 py-3">Commission location</th>
                        <th className="px-3 py-3">New birth date</th>
                        <th className="px-3 py-3">Date joined LFC New Jerusalem</th>
                        <th className="px-3 py-3">WOFBI programme</th>
                        <th className="px-3 py-3">WOFBI attendance date</th>
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
                      {members.map((member) => (
                        <tr key={member.id} className="border-b border-slate-100 align-top hover:bg-slate-50">
                          <td className="px-3 py-4 font-semibold">{member.fullName}</td>
                          <td className="px-3 py-4">{member.title}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{member.phone}</td>
                          <td className="px-3 py-4">{member.email}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.dateOfBirth)}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.dateOrdained)}</td>
                          <td className="px-3 py-4">{member.occupation || "—"}</td>
                          <td className="px-3 py-4">{member.workingPlace || "—"}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.dateJoinedCommission)}</td>
                          <td className="px-3 py-4">{member.commissionLocation || "—"}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.newBirthDate)}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.dateJoinedLfcNewJerusalem)}</td>
                          <td className="px-3 py-4">{member.wofbiProgramme || "—"}</td>
                          <td className="px-3 py-4 whitespace-nowrap">{displayDate(member.wofbiDateAttended)}</td>
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
              </>
            )}
            <TablePagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
          </>
        )}
      </section>
    </div>
  );
}
