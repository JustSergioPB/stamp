import Sidepanel from "./sidepanel";
import { TemplateSchema } from "@schemas/template/template.schema";
import { Query } from "@models/query";
import { useTranslation } from "@i18n/server";
import { searchTemplate } from "@db/repositories";
import { fromUrl } from "@utils/query";
import Content from "./content";

type SchemasProps = {
  searchParams: {
    mode: string;
  } & Record<keyof Query<TemplateSchema>, string | undefined>;
  params: { lang: string };
};

export default async function Templates({
  searchParams,
  params: { lang },
}: SchemasProps) {
  const { mode, ...rest } = searchParams;
  const { t } = await useTranslation(lang, "template");
  const queryResult = await searchTemplate(fromUrl(rest));
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
        <Sidepanel isOpen={mode === "create"} lang={lang} />
      </div>
      <Content result={queryResult} lang={lang} />
    </div>
  );
}
