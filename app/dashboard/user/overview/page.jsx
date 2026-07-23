import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Play,
  Users,
} from "lucide-react";
import { userDashboardData } from "@/lib/dashboard/user";

const { milestones = [] } = userDashboardData;

export default function UserOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.15em] text-emerald-700">
              Dashboard overview
            </p>
            <h1 className="mt-3 text-3xl font-bold">Overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Your current course progress, next lesson, and completion path in one place.
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

      <section className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <article className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-emerald-700">
                Up next
              </p>
              <h2 className="mt-1 text-xl font-bold">Living by faith</h2>
              <p className="mt-2 text-sm text-slate-500">
                Basic Certificate Course · Module 2
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              Lesson 9
            </span>
          </div>
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#f4f7f1] p-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#12342b] text-[#d9f99d]">
              <Play size={19} fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">The language of faith</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Clock3 size={13} /> 24 min · Video lesson
              </p>
            </div>
            <Link
              href="/dashboard/user/new"
              aria-label="Open lesson"
              className="text-emerald-800"
            >
              Continue
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users size={16} className="text-emerald-700" /> 18 learners in your cohort
            </div>
            <Link
              href="/dashboard/user/new"
              className="text-sm font-bold text-emerald-800"
            >
              View course
            </Link>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Your path to completion</h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at the milestones ahead.
              </p>
            </div>
            <BookOpen size={19} className="text-emerald-700" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map(({ name, complete }, index) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                    complete
                      ? "bg-[#12342b] text-[#d9f99d]"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {complete ? <CheckCircle2 size={15} /> : index + 1}
                </span>
                <span className="text-xs font-semibold text-slate-700">{name}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
