import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

const scheduleItems = [
  ["WED · 6:00 PM", "Live class: Faith & character", "Main auditorium · 60 mins"],
  ["SAT · 10:00 AM", "Module 2 reflection due", "Online submission"],
  ["MON · 7:00 PM", "Small group review", "Room 4B · 45 mins"],
];

export default function UserSchedulePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.15em] text-emerald-700">
              Schedule
            </p>
            <h1 className="mt-3 text-3xl font-bold">This week</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Stay on track with your upcoming sessions, deadlines, and review activities.
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

      <section className="space-y-4">
        {scheduleItems.map(([when, title, details]) => (
          <article
            key={when}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-emerald-700">
                  {when}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{title}</h2>
              </div>
              <CalendarDays size={20} className="text-emerald-700" />
            </div>
            <p className="mt-4 text-sm text-slate-500">{details}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
