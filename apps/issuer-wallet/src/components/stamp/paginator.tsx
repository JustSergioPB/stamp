"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Props = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  children?: React.ReactNode;
};

export function Paginator({
  pageSize,
  currentPage,
  totalPages,
  children,
}: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function onPageSizeChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", value);
    replace(`${pathname}?${params.toString()}`);
  }

  function onFirstPage() {
    const params = new URLSearchParams(searchParams);
    params.set("page", "0");
    replace(`${pathname}?${params.toString()}`);
  }
  function onPreviousPage() {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage - 1}`);
    replace(`${pathname}?${params.toString()}`);
  }
  function onNextPage() {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage + 1}`);
    replace(`${pathname}?${params.toString()}`);
  }
  function onLastPage() {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${totalPages - 1}`);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-end px-2">
      {children}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={onPageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((option) => (
                <SelectItem key={option} value={`${option}`}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage + 1} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={onFirstPage}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={onPreviousPage}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={onNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={onLastPage}
            disabled={currentPage === totalPages - 1}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
