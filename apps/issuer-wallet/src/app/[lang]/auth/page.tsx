import { useTranslation } from "@i18n/server";
import MagicLinkForm from "./_components/magic-link-form";
import Banner from "@components/stamp/banner";

type Props = {
  params: { lang: string };
};

export default async function Page({ params: { lang } }: Props) {
  const { t } = await useTranslation(lang, "auth");

  return (
    <main className="flex h-full">
      <section className="basis-1/2 h-full bg-primary flex flex-col justify-end px-16 py-32 gap-4">
        <h1 className="text-4xl text-primary-foreground">{t("welcome")}</h1>
        <h2 className="text-xl text-muted">{t("description")}</h2>
      </section>
      <section className="basis-1/2 h-full flex items-center justify-center">
        <div>
          <Banner className="mb-10" />
          <h3 className="text-2xl font-bold mb-2">{t("title")}</h3>
          <p className="text-muted-foreground mb-16">{t("subtitle")}</p>
          <MagicLinkForm lang={lang} className="w-96" />
        </div>
      </section>
    </main>
  );
}
