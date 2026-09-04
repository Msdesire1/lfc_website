"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Table pagination">
      <p className="text-xs text-slate-500">Showing {first}–{last} of {total}</p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">
          <ChevronLeft size={15} /> Previous
        </button>
        <span className="px-2 text-xs font-semibold text-slate-600">Page {page} of {totalPages}</span>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">
          Next <ChevronRight size={15} />
        </button>
      </div>
    </nav>
  );
}
