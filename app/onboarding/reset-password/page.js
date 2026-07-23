import Image from 'next/image';
import React from 'react';

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-7xl rounded-2xl   sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-2xl bg-slate-500/10 p-6 sm:p-10">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/wobiimage.jpg"
              alt="Reset password illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Onboarding</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Set a new password</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                Secure your account with a strong new password and continue your learning.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Choose something secure and easy to remember.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8  sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Reset password</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Set a new password</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Enter your new password below to restore access to your account.
          </p>

          <form className="mt-8 space-y-6">
            <label className="space-y-2 text-sm text-slate-700">
              <span>New Password</span>
              <input
                type="password"
                placeholder="New password"
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

            <button
              type="submit"
              className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Reset password
            </button>

            <p className="text-center text-sm text-slate-600">
              Back to <a href="/onboarding/login" className="font-semibold text-red-600 hover:text-red-700">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
