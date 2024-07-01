"use client";

import { buttonVariants } from "@components/ui/button";
import { verifyMagicLinkCommand } from "@features/auth/commands";
import { useTranslation } from "@i18n/client";
import { SearchParams } from "@lib/query";
import { cn } from "@lib/utils";
import { ArrowRight, HeartCrack, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
  params: { lang: string };
  searchParams: SearchParams;
};

export default function Page({ params: { lang }, searchParams }: Props) {
  const token = searchParams.token;
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const { t } = useTranslation(lang, "auth");
  const router = useRouter();

  const verify = useCallback(async (token: string) => {
    setLoading(true);
    const { errorCode } = await verifyMagicLinkCommand(token);
    setErrorCode(errorCode);
    setLoading(false);
    if (!errorCode) {
      router.push(`/${lang}/app/templates`);
    }
  }, []);

  useEffect(() => {
    if (token && !Array.isArray(token)) {
      verify(token);
    }
  }, [verify]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center basis-full">
        {loading ? (
          <>
            <Loader className="h-16 w-16 mb-4 animate-spin" />
            <h1 className="text-2xl font-semibold mb-2">{t('expired.loading')}</h1>
          </>
        ) : errorCode ? (
          <>
            <HeartCrack className="h-16 w-16 mb-4" />
            <h1 className="text-2xl font-semibold mb-2">
              {t("expired.title")}
            </h1>
            <p className="text-muted-foreground w-1/3 text-center mb-16">
              {t("expired.description")}
            </p>
            <Link className={cn(buttonVariants())} href="/auth">
              {t("expired.button")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}