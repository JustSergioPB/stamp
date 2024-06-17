import { useTranslation } from "@i18n/server";
import { TemplateSchema } from "@schemas/template";

type Props = {
  item: TemplateSchema;
  lang: string;
};

export default async function LangCell({ item, lang }: Props) {
  const { t } = await useTranslation(lang, "langs");
  const displayed = item.lang ? t(item.lang) : "--";
  return (
    <div className="flex space-x-2">
      <span className="max-w-[500px] truncate font-medium">{displayed}</span>
    </div>
  );
}
