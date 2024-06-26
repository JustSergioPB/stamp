"use client";

import { createTemplateCommand } from "@commands/template.commands";
import { Button } from "@components/ui/button";
import { useTranslation } from "@i18n/client";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  lang: string;
};

export default function AddButton({ lang }: Props) {
  const { t } = useTranslation(lang, "template");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onClick() {
    setLoading(true);
    try {
      const id = await createTemplateCommand();
      setLoading(false);
      router.push(`/${lang}/app/templates/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" onClick={onClick} disabled={loading}>
      {loading ? (
        <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <CirclePlus className="h-4 w-4 mr-2" />
      )}
      {t("add")}
    </Button>
  );
}
