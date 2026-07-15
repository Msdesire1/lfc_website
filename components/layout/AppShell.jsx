'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserPlus, BookOpen, ArrowUpRight, Home, Lock, KeyRound, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';
import Quick from '@/components/website/Quick';

const dashboardNav = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'New Entry', href: '/dashboard/new', icon: BookOpen },
];

// const onboardingNav = [
//   { label: 'Register', href: '/onboarding/register', icon: UserPlus },
//   { label: 'Login', href: '/onboarding/login', icon: Lock },
//   { label: 'Forgot password', href: '/onboarding/forgot-password', icon: KeyRound },
//   { label: 'Reset password', href: '/onboarding/reset-password', icon: ShieldCheck },
// ];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  const isOnboardingRoute = pathname?.startsWith('/onboarding');

  if (isDashboardRoute) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <aside className="w-full  p-6 shadow-sm lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">LFC Admin</p>
                <p className="text-xs text-slate-500">Member workspace</p>
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {dashboardNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.label}
                    </span>
                    <ArrowUpRight size={16} />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Need to return to the site?</p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <Home size={16} />
                Go to website
              </Link>
            </div>
          </aside>

          <div className="flex-1">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
              <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                <div>
                  <p className="text-sm font-medium text-red-600">Dashboard</p>
                  <h1 className="text-xl font-semibold text-slate-900">Welcome back</h1>
                </div>
                <Link
                  href="/dashboard/new"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:text-red-600"
                >
                  Open new workspace
                </Link>
              </div>
            </header>

            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </div>
    );
  }

  if (isOnboardingRoute) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.25),transparent_35%),linear-gradient(135deg,#0f172a,#111827_45%,#7f1d1d)] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">

          <main className="flex-1 py-6">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-15">{children}</div>
      <Quick />
      <Footer />
    </div>
  );
}
