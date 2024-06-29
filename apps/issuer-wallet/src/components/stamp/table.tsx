import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@components/ui/table";
import Paginator from "./paginator";
import React from "react";
import { PaginatedList } from "@lib/query";
import { cn } from "@lib/utils";

export type Column<T> = {
  key: keyof T;
  name: string;
  className?: string;
  cell: (item: T) => React.ReactNode;
};

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  result: PaginatedList<T>;
  columns: Column<T>[];
}

export default async function StampTable<T>({
  lang,
  result,
  columns,
  className,
}: Props<T>) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="rounded-lg border shadow-sm bg-white grow shrink-0 basis-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white w-full">
              {columns.map((column) => (
                <TableHead key={column.name}>
                  <div
                    className={cn(
                      "flex items-center space-x-2",
                      column.className
                    )}
                  >
                    {column.name}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    className={cn("px-4 py-2", column.className)}
                    key={column.name}
                  >
                    {column.cell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Paginator
        currentPage={result.currentPage}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        lang={lang}
      />
    </div>
  );
}
