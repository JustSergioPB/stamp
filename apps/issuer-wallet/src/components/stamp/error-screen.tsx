import { useTranslation } from "@i18n/server";
import { Clock2, Mail, RotateCcw } from "lucide-react";

type Props = {
  lang: string;
};

export default async function ErrorScreen({ lang }: Props) {
  const { t } = await useTranslation(lang, "error-screen");
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-start gap-1 text-center">
        <h1 className="text-xl font-bold mb-1">{t("title")}</h1>
        <h2 className="text-lg text-neutral-500 mb-5">{t("subtitle")}</h2>
        <ul>
          <li className="text-neutral-500 flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {t("options.refresh")}
          </li>
          <li className="text-neutral-500 flex items-center gap-2 my-2">
            <Clock2 className="h-4 w-4" name="clock2" />
            {t("options.tryAgain")}
          </li>
          <li className="text-neutral-500 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t("options.sendEmail")}
          </li>
        </ul>
      </div>
    </div>
  );
}
