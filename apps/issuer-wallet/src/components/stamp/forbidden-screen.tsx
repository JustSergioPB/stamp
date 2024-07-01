import { buttonVariants } from "@components/ui/button";
import { useTranslation } from "@i18n/server";
import { cn } from "@lib/utils";
import { ArrowRight, Ban, Lock, TimerOff } from "lucide-react";
import Link from "next/link";

type Props = {
  lang: string;
};

export default async function ForbiddenScreen({ lang }: Props) {
  const { t } = await useTranslation(lang, "auth");

  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center basis-1/3">
        <Lock className="h-16 w-16 mb-2" />
        <h1 className="text-2xl font-semibold mb-2">{t("forbidden.title")}</h1>
        <p className="text-muted-foreground mb-8">
          {t("forbidden.description")}
        </p>
        <ul className="space-y-4 mb-16 flex flex-col items-center">
          <li className="flex items-start text-muted-foreground">
            <TimerOff className="h-5 w-5 mr-2" />
            <p className="text-muted-foreground">{t("forbidden.reasons.1")}</p>
          </li>
          <li className="flex items-start text-muted-foreground text-center">
            <Ban className="h-5 w-5 mr-2" />
            <p>{t("forbidden.reasons.2")}</p>
          </li>
        </ul>
        <Link className={cn(buttonVariants())} href="/auth">
          {t("forbidden.button")}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </main>
  );
}
