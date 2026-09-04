export function nextSort(currentSort, column) {
  return {
    column,
    direction: currentSort.column === column && currentSort.direction === "asc" ? "desc" : "asc",
  };
}

export function sortRows(rows, sort, getValue) {
  return [...rows].sort((left, right) => {
    const a = getValue(left, sort.column);
    const b = getValue(right, sort.column);
    const comparison = typeof a === "number" && typeof b === "number"
      ? a - b
      : String(a ?? "").localeCompare(String(b ?? ""), undefined, { numeric: true, sensitivity: "base" });
    return sort.direction === "asc" ? comparison : -comparison;
  });
}
