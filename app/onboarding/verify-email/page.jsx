'use client';

/**
 * The six-digit code screen.
 *
 * Two different journeys land here, and they need different endings:
 *
 *   register  -> a token was already stored, so verifying finishes onboarding
 *                and the dashboard is reachable immediately.
 *   login     -> /auth/login refused an unverified address with 403 and issued
 *                no token, so after verifying there is still nothing to sign in
 *                with and the login page is the right destination.
 *
 * Which one it was is decided by looking for a stored token rather than by a flag
 * in the URL, because the token is the thing that actually decides whether the
 * dashboard will load.
 */

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, tokens } from '@/lib/api';
import { messageOf, useAction, useQueryParam } from '@/lib/useApi';
import { useToast } from '@/components/ui/Toast';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { value: emailFromLink, ready } = useQueryParam('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const toast = useToast();

  // The address arrives in the query string from both register and login. It is
  // still editable: someone who opens this page from their history has no link to
  // read, and someone who mistyped their address needs a way to correct it.
  useEffect(() => {
    if (ready && emailFromLink) setEmail(emailFromLink);
  }, [ready, emailFromLink]);

  const verify = useAction(() => auth.verifyEmail(email.trim().toLowerCase(), otp.trim()));
  const resend = useAction(() => auth.resendOtp(email.trim().toLowerCase()));

  const submit = async (event) => {
    event.preventDefault();
    const { ok, error } = await verify.run();
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    // Verification does not issue a token of its own, so whether we can go
    // straight in depends on the one register left behind.
    const signedIn = Boolean(tokens.student());
    toast.success(
      signedIn ? 'Email verified.' : 'Email verified. You can now sign in.',
    );
    router.replace(signedIn ? '/dashboard/user' : '/onboarding/login');
  };

  const sendAgain = async () => {
    const { ok, data, error } = await resend.run();
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    toast.success(data?.message || 'Verification code sent. Check your email.');
  };

  // Keep the field to digits only so a pasted "123 456" or "123-456" still works.
  const changeOtp = (event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6));

  const canSubmit = otp.length === 6 && email.trim() !== '' && !verify.busy;

  return (
    <div className="mx-auto max-w-7xl rounded-4xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-[12px] bg-slate-500/10 p-6 sm:p-10">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/wobiimage.jpg"
              alt="Verification illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Almost there</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Verify your email</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                We sent a six-digit code to your inbox. Enter it below to activate your account and
                open your dashboard.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">The code expires 15 minutes after it is sent.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[12px] border border-slate-200 bg-white p-8  sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Verify email</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Enter your code</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {email
              ? <>We sent a code to <span className="font-semibold text-slate-900">{email}</span>. Check your spam folder if it has not arrived.</>
              : 'Enter the email address you registered with and the code we sent you.'}
          </p>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
              />
            </label>

            <label className="space-y-5 text-sm text-slate-700">
              <span>Verification Code</span>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={changeOtp}
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-semibold tracking-[0.5em] text-slate-900 outline-none transition focus:border-red-500"
              />
              <span className="block text-xs text-slate-500">Six digits, from the email we just sent.</span>
            </label>

            {/* Verify failures, resend failures and the "code sent" confirmation
                are all toasts now. */}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {verify.busy ? 'Verifying…' : 'Verify email'}
            </button>

            <p className="text-center text-sm text-slate-600">
              Didn’t get the code?{' '}
              <button
                type="button"
                onClick={sendAgain}
                disabled={resend.busy || !email.trim()}
                className="font-semibold text-red-600 underline transition hover:text-red-700 disabled:opacity-60"
              >
                {resend.busy ? 'Sending…' : 'Send it again'}
              </button>
            </p>

            <p className="text-center text-sm text-slate-600">
              Wrong address? <Link href="/onboarding/register" className="font-semibold text-red-600 hover:text-red-700">Register again</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
