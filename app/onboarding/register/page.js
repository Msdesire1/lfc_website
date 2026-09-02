'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { messageOf, useAction } from '@/lib/useApi';
import { useToast } from '@/components/ui/Toast';
import PasswordField from '@/components/ui/PasswordField';
import { registrationErrors } from '@/lib/onboardingValidation';

const empty = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [accepted, setAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const create = useAction(() => auth.register({ ...form, email: form.email.trim().toLowerCase() }));
  const toast = useToast();

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setClientErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const errors = registrationErrors(form, accepted);
    setClientErrors(errors);
    if (Object.keys(errors).length) {
      toast.error('Please correct the highlighted fields.');
      return;
    }
    const { ok, data, error } = await create.run();
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    // Registration already returns a session token, so the code screen is the only
    // step left before the dashboard.
    toast.success(data?.message || 'Account created. Check your email for a verification code.');
    router.replace(`/onboarding/verify-email?email=${encodeURIComponent(form.email.trim().toLowerCase())}`);
  };

  // The API answers 422 with { errors: { firstName: "…", password: "…" } }, which
  // is exactly one message per input.
  const fieldError = (name) => clientErrors[name] || create.error?.errors?.[name];

  const inputClass = (name) =>
    `w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 ${
      fieldError(name) ? 'border-red-400' : 'border-slate-200'
    }`;

  // Only once the second box has something in it — flagging a mismatch against an
  // empty field would mark the form wrong before it has been filled in.
  const mismatch = form.confirmPassword !== '' && form.password !== form.confirmPassword;

  return (
    <div className="mx-auto max-w-7xl rounded-4xl  sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-[12px] bg-slate-500/10 p-6 sm:p-10">
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

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={change}
                  required
                  placeholder="John"
                  className={inputClass('firstName')}
                />
                {fieldError('firstName') && <span className="block text-sm text-red-600">{fieldError('firstName')}</span>}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={change}
                  required
                  placeholder="Doe"
                  className={inputClass('lastName')}
                />
                {fieldError('lastName') && <span className="block text-sm text-red-600">{fieldError('lastName')}</span>}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  className={inputClass('email')}
                />
                {fieldError('email') && <span className="block text-sm text-red-600">{fieldError('email')}</span>}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={change}
                  required
                  placeholder="+234 800 000 0000"
                  className={inputClass('phoneNumber')}
                />
                {/* {fieldError('phoneNumber') && <span className="block text-sm text-red-600">{fieldError('phoneNumber')}</span>} */}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordField
                label="Password"
                name="password"
                value={form.password}
                onChange={change}
                required
                autoComplete="new-password"
                placeholder="Create a password"
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
                // Checked here as well as on the server, so a typo is caught while
                // both boxes are still on screen rather than after a round trip.
                invalid={mismatch}
                error={fieldError('confirmPassword') || (mismatch ? 'Passwords do not match.' : '')}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => { setAccepted(event.target.checked); setClientErrors((current) => ({ ...current, accepted: undefined })); }}
                required
                className="h-4 w-4 rounded border-slate-300 text-red-600 accent-red-600"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            {fieldError('accepted') && <span className="-mt-4 block text-sm text-red-600">{fieldError('accepted')}</span>}

            {/* Page-level failures are toasts now; the per-field messages above
                stay inline. */}

            <button
              type="submit"
              disabled={create.busy || mismatch}
              className="mt-2 w-full rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {create.busy ? 'Creating your account…' : 'Create Account'}
            </button>

            <p className="pt-2 text-center text-sm text-slate-600">
              Already have an account? <Link href="/onboarding/login" className="font-semibold text-red-600 hover:text-red-700">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
