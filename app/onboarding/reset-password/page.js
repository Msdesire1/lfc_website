'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { messageOf, useAction, useQueryParam } from '@/lib/useApi';
import { useToast } from '@/components/ui/Toast';
import PasswordField from '@/components/ui/PasswordField';

export default function ResetPasswordPage() {
  const router = useRouter();
  // The emailed link is /onboarding/reset-password?token=… — a query parameter
  // rather than a path segment, because this page is a single static route.
  const { value: token, ready } = useQueryParam('token');
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [done, setDone] = useState(false);
  const toast = useToast();

  const reset = useAction(() => auth.resetPassword(token, form.password, form.confirmPassword));

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const { ok, data, error } = await reset.run();
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    toast.success(data?.message || 'Password changed. Sign in with your new password.');
    setDone(true);
    // The old session, if there was one, no longer matches the new password.
    // Sending them to sign in is both correct and the shortest route back in.
    setTimeout(() => router.replace('/onboarding/login'), 1500);
  };

  // Both are checked here as well as on the server so the mismatch is caught
  // before a round trip; the server remains the authority.
  const mismatch = form.confirmPassword !== '' && form.password !== form.confirmPassword;
  const canSubmit = !reset.busy && !mismatch && form.password !== '' && Boolean(token);

  // The API answers a weak password with { errors: { password: "…" } }, and that
  // belongs on the field rather than only in a toast that scrolls away.
  const fieldError = (name) => reset.error?.errors?.[name];

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

          {done ? (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-semibold text-green-800">Password updated</p>
              <p className="mt-2 text-sm leading-6 text-green-900">
                Taking you to the sign-in page…{' '}
                <Link href="/onboarding/login" className="font-semibold underline">Go now</Link>
              </p>
            </div>
          ) : ready && !token ? (
            // Nothing can be done without the token, so the form is not offered at
            // all rather than failing on submit.
            <div className="mt-8 space-y-6">
              <p className="text-sm text-red-600">
                This reset link is incomplete or has expired. Request a new one to continue.
              </p>
              <Link
                href="/onboarding/forgot-password"
                className="block w-full rounded-full bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Request a new link
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={submit}>
              <PasswordField
                label="New Password"
                name="password"
                value={form.password}
                onChange={change}
                required
                autoComplete="new-password"
                placeholder="Choose a new password"
                hint="At least 8 characters, with an uppercase letter, a lowercase letter and a number."
                error={fieldError('password')}
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={change}
                required
                autoComplete="new-password"
                placeholder="Type it again"
                invalid={mismatch}
                error={fieldError('confirmPassword') || (mismatch ? 'Passwords do not match.' : '')}
              />

              {/* Failures are toasts now; the mismatch warning above stays inline
                  because it belongs to the confirm field. */}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {reset.busy ? 'Updating…' : 'Reset password'}
              </button>

              <p className="text-center text-sm text-slate-600">
                Back to <Link href="/onboarding/login" className="font-semibold text-red-600 hover:text-red-700">Sign in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
