import Field from "@components/stamp/field";

import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { ContentZod } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import { Pencil, FileQuestion, Fingerprint } from "lucide-react";
import ContentForm from "./content-form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: ContentZod | undefined;
  id: string;
}

export default async function ContentCard({
  lang,
  value,
  id,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.content.title")}</CardTitle>
          <ContentForm lang={lang} templateId={id} formValue={value} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3>{tWord("identification")}</h3>
        <div className="space-y-4">
          <Field label={tWord("identifiable")} Icon={FileQuestion}>
            <p className="text-sm">
              {value?.id?.present ? tWord("yes") : tWord("no")}
            </p>
          </Field>
          <Field label={tWord("idType")} Icon={Fingerprint}>
            <p className="text-sm">
              {value?.id?.type ? t(`id.${value?.id?.type.toLowerCase()}`) : ""}
            </p>
          </Field>
        </div>
        <h3>{t("form.content.title")}</h3>
        {value ? <></> : <></>}
      </CardContent>
    </Card>
  );
}
