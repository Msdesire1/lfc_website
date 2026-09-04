"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

/** Accessible table heading that cycles between ascending and descending order. */
export default function SortableTableHeader({ column, sort, onSort, children, className = "" }) {
  const active = sort.column === column;
  const Icon = active ? (sort.direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <th className={`px-4 py-3 ${className}`} aria-sort={active ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}>
      <button
        type="button"
        onClick={() => onSort(column)}
        className="inline-flex items-center gap-1.5 text-left transition hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        {children} <Icon size={14} aria-hidden="true" />
      </button>
    </th>
  );
}
