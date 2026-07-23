import Link from "next/link";
import { ArrowLeft, ClipboardList, Search, ShieldCheck, Mail, MessageCircle } from "lucide-react";

export default function AdminAdmissionsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
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
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Search applications", Search, "Search by applicant name, programme, or application ID."],
          ["Review status", ShieldCheck, "Track payment, approval, and application progress."],
          ["Outreach", Mail, "Send email, SMS, and WhatsApp updates to applicants."],
        ].map(([title, Icon, description]) => (
          <article key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-700">
              <Icon size={20} />
              <p className="font-semibold">{title}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Application table</h2>
            <p className="mt-1 text-sm text-slate-500">Search, filter, and take action on applicant records.</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            UI only
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm text-slate-700">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[.16em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Application ID</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3">Intake</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Aisha Abimbola", "APP-1284", "Leadership", "Aug 2026", "Paid", "Review"],
                ["Daniel Emeka", "APP-1283", "Basic Certificate", "Aug 2026", "Pending", "Request info"],
                ["Ruth Okon", "APP-1282", "Leadership", "Sept 2026", "Paid", "Approved"],
              ].map(([name, id, programme, intake, payment, status]) => (
                <tr key={id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4">{name}</td>
                  <td className="px-4 py-4 font-semibold">{id}</td>
                  <td className="px-4 py-4">{programme}</td>
                  <td className="px-4 py-4">{intake}</td>
                  <td className="px-4 py-4">{payment}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "Paid" || status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-xs font-semibold text-emerald-700">
                    View details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
