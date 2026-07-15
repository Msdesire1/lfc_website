import Image from 'next/image';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl rounded-2xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-4xl bg-slate-950/30 p-6 sm:p-10">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/wobiimage.jpg"
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
            <div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Welcome back</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                Sign in to access your course dashboard and continue where you left off.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Secure access to your account and course progress.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl  border-slate-200 bg-white p-8 shadow-lg sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Login</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to your account</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Enter your email and password to continue. Forgot your password? Reset it below.
          </p>

          <form className="mt-8 space-y-6">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email Address</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-slate-600">
              Don’t have an account? <a href="/onboarding/register" className="font-semibold text-red-600 hover:text-red-700">Register here</a>
            </p>
            <p className="text-center text-sm text-slate-600">
              <a href="/onboarding/forgot-password" className="font-semibold text-red-600 hover:text-red-700">Forgot password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
