"use client";

import { Paginator } from "@components/stamp/paginator";
import { COLUMNS } from "./columns";
import { DataTable } from "@components/stamp/data-table";
import { QueryResult } from "@stamp/database";
import { SchemaPrimitive } from "@stamp/domain";
import { Translatable } from "@i18n/types/translatable";

type Props = {
  queryResult: QueryResult<SchemaPrimitive>;
} & Translatable;

export default function Table({ queryResult, lang }: Props) {
  return (
    <>
      <DataTable lang={lang} columns={COLUMNS} data={queryResult.items} />
      <Paginator
        currentPage={queryResult.currentPage}
        pageSize={queryResult.pageSize}
        totalPages={queryResult.totalPages}
        lang={lang}
      />
    </>
  );
}
