"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Clock3,
  CreditCard,
  FileBadge,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings2,
  TimerReset,
  Users,
  Video,
} from "lucide-react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import Quick from "@/components/website/Quick";
import { admin as adminApi, auth } from "@/lib/api";
import { LOGIN_PATH, signOut, useApi } from "@/lib/useApi";

const studentNav = [
  { label: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/user/new", icon: BookOpen },
  { label: "Payments", href: "/dashboard/user/payments", icon: CreditCard },
];
const adminNav = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Admissions", href: "/dashboard/admin/admissions", icon: ClipboardList },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
];

/** "Good morning" before noon, then afternoon, then evening — in the reader's own clock. */
const timeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

/** "Esther Okon" -> "EO"; a single name still gives one letter rather than crashing. */
const initialsOf = (name) =>
  String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "…";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdmin = pathname?.startsWith("/dashboard/admin");
  const isOnboarding = pathname?.startsWith("/onboarding");

  /**
   * Whose name goes in the header.
   *
   * `enabled` keeps this to the dashboard: the public site and the onboarding
   * pages share this shell, and neither has a token to send. It doubles as the
   * session guard — useApi signs out and returns to the right login page on a 401,
   * so an expired token never leaves a half-rendered console on screen.
   */
  const who = useApi(() => (isAdmin ? adminApi.auth.me() : auth.me()), {
    as: isAdmin ? "admin" : "student",
    enabled: Boolean(isDashboard),
    deps: [isAdmin],
  });

  const person = isAdmin ? who.data?.admin : who.data?.user;
  const displayName = isAdmin
    ? person?.name || "Admin"
    : person?.firstName || person?.fullName || "";

  const leave = () => {
    const as = isAdmin ? "admin" : "student";
    signOut(as);
    router.replace(LOGIN_PATH[as]);
  };

  if (isDashboard) {
    const nav = isAdmin ? adminNav : studentNav;
    return (
      <div className="min-h-screen bg-[#f6f7f4] text-slate-900">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <aside className="w-full border-b border-slate-200/80 bg-[#343A40] p-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:flex-col lg:border-b-0 lg:border-r lg:border-white/10 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#12342b]">
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {isAdmin ? "WOFBI Administration" : "WOFBI Learning"}
                </p>
                <p className="text-xs text-emerald-100/65">
                  {isAdmin ? "Administrator workspace" : "Student portal"}
                </p>
              </div>
            </div>
            <nav className="mt-7 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
              {nav.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${pathname === href.split("#")[0] && !href.includes("#") ? "bg-white text-[#12342b] shadow-sm" : "text-emerald-50/70 hover:bg-white/10 hover:text-white"}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>
            {/* Signing out was previously impossible from inside the portal — the
                token stayed in localStorage until it expired. */}
            <button
              type="button"
              onClick={leave}
              className="mt-4 flex w-full shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-emerald-50/70 transition hover:bg-white/10 hover:text-white lg:mt-auto"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </aside>
          <div className="flex-1">
            <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-[#f6f7f4]/85 backdrop-blur-xl">
              <div className="flex items-center justify-between px-5 py-4 sm:px-7 lg:px-9">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-red-600">
                    {isAdmin ? "Operations overview" : "Your learning space"}
                  </p>
                  <h1 className="mt-0.5 text-lg font-bold">
                    {/* The name only arrives after the first request resolves, so the
                        greeting stands alone for a moment rather than flashing a
                        placeholder name that is not the reader's. */}
                    {displayName ? `${timeOfDay()}, ${displayName}` : timeOfDay()}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={isAdmin ? "/dashboard/admin" : "/dashboard/user#announcements"}
                    aria-label="Notifications"
                    className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600"
                  >
                    <Bell size={18} />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                  </Link>
                  <div
                    title={person?.email || ""}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f4dc] text-sm font-bold text-[#12342b]"
                  >
                    {initialsOf(isAdmin ? person?.name : person?.fullName)}
                  </div>
                </div>
              </div>
            </header>
            <main className="p-5 sm:p-7 lg:p-9">{children}</main>
          </div>
        </div>
      </div>
    );
  }
  if (isOnboarding)
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,.25),transparent_35%),linear-gradient(135deg,#0f172a,#111827_45%,#7f1d1d)] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <main className="flex-1 py-6">{children}</main>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div>{children}</div>
      <Quick />
      <Footer />
    </div>
  );
}
