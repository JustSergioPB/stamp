import ErrorScreen from "@components/stamp/error-screen";
import EmptyScreen from "@components/stamp/empty-screen";
import { QueryResult } from "@models/query";
import Paginator from "@components/stamp/paginator";
import { useTranslation } from "@i18n/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { TemplateMongo } from "@db/models";
import NameCell from "@components/template/cell/name-cell";
import TypeCell from "@components/template/cell/type-cell";
import LangCell from "@components/template/cell/lang-cell";

type Props = {
  result: QueryResult<TemplateMongo>;
  lang: string;
};

type Column<T> = {
  key: keyof T;
  name: string;
};

export default async function Content({ result, lang }: Props) {
  const { t } = await useTranslation(lang, "template");
  const columns: Column<TemplateMongo>[] = [
    {
      key: "name",
      name: "props.name",
    },
    {
      key: "type",
      name: "props.type",
    },
    {
      key: "lang",
      name: "props.lang",
    },
  ];

  function getCell(item: TemplateMongo, key: keyof TemplateMongo) {
    switch (key) {
      case "name":
        return <NameCell item={item} />;
      case "type":
        return <TypeCell item={item} />;
      case "lang":
        return <LangCell item={item} lang={lang} />;
      default:
        return "";
    }
  }

  try {
    return result.items.length > 0 ? (
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
    ) : (
      <EmptyScreen
        title={t("empty.title")}
        subtitle={t("empty.subtitle")}
        action={t("add")}
      />
    );
  } catch (error) {
    return <ErrorScreen lang={lang} />;
  }
}
