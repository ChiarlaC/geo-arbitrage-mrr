"use client";

import { PricingData } from "@/lib/types";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

const columnHelper = createColumnHelper<PricingData>();

const columns = [
  columnHelper.accessor("service", {
    header: "Service",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("plan", {
    header: "Plan",
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("local_price", {
    header: "Local Price",
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("usd_price", {
    header: "USD Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
    enableSorting: true,
  }),
  columnHelper.accessor("savings_vs_us", {
    header: "Savings vs US",
    cell: (info) => `${info.getValue().toFixed(1)}%`,
    enableSorting: true,
  }),
];

interface PricingTableProps {
  data: PricingData[];
}

export default function PricingTable({ data }: PricingTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "savings_vs_us", desc: true },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200/50 bg-white shadow-sm">
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-primary-50 to-primary-100/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-primary-800 uppercase tracking-wide border-b border-primary-200/50"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-1 hover:text-primary-600 transition-colors"
                            : "flex items-center"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className={`hover:bg-primary-50/30 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td 
                    key={cell.id} 
                    className="px-6 py-4 text-sm text-neutral-800 font-medium border-b border-neutral-100 last:border-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
