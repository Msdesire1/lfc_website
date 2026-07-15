import React from 'react';

export default function DashboardPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Dashboard</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">Your dashboard overview</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        This is the landing view for the internal workspace. You can extend it with charts, stats, and quick actions next.
      </p>
    </div>
  );
}
