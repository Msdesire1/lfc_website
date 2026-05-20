"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
} from "lucide-react";

const homecellData = [
  {
    id: 1,
    district: "ODUME 1",
    homecell: "FAITH HOUSE",
    address: "NO. 18 ISIONYE STREET",
    phone: "08037509663",
  },
  {
    id: 2,
    district: "ODUME 1",
    homecell: "DOMINION",
    address: "NO. ADIRIKA STREET",
    phone: "08063804215",
  },
  {
    id: 3,
    district: "ODUME 1",
    homecell: "TESTIMONY",
    address: "NO. FRANK STREET",
    phone: "08035691657",
  },
  {
    id: 4,
    district: "ODUME 1",
    homecell: "JOY",
    address: "NO. 15 UNITY STREET",
    phone: "08100002329",
  },
  {
    id: 5,
    district: "ODUME 1",
    homecell: "POSSIBILITY",
    address: "NO. 17 IBA STREET NKPOR",
    phone: "09114945203",
  },

  ...Array.from({ length: 45 }, (_, i) => ({
    id: i + 6,
    district: `ODUME ${(i % 5) + 1}`,
    homecell: [
      "FLOURISH",
      "SPIRIT FILLED",
      "NEXT LEVEL",
      "TREASURE",
      "GOOD NEWS",
      "VICTORY",
      "GLORY HOUSE",
      "POWER HOUSE",
      "GRACE CITY",
      "CHAMPIONS",
    ][i % 10],
    address: `NO. ${i + 20} UNITY STREET`,
    phone: `080${Math.floor(
      10000000 + Math.random() * 89999999
    )}`,
  })),
];

export default function HomeCell() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] =
    useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key &&
        prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredData = useMemo(() => {
    return homecellData.filter((item) =>
      Object.values(item).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];

    data.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue)
        return sortConfig.direction === "asc"
          ? -1
          : 1;

      if (aValue > bValue)
        return sortConfig.direction === "asc"
          ? 1
          : -1;

      return 0;
    });

    return data;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(
    sortedData.length / entriesPerPage
  );

  const paginatedData = sortedData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="w-full bg-[#f7f7f7] p-4 md:p-8 rounded-2xl lg:px-20">
<div className="py-5">
        <span className='text-[#EC3237] py-20 text-[25px]'> To find a home cell closest to you, enter the first three letters of your street name in the search box below </span>
</div>
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Entries */}
        <div className="flex items-center gap-3">
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(
                Number(e.target.value)
              );
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <p className="text-gray-700 font-medium">
            entries per page
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-700">
            Search:
          </p>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border-2 border-gray-300 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue-400 bg-white"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#d9edf7]">
            <tr>
              <TableHead
                title="SN"
                onClick={() => handleSort("id")}
              />

              <TableHead
                title="DISTRICT"
                onClick={() =>
                  handleSort("district")
                }
              />

              <TableHead
                title="NAME OF HOMECELL"
                onClick={() =>
                  handleSort("homecell")
                }
              />

              <TableHead
                title="ADDRESS OF CELL"
                onClick={() =>
                  handleSort("address")
                }
              />

              <TableHead
                title="PHONE NUMBER OF LEADER"
                onClick={() =>
                  handleSort("phone")
                }
              />
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5 font-medium">
                  {(currentPage - 1) *
                    entriesPerPage +
                    index +
                    1}
                </td>

                <td className="px-6 py-5 font-medium">
                  {item.district}
                </td>

                <td className="px-6 py-5 font-semibold">
                  {item.homecell}
                </td>

                <td className="px-6 py-5">
                  {item.address}
                </td>

                <td className="px-6 py-5">
                  {item.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
        <p className="text-gray-600 font-medium">
          Showing{" "}
          {(currentPage - 1) *
            entriesPerPage +
            1}{" "}
          to{" "}
          {Math.min(
            currentPage * entriesPerPage,
            sortedData.length
          )}{" "}
          of {sortedData.length} entries
        </p>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          )
            .slice(0, 5)
            .map((page) => (
              <button
                key={page}
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TableHead({
  title,
  onClick,
}) {
  return (
    <th
      onClick={onClick}
      className="px-6 py-5 text-left font-bold text-gray-700 cursor-pointer select-none"
    >
      <div className="flex items-center gap-2">
        {title}

        <ArrowUpDown
          size={16}
          className="text-gray-500"
        />
      </div>
    </th>
  );
}