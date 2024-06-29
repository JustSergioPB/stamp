import EmptyScreen from "@components/stamp/empty-screen";
import { Org } from "@features/users/models";
import { OrgMongoRepository } from "@features/users/repositories";
import { useTranslation } from "@i18n/server";
import { QueryMapper, SearchParams } from "@lib/query";
import AddButton from "./_components/add-button";
import OrgTable from "./_components/table";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  const { t } = await useTranslation(lang, "orgs");
  const query = QueryMapper.fromURL<Org>(searchParams);
  const repo = new OrgMongoRepository();
  const paginatedList = await repo.search(query);

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
        <OrgTable lang={lang} result={paginatedList} />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddButton lang={lang} />
        </EmptyScreen>
      )}
    </div>
  );
}
