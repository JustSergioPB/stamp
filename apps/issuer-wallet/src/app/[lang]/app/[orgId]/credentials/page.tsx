import { useTranslation } from "@i18n/server";
import { SearchParams } from "@lib/query";

type Props = {
  searchParams: SearchParams;
  params: { lang: string; orgId: string };
};

export default async function Page({
  searchParams,
  params: { lang, orgId },
}: Props) {
  const { t } = await useTranslation(lang, "credential");
  return (
    <div className="h-full flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className=" text-neutral-500">{t("cta")}</p>
        </div>
      </div>
    </div>
  );
}
