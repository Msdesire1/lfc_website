import Image from 'next/image';
import React from 'react';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-7xl rounded-4xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-[12px] bg-slate-950/10 p-6 sm:p-10">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/wobiimage.jpg"
              alt="Onboarding illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Welcome to WOFBI</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Create your account</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                Start your WOFBI course today. Complete the registration form and unlock access to your learning dashboard.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Trusted by learners across the ministry.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[12px] border border-slate-200 bg-white p-8  sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Register</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create your account</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Fill in your details to start your journey. Already have an account? Sign in instead.
          </p>

          <form className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>First Name</span>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Email Address</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Phone Number</span>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
                />
              </label>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-red-600 accent-red-600" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Create Account
            </button>

            <p className="pt-2 text-center text-sm text-slate-600">
              Already have an account? <a href="/onboarding/login" className="font-semibold text-red-600 hover:text-red-700">Sign in here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
