"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@i18n/client";
import TemplateForm from "@components/template/forms/template-form";

type Props = {
  isOpen: boolean;
  lang: string;
};

export default function Sidepanel({ isOpen, lang }: Props) {
  const router = useRouter();
  const { t } = useTranslation(lang, "template");

  function onOpenClick() {
    router.push("?mode=create");
  }

  function onClose() {
    router.back();
  }

  return (
    <>
      <Button size="sm" onClick={onOpenClick}>
        <CirclePlus className="h-4 w-4 mr-2" />
        {t("add")}
      </Button>
      <div
        data-state={isOpen ? "open" : "closed"}
        className="fixed inset-0 z-40 bg-neutral/500 backdrop-blur-sm transition-opacity duration-300 ease-in-out [&[data-state=open]]:opacity-100 [&[data-state=closed]]:pointer-events-none [&[data-state=closed]]:opacity-0 p-4"
      >
        <Card
          data-state={isOpen ? "open" : "closed"}
          className="sidepanel w-2/5 flex flex-col absolute right-4 top-4 transition-transform duration-300 ease-in-out [&[data-state=open]]:translate-x-0 [&[data-state=closed]]:translate-x-full"
        >
          <CardHeader>
            <CardTitle>{t("create")}</CardTitle>
          </CardHeader>
          <CardContent className="grow shrink-0 basis-auto">
            <TemplateForm onReset={onClose} onSubmit={onClose} lang={lang} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
