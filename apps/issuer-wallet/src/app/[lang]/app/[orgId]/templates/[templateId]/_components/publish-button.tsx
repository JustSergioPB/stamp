"use client";

import { Button } from "@components/ui/button";
import { Template } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/client";
import { Earth, EarthLock } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: Template;
}

export default function PublishButton({ lang, template }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <Button variant="ghost" size="sm">
      {template.state === "private" ? (
        <Earth className="h-4 w-4 mr-2" />
      ) : (
        <EarthLock className="h-4 w-4 mr-2" />
      )}
      {t("publish.label")}
    </Button>
  );
}
