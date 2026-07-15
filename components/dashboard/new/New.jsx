import React from 'react';

const New = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Dashboard</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create a new entry</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          This section now sits inside the dedicated admin shell with its own sidebar and navigation.
        </p>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          Your form and dashboard content can be added here next.
        </div>
      </div>
    </div>
  );
};

export default New;