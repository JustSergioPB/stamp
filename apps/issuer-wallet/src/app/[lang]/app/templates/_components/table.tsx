import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Paginator from "@components/stamp/paginator";

import NameCell from "@components/template/cell/name-cell";
import TypeCell from "@components/template/cell/type-cell";
import LangCell from "@components/template/cell/lang-cell";
import { Column } from "@models/ui/column";
import { TemplateSchema } from "@schemas/template";
import { useTranslation } from "@i18n/server";
import { QueryResult } from "@models/query";

type Props = {
  lang: string;
  result: QueryResult<TemplateSchema>;
};

const columns: Column<TemplateSchema>[] = [
  {
    key: "base",
    name: "props.name",
  },
  {
    key: "content",
    name: "props.type",
  },
  {
    key: "security",
    name: "props.lang",
  },
];

export default async function TemplateTable({ lang, result }: Props) {
  const { t } = await useTranslation(lang, "template");

  function getCell(item: TemplateSchema, key: keyof TemplateSchema) {
    switch (key) {
      case "base":
        return <NameCell item={item} />;
      case "content":
        return <TypeCell item={item} />;
      case "security":
        return <LangCell item={item} lang={lang} />;
      default:
        return "";
    }
  }

  return (
    <>
      <div className="rounded-lg border shadow-sm bg-white grow shrink-0 basis-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white w-full">
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <div className="flex items-center space-x-2">
                    {t(column.name)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((item, index) => {
              return (
                <TableRow key={index} className="hover:cursor-pointer">
                  {columns.map((column) => (
                    <TableCell className="px-4 py-2" key={column.name}>
                      {getCell(item, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Paginator
        currentPage={result.currentPage}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        lang={lang}
      />
    </>
  );
}
