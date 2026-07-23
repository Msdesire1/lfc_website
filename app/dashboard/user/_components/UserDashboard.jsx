"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  CreditCard,
  Download,
  MapPin,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function StudentDashboard() {
  const [toast, setToast] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">
      {toast && (
        <div className="fixed right-5 top-24 z-30 flex items-center gap-2 rounded-xl bg-[#343A40]  px-4 py-3 text-sm font-medium text-white shadow-xl">
          <Check size={16} />
          {toast}
        </div>
      )}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#343A40]  px-6 py-8 text-white shadow-[0_18px_45px_rgba(18,58,120,.2)] sm:px-9 sm:py-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[28px] border-[#e5b85c]/20" />
        <div className="absolute bottom-0 right-32 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              <Sparkles size={14} /> Spring 2026 intake · BCC
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, Esther.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50/75">
              You&apos;re making excellent progress. kindly  Continue your registration on  Continue learning to complete your registration.
              and stay on track for graduation.
            </p>
            <Link href={"/dashboard/user/new"}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#152b50] transition hover:bg-white"
            >
              Continue learning  <ArrowRight size={17} />
            </Link>
          </div>
          <div className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/[.09] p-4 sm:min-w-72">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#123a78]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#343A40]  text-sm font-bold text-white">
                68%
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-50/60">
                Course progress
              </p>
              <p className="mt-1 text-lg font-bold">8 of 12 lessons</p>
              <p className="mt-1 text-xs text-[#ffe3a1]">4 lessons to go</p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Student ID", "WOF/26/01482", BookOpen, "bg-blue-50 text-blue-700"],
          ["Attendance", "94%", CalendarDays, "bg-emerald-50 text-emerald-700"],
          [
            "Payment status",
            "Paid in full",
            CreditCard,
            "bg-amber-50 text-amber-700",
          ],
          ["Class of", "Spring 2026", Trophy, "bg-violet-50 text-violet-700"],
        ].map(([label, value, Icon, tone]) => (
          <article
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b78220]">
                Continue learning
              </p>
              <h3 className="mt-2 text-xl font-bold">Foundations of Faith</h3>
              <p className="mt-1 text-sm text-slate-500">
                with Pst. Michael Adebayo · Basic Certificate Course
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              In progress
            </span>
          </div>
          <div className="mt-6 rounded-2xl bg-[#f2f5fb] p-5 sm:flex sm:items-center sm:gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#343A40]  text-white">
              <Play size={21} fill="currentColor" />
            </div>
            <div className="mt-3 flex-1 sm:mt-0">
              <p className="text-xs font-semibold text-slate-500">
                NEXT LESSON · 09
              </p>
              <p className="mt-1 font-bold text-slate-900">
                Understanding the Word of Faith
              </p>
              <p className="mt-1 text-xs text-slate-500">
                36 min remaining · Video lesson
              </p>
            </div>
            <button
              onClick={() => showToast("Lesson marked as started")}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#123a78] sm:mt-0"
            >
              Resume <ChevronRight size={17} />
            </button>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600">
              8 of 12 lessons complete
            </span>
            <span className="font-bold text-[#123a78]">68%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[68%] rounded-full bg-[#e5b85c]" />
          </div>
        </div>
        <div
          id="attendance"
          className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b78220]">
                Today&apos;s class
              </p>
              <h3 className="mt-2 text-lg font-bold">Covenant Practice</h3>
            </div>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
              <Clock3 size={18} />
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-slate-400" />
              10:00 AM – 12:00 PM
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400" />
              Faith Academy Hall, Ota
            </p>
          </div>
          <button
            onClick={() => setCheckedIn(!checkedIn)}
            className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition ${checkedIn ? "bg-emerald-50 text-emerald-700" : "bg-[#343A40]  text-white hover:bg-[#0d3064]"}`}
          >
            {checkedIn ? (
              <span className="inline-flex items-center gap-2">
                <Check size={16} />
                Checked in
              </span>
            ) : (
              "Check in with QR"
            )}
          </button>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div
          id="assignments"
          className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Upcoming assignments</h3>
            <Link
              href="/dashboard/user/overview"
              className="text-sm font-bold text-[#123a78]"
            >
              View all
            </Link>
          </div>
          {[
            ["The Power of Vision", "Due Fri, 27 Mar", "In 4 days"],
            ["My Kingdom Stewardship Plan", "Due Tue, 31 Mar", "In 8 days"],
          ].map(([title, date, due]) => (
            <div
              key={title}
              className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"
            >
              <div>
                <p className="font-semibold text-slate-800">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{date}</p>
              </div>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
                {due}
              </span>
            </div>
          ))}
        </div>
        <div
          id="announcements"
          className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Latest announcements</h3>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
              2 new
            </span>
          </div>
          <div className="mt-4 rounded-xl bg-[#fff9eb] p-4">
            <div className="flex items-start gap-3">
              <CircleAlert size={18} className="mt-0.5 text-[#b78220]" />
              <div>
                <p className="font-semibold text-slate-800">
                  Mid-semester examination schedule
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The examination timetable is now available. Please review your
                  course dates.
                </p>
                <button
                  onClick={() => showToast("Schedule downloaded")}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#123a78]"
                >
                  <Download size={14} />
                  Download schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
