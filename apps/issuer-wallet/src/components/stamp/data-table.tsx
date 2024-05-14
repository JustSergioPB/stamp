"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Column } from "@models/column";
import { getDynamicTranslation } from "@i18n/helpers/get-dynamic-translation";
import { Translatable } from "@i18n/types/translatable";

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
} & Translatable;

export function DataTable<T>({ columns, data, lang }: Props<T>) {
  return (
    <div className="rounded-lg border shadow-sm bg-white grow shrink-0 basis-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white w-full">
            {columns.map((column) => (
              <TableHead key={column.name}>
                <div className="flex items-center space-x-2">
                  {getDynamicTranslation(lang, column.name)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell className="px-4 py-2" key={column.name}>
                    {column.cell(item, lang)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
