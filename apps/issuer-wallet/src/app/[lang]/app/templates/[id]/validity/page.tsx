import ValdityForm from "@components/template/forms/validity-form";
import { useTranslation } from "@i18n/server";

type Props = {
  params: { lang: string; id: string };
};

export default async function Page({ params: { lang, id } }: Props) {
  const { t } = await useTranslation(lang, "template");

  return (
    <section className="p-10 flex flex-col h-full w-2/3">
      <h2 className="text-lg font-semibold mb-2">{t("form.validity.title")}</h2>
      <h3 className="text-sm text-muted-foreground mb-8">
        {t("form.validity.subtitle")}
      </h3>
      <ValdityForm className="grow shrink-0 basis-auto" lang={lang} />
    </section>
  );
}
