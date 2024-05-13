"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/badge";
import { Checkbox } from "@components/ui/checkbox";
import { SchemaPrimitive } from "@stamp/domain";
import { DataTableRowActions } from "@components/stamp/data-table-row-actions";
import { DataTableColumnHeader } from "@components/stamp/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export const columns: ColumnDef<SchemaPrimitive>[] = [
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
    enableSorting: false,
  },
  {
    accessorKey: "types",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Types" />
    ),
    cell: ({ row }) => {
      const types: string[] = row.getValue("types");
      const displayed = types.slice(0, 2);
      const hidden = types.slice(2);

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] flex gap-1">
            <Badge>{displayed[0]}</Badge>
            {displayed[1] && <Badge>{displayed[1]}</Badge>}
            {hidden.length > 0 && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>+{hidden.length}</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{hidden.join("; ")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
