"use client";

/**
 * The student dashboard, served by one request.
 *
 * Everything on this page comes from GET /api/dashboard — greeting, stat cards,
 * bank details, progress, next lesson, class schedule, assignments and
 * announcements. It is a single call on purpose: all nine panels are visible at
 * once, so nine round trips would show the page assembling itself.
 *
 * Most strings arrive display-ready ("₦3,000", "NEXT LESSON · 09",
 * "1 of 3 lessons complete", "Due Fri, 27 Mar"), so this file substitutes them
 * rather than formatting anything a second time.
 */

import Link from "next/link";
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
import { api, authorizedFileUrl } from "@/lib/api";
import { messageOf, useAction, useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import { useToast } from "@/components/ui/Toast";

/**
 * The icon and colour for each stat card, in the order the API returns them.
 * Only the label and value are data; the styling stays here because it is a
 * presentation choice, not something the server should be deciding.
 */
const STAT_STYLES = [
  [BookOpen, "bg-blue-50 text-blue-700"],
  [CalendarDays, "bg-emerald-50 text-emerald-700"],
  [CreditCard, "bg-amber-50 text-amber-700"],
  [Trophy, "bg-violet-50 text-violet-700"],
];

export default function StudentDashboard() {
  const dashboard = useApi(() => api.dashboard.get());
  const checkIn = useAction(() => api.attendance.checkIn());
  const markRead = useAction((id) => api.announcements.markRead(id));
  const toast = useToast();

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Account number copied");
    } catch {
      // Clipboard access can be refused (an insecure origin, or a denied
      // permission). Saying so beats a button that silently does nothing.
      toast.error("Copy failed — select the number manually");
    }
  };

  const submitCheckIn = async () => {
    const { ok, error } = await checkIn.run();
    if (ok) {
      toast.success("Checked in for today");
      dashboard.reload();
      return;
    }
    toast.error(messageOf(error));
  };

  const openAttachment = (announcement) => {
    const url = authorizedFileUrl(announcement.attachment);
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    if (!announcement.read) {
      markRead.run(announcement.id).then(({ ok }) => {
        if (ok) dashboard.reload();
      });
    }
  };

  if (dashboard.loading) {
    return (
      <div className="mx-auto max-w-7xl pb-8">
        <Loading label="Loading your dashboard…" />
      </div>
    );
  }
  if (dashboard.error || !dashboard.data) {
    return (
      <div className="mx-auto max-w-7xl pb-8">
        <ErrorNote error={dashboard.error} onRetry={dashboard.reload} />
      </div>
    );
  }

  const {
    student,
    stats = [],
    nextAction,
    progress,
    continueLearning,
    classSchedule,
    assignments = [],
    announcements,
    attendance,
    bank,
  } = dashboard.data;

  const latest = announcements?.latest || null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#343A40]  px-6 py-8 text-white shadow-[0_18px_45px_rgba(18,58,120,.2)] sm:px-9 sm:py-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[28px] border-[#e5b85c]/20" />
        <div className="absolute bottom-0 right-32 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[20px] font-semibold text-white">
              <Sparkles size={14} /> {student.intakeBadge}
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              {student.greeting}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50/75">
         You’re making great progress,Keep going and complete your registration to stay on track toward successfully completing your WOFBI program and graduating.
            </p>
            <Link href={nextAction?.href || "/dashboard/user/new"}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#152b50] transition hover:bg-white"
            >
              {nextAction?.label || "Continue Registration"}<ArrowRight size={17} />
            </Link>
            {/* The API decides this sentence from the application and payment state,
                so it is the one place a rejected receipt or a request for more
                information surfaces on the hero. */}
            {nextAction?.hint && (
              <p className="mt-3 text-xs text-emerald-50/60">{nextAction.hint}</p>
            )}
          </div>
          <div className="hidden w-full space-y-4 lg:block">
  <div className="rounded-2xl border border-white/15 bg-white/[.09] p-5">
    {/* Header */}
    <div className="">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-50/60">
        WOFBI Payment
      </p>
      <p className="mt-1 text-lg font-bold text-white">
        Make Payment
      </p>
    </div>

    {/* Account Name */}
    <div className="mb-3">
      <p className="text-xs text-white/50">Account Name</p>
      <p className="mt-1 text-sm font-semibold text-white">
        {bank.accountName}
      </p>
    </div>

    {/* Bank Name */}
    <div className="mb-3">
      <p className="text-xs text-white/50">Bank Name</p>
      <p className="mt-1 text-sm font-semibold text-white">
        {bank.bankName}
      </p>
    </div>

    {/* Account Number */}
    <div className="mb-3">
      <p className="text-xs text-white/50">Account Number</p>

      <div className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-white/10 px-3 py-2">
        <p className="text-sm font-semibold tracking-wider text-white">
          {bank.accountNumber}
        </p>

        <button
          type="button"
          onClick={() => copy(bank.accountNumber)}
          className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[#123a78] transition hover:bg-white/90"
        >
          Copy
        </button>
      </div>
    </div>

    {/* Amount */}
    <div>
      <p className="text-xs text-white/50">Amount to Pay</p>
      <p className="mt-1 text-xl font-bold text-[#ffe3a1]">
        {bank.amountDisplay}
      </p>
    </div>
  </div>
 <div className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/[.09] p-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#123a78]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#343A40]  text-sm font-bold text-white">
                {progress.percentLabel}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-50/60">
                Course progress
              </p>
              <p className="mt-1 text-lg font-bold">{progress.countLabel}</p>
              <p className="mt-1 text-xs text-[#ffe3a1]">{progress.remainingLabel}</p>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value }, index) => {
          const [Icon, tone] = STAT_STYLES[index] || STAT_STYLES[0];
          return (
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
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
          {continueLearning ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b78220]">
                    Continue learning
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{continueLearning.moduleTitle}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {continueLearning.lecturerLine}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  {continueLearning.statusBadge}
                </span>
              </div>
              {continueLearning.nextLesson ? (
                <div className="mt-6 rounded-2xl bg-[#f2f5fb] p-5 sm:flex sm:items-center sm:gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#343A40]  text-white">
                    <Play size={21} fill="currentColor" />
                  </div>
                  <div className="mt-3 flex-1 sm:mt-0">
                    <p className="text-xs font-semibold text-slate-500">
                      {continueLearning.nextLesson.headingLabel}
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      {continueLearning.nextLesson.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {continueLearning.nextLesson.metaLine}
                    </p>
                  </div>
                  <Link
                    href={continueLearning.nextLesson.href || "/dashboard/user/overview"}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#123a78] sm:mt-0"
                  >
                    Resume <ChevronRight size={17} />
                  </Link>
                </div>
              ) : (
                <p className="mt-6 rounded-2xl bg-[#f2f5fb] p-5 text-sm text-slate-600">
                  Every lesson in this course is complete. Well done.
                </p>
              )}
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">
                  {continueLearning.progress.completeLabel}
                </span>
                <span className="font-bold text-[#123a78]">
                  {continueLearning.progress.percentLabel}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                {/* An inline width, not a Tailwind class: the percentage is a runtime
                    value and Tailwind only ships the classes it can see at build time. */}
                <div
                  className="h-full rounded-full bg-[#e5b85c]"
                  style={{ width: `${continueLearning.progress.percent}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b78220]">
                Continue learning
              </p>
              <h3 className="mt-2 text-xl font-bold">No course yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Your lessons appear here once your application is approved and you are
                enrolled in a programme.
              </p>
              <Link
                href="/dashboard/user/new"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123a78]"
              >
                Go to enrollment <ChevronRight size={17} />
              </Link>
            </>
          )}
        </div>
        <div
          id="attendance"
          className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b78220]">
                All classes
              </p>
              <h3 className="mt-2 text-lg font-bold">{classSchedule.title}</h3>
            </div>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
              <Clock3 size={18} />
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-slate-400" />
              {classSchedule.timeRange}
            </p>
            <div className="flex flex-row items-center gap-2">
              <p>
                <MapPin size={16} className="text-slate-400 " />
              </p>
              <p>
              {classSchedule.venue}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
{classSchedule.days}
         </div>
          {/* The check-in button the attendance endpoint was built for. It is
              disabled once today is marked, because a second POST would only ever
              return the same record. */}
          <button
            type="button"
            onClick={submitCheckIn}
            disabled={attendance.checkedIn || checkIn.busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#343A40] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {attendance.checkedIn ? (
              <>
                <Check size={16} />
                Checked in{attendance.today?.dateLabel ? ` · ${attendance.today.dateLabel}` : ""}
              </>
            ) : (
              checkIn.busy ? "Checking in…" : "Check in for today"
            )}
          </button>
          <p className="mt-3 text-xs text-slate-500">
            Attendance so far: {attendance.rateLabel}
            {attendance.total ? ` · ${attendance.present} of ${attendance.total} class days` : ""}
          </p>
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
          {assignments.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">Nothing due right now.</p>
          )}
          {assignments.map(({ id, title, dueLabel, dueRelative, submitted }) => (
            <div
              key={id}
              className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"
            >
              <div>
                <p className="font-semibold text-slate-800">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{dueLabel}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  submitted ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                }`}
              >
                {submitted ? "Submitted" : dueRelative}
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
            {announcements?.unreadCount > 0 && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                {announcements.unreadLabel}
              </span>
            )}
          </div>
          {latest ? (
            <div className="mt-4 rounded-xl bg-[#fff9eb] p-4">
              <div className="flex items-start gap-3">
                <CircleAlert size={18} className="mt-0.5 text-[#b78220]" />
                <div>
                  <p className="font-semibold text-slate-800">
                    {latest.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {latest.body}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400">{latest.publishedAgo}</p>
                  {latest.attachment && (
                    <button
                      type="button"
                      onClick={() => openAttachment(latest)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#123a78]"
                    >
                      <Download size={14} />
                      {latest.attachment.filename || "Download attachment"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No announcements yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
