'use client';

/**
 * Administrator sign-in.
 *
 * A separate page from the student login on purpose: it posts to
 * /api/admin/auth/login, which is signed with a different secret and stores its
 * token under a different key. There is no admin registration link because there
 * is no public admin sign-up — the first account comes from the seed script and
 * every one after it is created inside the console.
 */

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { admin } from '@/lib/api';
import { messageOf, useAction } from '@/lib/useApi';
import { useToast } from '@/components/ui/Toast';
import PasswordField from '@/components/ui/PasswordField';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const signIn = useAction(() => admin.auth.login(form.email.trim().toLowerCase(), form.password), {
    as: 'admin',
  });
  const toast = useToast();

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const { ok, data, error } = await signIn.run();
    if (ok) {
      // The toast survives the navigation, so it lands on the console as
      // confirmation that the session is an admin one.
      const name = data?.admin?.firstName || data?.admin?.name;
      toast.success(name ? `Signed in as ${name}.` : 'Signed in to the console.');
      router.replace('/dashboard/admin');
      return;
    }
    toast.error(messageOf(error));
  };

  const fieldError = (name) => signIn.error?.errors?.[name];

  return (
    <div className="mx-auto max-w-7xl rounded-2xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-[12px] bg-slate-500/10 p-6 sm:p-10">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/wobiimage.jpg"
              alt="Administration illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">WOFBI Administration</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">Console sign-in</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                Review admissions, confirm payments and manage courses from the administrator
                workspace.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">
                Admin sessions expire after 12 hours. Sign in again when yours lapses.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[12px] border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Administrator</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to the console</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Use the credentials issued to you by a super administrator.
          </p>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                required
                autoComplete="email"
                placeholder="admin@wofbi.org"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500"
              />
              {fieldError('email') && <span className="block text-sm text-red-600">{fieldError('email')}</span>}
            </label>
            <PasswordField
              label="Password"
              name="password"
              value={form.password}
              onChange={change}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              error={fieldError('password')}
            />

            {/* Sign-in failures are toasts now; only the per-field messages above
                stay inline, since a toast cannot point at which box is wrong. */}

            <button
              type="submit"
              disabled={signIn.busy}
              className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {signIn.busy ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="text-center text-sm text-slate-600">
              Looking for the student portal? <Link href="/onboarding/login" className="font-semibold text-red-600 hover:text-red-700">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
