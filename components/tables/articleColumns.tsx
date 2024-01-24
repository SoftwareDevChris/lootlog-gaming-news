"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TArticle } from "@/types/types";
import { Button } from "../ui/button";

export const articleColumns: ColumnDef<TArticle>[] = [
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
    cell: (row) => {
      return (
        <div className="flex space-x-2">
          <Button className="bg-neutral-500 text-neutral-100 hover:bg-neutral-500">
            Edit
          </Button>
          <Button className="bg-red-800 text-neutral-100 hover:bg-red-800">
            Delete
          </Button>
        </div>
      );
    },
  },
];
