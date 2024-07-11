"use client";

import { Button } from "@components/ui/button";
import { TemplateDetailedView } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/client";
import { FileX2 } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: TemplateDetailedView;
}

export default function DeprecateButton({ lang, template }: Props) {
  const { t } = useTranslation(lang, "template");
  return (
    <Button variant="ghost" size="sm">
      <FileX2 className="w-4 h-4 mr-2" />
      {t("deprecate.label")}
    </Button>
  );
}
