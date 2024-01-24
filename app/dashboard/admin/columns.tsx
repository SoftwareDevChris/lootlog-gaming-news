"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TArticleContent } from "@/types/types";

export const columns: ColumnDef<TArticleContent>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
