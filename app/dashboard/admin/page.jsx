"use client";

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
  Settings2,
  ShieldCheck,
  Users,
  UsersRound,
  Video,
} from "lucide-react";

const kpis = [
  ["Total applications", "1,284", "+12.5%", ClipboardList, "bg-sky-50 text-sky-700"],
  ["Approved students", "712", "+9.7%", CheckCircle2, "bg-emerald-50 text-emerald-700"],
  ["Active students", "942", "+8.2%", UsersRound, "bg-emerald-50 text-emerald-700"],
  ["Active courses", "42", "+3 new", BookOpen, "bg-indigo-50 text-indigo-700"],
  ["Lecturers", "28", "+1", Users, "bg-violet-50 text-violet-700"],
  ["Revenue", "₦18.4m", "+18.1%", CircleDollarSign, "bg-fuchsia-50 text-fuchsia-700"],
  ["Attendance rate", "94%", "+2.1 pts", BarChart3, "bg-amber-50 text-amber-700"],
  ["Certificates issued", "182", "+24", FileBadge, "bg-cyan-50 text-cyan-700"],
];

const adminModules = [
  ["Admissions", "/dashboard/admin/admissions", "Review applicants, workflows, and approval actions.", ClipboardList],
  ["Programmes", "/dashboard/admin/programmes", "Create and manage programme intakes and capacity.", BookOpen],
  ["Courses", "/dashboard/admin/courses", "Publish courses, upload content, and assign lecturers.", Video],
  ["Lecturers", "/dashboard/admin/lecturers", "Manage teaching assignments and schedules.", Users],
  ["Classes", "/dashboard/admin/classes", "Track upcoming classes and timetable details.", CalendarDays],
  ["Attendance", "/dashboard/admin/attendance", "Review attendance analytics and reports.", BarChart3],
  ["Payments", "/dashboard/admin/payments", "View payment records, receipts, and refunds.", CreditCard],
];

const recentRegistrations = [
  ["APP-1284", "Aisha Abimbola", "Leadership", "2026-07-18", "Paid", "Review"],
  ["APP-1283", "Daniel Emeka", "Basic Certificate", "2026-07-17", "Pending", "Request info"],
  ["APP-1282", "Ruth Okon", "Leadership", "2026-07-16", "Paid", "Approved"],
];

const recentPayments = [
  ["PAY-0842", "Aisha Abimbola", "₦120,000", "Successful", "2026-07-18"],
  ["PAY-0841", "Daniel Emeka", "₦120,000", "Pending", "2026-07-17"],
  ["PAY-0840", "Ruth Okon", "₦120,000", "Successful", "2026-07-16"],
];

const upcomingClasses = [
  ["Mon, Jul 22", "Leadership Workshop", "Room 3B"],
  ["Tue, Jul 23", "Bible Study", "Main Hall"],
  ["Thu, Jul 25", "Assessment Review", "Online"],
];

const notifications = [
  ["New application received", "2 minutes ago"],
  ["Payment pending for APP-1283", "22 minutes ago"],
  ["Certificate ready for Issy Martins", "1 hour ago"],
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-4xl border border-slate-200/80 bg-[#343A40] p-8 text-white shadow-sm sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-red-500">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">WOFBI admissions & learning operations</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100/75">
              Monitor admissions, student progress, programmes, payments, attendance, certificates, and system management from one central hub.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 px-5 py-4 text-sm text-slate-100">
            <p className="font-semibold">Total learners</p>
            <p className="mt-3 text-3xl font-bold">1,246</p>
            <p className="mt-1 text-xs text-emerald-100/70">Active enrolments across all programmes</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(([label, value, detail, Icon, tone]) => (
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
        ))}
      </section>

      <section className="">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Recent registrations</p>
              <h2 className="mt-2 text-xl font-bold">Admissions activity</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">3 new records</span>
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
                {recentRegistrations.map(([id, name, programme, date, payment, status]) => (
                  <tr key={id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-slate-900">{id}</td>
                    <td className="px-4 py-4">{name}</td>
                    <td className="px-4 py-4">{programme}</td>
                    <td className="px-4 py-4">{date}</td>
                    <td className="px-4 py-4">{payment}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "Paid" || status === "Approved" ? "bg-emerald-50 text-emerald-700" : status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </section>
    </div>
  );
}
