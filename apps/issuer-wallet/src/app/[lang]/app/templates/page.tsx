import { TemplateSchema } from "@schemas/template/template.schema";
import { Query } from "@models/query";
import { useTranslation } from "@i18n/server";
import { searchTemplate } from "@db/repositories";
import { fromUrl } from "@utils/query";
import EmptyScreen from "@components/stamp/empty-screen";
import AddButton from "./_components/add-button";
import TemplateTable from "./_components/table";

type SchemasProps = {
  searchParams: {
    mode: string;
  } & Record<keyof Query<TemplateSchema>, string | undefined>;
  params: { lang: string };
};

export default async function Page({
  searchParams,
  params: { lang },
}: SchemasProps) {
  const { t } = await useTranslation(lang, "template");
  const queryResult = await searchTemplate(fromUrl(searchParams));

  return (
    <div className="h-full flex flex-col gap-4 p-10">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        <AddButton lang={lang} />
      </div>
      {queryResult.items.length > 0 ? (
        <TemplateTable lang={lang} result={queryResult} />
      ) : (
        <EmptyScreen title={t("empty.title")} subtitle={t("empty.subtitle")}>
          <AddButton lang={lang} />
        </EmptyScreen>
      )}
    </div>
  );
}
