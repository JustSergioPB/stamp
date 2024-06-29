import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Paginator from "@components/stamp/paginator";
import { useTranslation } from "@i18n/server";
import TextCell from "@components/stamp/text-cell";
import { PaginatedList } from "@lib/query";
import { Org } from "@features/users/models";
import { Badge } from "@components/ui/badge";
import LinkCell from "@components/stamp/link-cell";

export type Column<T> = {
  key: keyof T;
  name: string;
};

type Props = {
  lang: string;
  result: PaginatedList<Org>;
};

const columns: Column<Org>[] = [
  {
    key: "id",
    name: "props.id",
  },
  {
    key: "name",
    name: "form.name.label",
  },
  {
    key: "type",
    name: "form.type.label",
  },
  {
    key: "users",
    name: "props.users",
  },
];

export default async function OrgTable({ lang, result }: Props) {
  const { t } = await useTranslation(lang, "orgs");

  function getCell(item: Org, key: keyof Org) {
    switch (key) {
      case "id":
        return <LinkCell value={item.id} href={`orgs/${item.id}`} />;
      case "name":
        return <TextCell value={item.name} />;
      case "type":
        return (
          <div className="flex space-x-2">
            <Badge variant="outline">{t(`types.${item.type}`)}</Badge>
          </div>
        );
      case "users":
        return <TextCell value={item.users.length.toString()} />;
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
            {result.items.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell className="px-4 py-2" key={column.name}>
                    {getCell(item, column.key)}
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
    </>
  );
}
