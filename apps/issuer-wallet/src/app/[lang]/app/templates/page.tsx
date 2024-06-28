import { useTranslation } from "@i18n/server";
import EmptyScreen from "@components/stamp/empty-screen";
import AddButton from "./_components/add-button";
import TemplateTable from "./_components/table";
import { SearchParams, QueryMapper } from "@lib/query";
import {
  SummaryMapper,
  Template,
  TemplateMongoRepository,
} from "@features/template";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  const { t } = await useTranslation(lang, "template");
  const query = QueryMapper.fromURL<Template>(searchParams);
  const paginatedList = await new TemplateMongoRepository().search(query);
  const { items, ...rest } = paginatedList;
  const summaryPaginatedList = {
    items: items.map((item) => SummaryMapper.fromTemplate(item)),
    ...rest,
  };

  return (
    <div className="h-full flex flex-col gap-4 p-10">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        <AddButton lang={lang} />
      </div>
      {paginatedList.items.length > 0 ? (
        <TemplateTable lang={lang} result={summaryPaginatedList} />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddButton lang={lang} />
        </EmptyScreen>
      )}
    </div>
  );
}
