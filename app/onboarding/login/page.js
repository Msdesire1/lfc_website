'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { messageOf, useAction } from '@/lib/useApi';
import { useToast } from '@/components/ui/Toast';
import PasswordField from '@/components/ui/PasswordField';
import { emailError } from '@/lib/onboardingValidation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [clientErrors, setClientErrors] = useState({});
  const signIn = useAction(() => auth.login(form.email.trim(), form.password));
  const toast = useToast();

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setClientErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const errors = {};
    const email = emailError(form.email);
    if (email) errors.email = email;
    if (!form.password) errors.password = 'Enter your password.';
    setClientErrors(errors);
    if (Object.keys(errors).length) {
      toast.error('Please correct the highlighted fields.');
      return;
    }
    const { ok, data, error } = await signIn.run();

    if (ok) {
      // Greet by name when the API supplies one; the toast then survives the
      // navigation, so it lands on the dashboard as confirmation.
      const name = data?.user?.firstName;
      toast.success(name ? `Welcome back, ${name}.` : 'Signed in.');
      router.replace('/dashboard/user');
      return;
    }

    // An unverified address is not a failed sign-in, it is an unfinished one.
    // Send them to the code screen with their email already filled in rather than
    // showing an error they cannot resolve from here.
    if (error?.code === 'EMAIL_NOT_VERIFIED') {
      toast.info('Your email is not verified yet — enter the code we sent you.');
      router.push(`/onboarding/verify-email?email=${encodeURIComponent(form.email.trim())}`);
      return;
    }

    toast.error(messageOf(error));
  };

  const fieldError = (name) => clientErrors[name] || signIn.error?.errors?.[name];

  return (
    <div className="mx-auto max-w-7xl rounded-2xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-4xl bg-slate-500/10 p-6 sm:p-10">
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
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Welcome to WOFBI</p>
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
                placeholder="you@example.com"
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

            {/* Sign-in failures are toasts now. Field-level messages stay inline
                above, since a toast cannot point at which box is wrong. */}

        <div className=' justify-center flex w-full  py-3  '>
          <button type="submit" disabled={signIn.busy} className="rounded-full  text-center w-full  bg-red-600  py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60">
              {signIn.busy ? 'Signing in…' : 'Sign In'}
            </button>
            </div>


            <p className="text-center text-sm text-slate-600">
              Don’t have an account? <Link href="/onboarding/register" className="font-semibold text-red-600 hover:text-red-700">Register here</Link>
            </p>
            <p className="text-center text-sm text-slate-600">
              <Link href="/onboarding/forgot-password" className="font-semibold text-red-600 hover:text-red-700">Forgot password?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
