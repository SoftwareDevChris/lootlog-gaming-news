"use client";

import { TArticleContent } from "@/types/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const ArticleTable: React.FC<{
  data: TArticleContent[];
  columns: ColumnDef<TArticleContent>[];
}> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="pb-4">
      <table className="w-full table-auto">
        {/* Table Header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full border-b-2 text-neutral-100"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="border-neutral-100 p-4 text-start"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-500">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-neutral-500 p-4 text-neutral-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td>No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
