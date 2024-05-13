"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/badge";
import { Checkbox } from "@components/ui/checkbox";
import { SchemaPrimitive } from "@stamp/domain";
import { DataTableRowActions } from "@components/stamp/data-table-row-actions";
import { DataTableColumnHeader } from "@components/stamp/data-table-column-header";

export const columns: ColumnDef<SchemaPrimitive>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>
          <Badge variant="outline">{row.getValue("status")}</Badge>
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    accessorKey: "lang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lang" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>{row.getValue("lang")}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
