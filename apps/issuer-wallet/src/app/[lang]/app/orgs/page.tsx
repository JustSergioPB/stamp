import EmptyScreen from "@components/stamp/empty-screen";
import { Org } from "@features/auth/models";
import { OrgMongoRepository } from "@features/auth/repositories";
import { useTranslation } from "@i18n/server";
import { QueryMapper, SearchParams } from "@lib/query";
import AddButton from "./_components/add-button";
import StampTable, { Column } from "@components/stamp/table";
import LinkCell from "@components/stamp/link-cell";
import TextCell from "@components/stamp/text-cell";
import { Badge } from "@components/ui/badge";
import { CookieSession } from "@features/auth/utils";

type Props = {
  searchParams: SearchParams;
  params: { lang: string };
};

export default async function Page({ searchParams, params: { lang } }: Props) {
  if (!process.env.JWT_SECRET) {
    throw new Error("No secret found");
  }

  const session = await CookieSession.getCurrent(process.env.JWT_SECRET);

  if (!session || session.role !== "superAdmin") {
    throw new Error("Forbidden");
  }

  const { t } = await useTranslation(lang, "orgs");
  const query = QueryMapper.fromURL<Org>(searchParams);
  const paginatedList = await OrgMongoRepository.search(query);

  const columns: Column<Org>[] = [
    {
      key: "id",
      name: t("props.id"),
      cell: (item) => <LinkCell value={item.id} href={`orgs/${item.id}`} />,
    },
    {
      key: "name",
      name: t("form.name.label"),
      cell: (item) => <TextCell value={item.name} />,
    },
    {
      key: "type",
      name: t("form.type.label"),
      cell: (item) => (
        <div className="flex space-x-2">
          <Badge variant="outline">{t(`types.${item.type}`)}</Badge>
        </div>
      ),
    },
  ];

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
        <StampTable
          lang={lang}
          result={paginatedList}
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
