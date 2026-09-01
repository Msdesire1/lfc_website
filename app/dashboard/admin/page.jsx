"use client";

/**
 * The admin landing page, served by GET /api/admin/overview.
 *
 * The eight KPI figures, the hero's learner count, the admissions activity table,
 * recent payments, the next class sessions and the notification feed all come
 * from that one request — every panel is on screen together, so seven separate
 * calls would only show the page assembling itself.
 *
 * Icons and colours stay in this file. They are a presentation choice, and the
 * API has no business deciding them; it sends labels, values and already-formatted
 * detail lines ("+12.5%", "₦18.4m", "2 minutes ago").
 */

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileBadge,
  Users,
  UsersRound,
} from "lucide-react";
import { admin } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";

/**
 * Keyed on the label rather than the array position: the API is free to reorder
 * or add a KPI without silently handing "Revenue" the attendance icon.
 */
const KPI_STYLES = {
  "Total applications": [ClipboardList, "bg-sky-50 text-sky-700"],
  "Approved students": [CheckCircle2, "bg-emerald-50 text-emerald-700"],
  "Active students": [UsersRound, "bg-emerald-50 text-emerald-700"],
  "Active courses": [BookOpen, "bg-indigo-50 text-indigo-700"],
  Lecturers: [Users, "bg-violet-50 text-violet-700"],
  Revenue: [CircleDollarSign, "bg-fuchsia-50 text-fuchsia-700"],
  "Attendance rate": [BarChart3, "bg-amber-50 text-amber-700"],
  "Certificates issued": [FileBadge, "bg-cyan-50 text-cyan-700"],
};
const FALLBACK_KPI = [ClipboardList, "bg-slate-100 text-slate-700"];

const statusTone = (status) =>
  status === "Paid" || status === "Approved" || status === "Successful"
    ? "bg-emerald-50 text-emerald-700"
    : status === "Pending" || status === "Review"
    ? "bg-amber-50 text-amber-700"
    : status === "Rejected"
    ? "bg-red-50 text-red-700"
    : "bg-slate-100 text-slate-700";

export default function AdminDashboard() {
  const overview = useApi(() => admin.overview(), { as: "admin" });

  if (overview.loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <Loading label="Loading the admin overview…" />
      </div>
    );
  }
  if (overview.error || !overview.data) {
    return (
      <div className="mx-auto max-w-7xl">
        <ErrorNote error={overview.error} onRetry={overview.reload} />
      </div>
    );
  }

  const {
    hero,
    kpis = [],
    recentRegistrations = [],
    recentRegistrationsLabel,
    recentPayments = [],
    upcomingClasses = [],
    notifications = [],
  } = overview.data;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-4xl border border-slate-200/80 bg-[#343A40] p-8 text-white shadow-sm sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-red-500">{hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">{hero.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100/75">
              Monitor admissions, student progress, programmes, payments, attendance, certificates, and system management from one central hub.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 px-5 py-4 text-sm text-slate-100">
            <p className="font-semibold">Total learners</p>
            <p className="mt-3 text-3xl font-bold">{hero.totalLearners}</p>
            <p className="mt-1 text-xs text-emerald-100/70">{hero.totalLearnersCaption}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, detail }) => {
          const [Icon, tone] = KPI_STYLES[label] || FALLBACK_KPI;
          return (
            <article key={label} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[.15em] text-slate-500">{label}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
                </div>
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Recent registrations</p>
              <h2 className="mt-2 text-xl font-bold">Admissions activity</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{recentRegistrationsLabel}</span>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[.2em] text-slate-400">
                <tr>
                  <th className="px-4 py-3">Application ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Programme</th>
                  <th className="px-4 py-3">Registration</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                      No applications have been submitted yet.
                    </td>
                  </tr>
                )}
                {recentRegistrations.map(({ id, name, programme, registeredOn, payment, status }) => (
                  <tr key={id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-slate-900">{id}</td>
                    <td className="px-4 py-4">{name}</td>
                    <td className="px-4 py-4">{programme}</td>
                    <td className="px-4 py-4">{registeredOn}</td>
                    <td className="px-4 py-4">{payment}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone(status)}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/dashboard/admin/admissions"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
          >
            Open the admissions queue <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-700">
            <CreditCard size={20} />
            <h2 className="text-lg font-bold text-slate-900">Recent payments</h2>
          </div>
          {recentPayments.length === 0 && (
            <p className="mt-5 text-sm text-slate-500">No receipts have been submitted yet.</p>
          )}
          <ul className="mt-5 space-y-3">
            {recentPayments.map((payment) => (
              <li key={payment.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{payment.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{payment.id} · {payment.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-900">{payment.amount}</p>
                  <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTone(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard/admin/payments"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
          >
            Review receipts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-700">
            <CalendarDays size={20} />
            <h2 className="text-lg font-bold text-slate-900">Upcoming classes</h2>
          </div>
          {/* Projected forward from the recurring timetable rather than read from a
              table of one-off events — WOFBI runs one weekly schedule. */}
          <ul className="mt-5 space-y-3">
            {upcomingClasses.map((session) => (
              <li key={session.isoDate} className="rounded-2xl border border-slate-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-400">{session.date}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{session.title}</p>
                <p className="mt-1 text-xs text-slate-500">{session.venue} · {session.timeRange}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-700">
            <Bell size={20} />
            <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
          </div>
          {notifications.length === 0 && (
            <p className="mt-5 text-sm text-slate-500">Nothing needs your attention right now.</p>
          )}
          <ul className="mt-5 space-y-3">
            {notifications.map((item) => (
              <li key={`${item.title}-${item.reference}`}>
                <Link
                  href={item.href}
                  className="block rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
                >
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.detail || item.reference}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{item.timeLabel}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
