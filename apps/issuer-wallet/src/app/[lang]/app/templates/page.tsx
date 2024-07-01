import { useTranslation } from "@i18n/server";
import EmptyScreen from "@components/stamp/empty-screen";
import AddButton from "./_components/add-button";
import { SearchParams, QueryMapper } from "@lib/query";
import { TemplateMongoRepository } from "@features/template/repositories";
import { Template, TemplateSummaryView } from "@features/template/models";
import { SummaryMapper } from "@features/template/utils";
import StampTable, { Column } from "@components/stamp/table";
import LinkCell from "@components/stamp/link-cell";
import TextCell from "@components/stamp/text-cell";
import ChipListCell from "@components/stamp/chip-list-cell";
import StatusCell from "@components/stamp/status-cell";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tLang } = await useTranslation(lang, "langs");

  const query = QueryMapper.fromURL<Template>(searchParams);
  const paginatedList = await TemplateMongoRepository.search(query);
  const { items, ...rest } = paginatedList;
  const summaryPaginatedList = {
    items: items.map((item) => SummaryMapper.fromTemplate(item)),
    ...rest,
  };

  const columns: Column<TemplateSummaryView>[] = [
    {
      key: "id",
      name: t("summary.id"),
      cell: (item) => (
        <LinkCell value={item.id} href={`templates/${item.id}`} />
      ),
    },
    {
      key: "name",
      name: t("summary.name"),
      cell: (item) => <TextCell value={item.name ?? ""} />,
    },
    {
      key: "status",
      name: t("summary.status"),
      cell: (item) => (
        <StatusCell
          value={t(
            item.status === "ready" ? "status.ready" : "status.notReady"
          )}
          variant={item.status === "ready" ? "success" : "base"}
        />
      ),
    },
    {
      key: "type",
      name: t("summary.type"),
      cell: (item) => <ChipListCell value={item.type ?? []} />,
    },
    {
      key: "lang",
      name: t("summary.lang"),
      cell: (item) => <TextCell value={item.lang ? tLang(item.lang) : ""} />,
    },
  ];

  return (
    <div className="h-full flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        <AddButton lang={lang} />
      </div>
      {paginatedList.items.length > 0 ? (
        <StampTable
          lang={lang}
          result={summaryPaginatedList}
          columns={columns}
          className="grow shrink-0 basis-auto"
        />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddButton lang={lang} />
        </EmptyScreen>
      )}
    </div>
  );
}
