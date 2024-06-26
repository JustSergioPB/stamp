import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Paginator from "@components/stamp/paginator";
import { Column } from "@models/ui/column";
import { useTranslation } from "@i18n/server";
import { PaginatedList } from "@models/query";
import { TemplateSummary } from "@models/domain/template";
import TextCell from "@components/stamp/text-cell";
import LinkCell from "@components/stamp/link-cell";
import ChipListCell from "@components/stamp/chip-list-cell";
import StatusCell from "@components/stamp/status-cell";

type Props = {
  lang: string;
  result: PaginatedList<TemplateSummary>;
};

const columns: Column<TemplateSummary>[] = [
  {
    key: "id",
    name: "summary.id",
  },
  {
    key: "name",
    name: "summary.name",
  },
  {
    key: "status",
    name: "summary.status",
  },
  {
    key: "type",
    name: "summary.type",
  },
  {
    key: "lang",
    name: "summary.lang",
  },
];

export default async function TemplateTable({ lang, result }: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tLang } = await useTranslation(lang, "langs");

  function getCell(item: TemplateSummary, key: keyof TemplateSummary) {
    switch (key) {
      case "id":
        return <LinkCell value={item.id} href={`templates/${item.id}`} />;
      case "name":
        return <TextCell value={item.name ?? ""} />;
      case "type":
        return <ChipListCell value={item.type ?? []} />;
      case "lang":
        return <TextCell value={item.lang ? tLang(item.lang) : ""} />;
      case "status":
        return (
          <StatusCell
            value={t(
              item.status === "ready" ? "status.ready" : "status.notReady"
            )}
            variant={item.status === "ready" ? "success" : "base"}
          />
        );
      default:
        return <></>;
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
                <TableRow key={index}>
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
