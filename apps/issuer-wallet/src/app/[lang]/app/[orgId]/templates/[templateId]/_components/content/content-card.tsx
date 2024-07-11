import Field from "@components/stamp/field";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useTranslation } from "@i18n/server";
import { FileLock2, FileQuestion, Fingerprint } from "lucide-react";
import ContentForm from "./content-form";
import { ObjectJsonSchemaPill } from "./json-schema-pill";
import { Template } from "@features/credentials/template/models";
import { TemplateUtils } from "@features/credentials/template/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: Template;
}

export default async function ContentCard({
  lang,
  template,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.content.title")}</CardTitle>
          <ContentForm
            lang={lang}
            orgId={""}
            templateId={template.id}
            formValue={template.content}
            disabled={!TemplateUtils.canEdit(template)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3>{tWord("identification")}</h3>
        <div className="space-y-4">
          <Field label={tWord("identifiable")} Icon={FileQuestion}>
            <p className="text-sm">
              {template.content.id?.present ? tWord("yes") : tWord("no")}
            </p>
          </Field>
          <Field label={tWord("idType")} Icon={Fingerprint}>
            <p className="text-sm">
              {template.content.id?.type
                ? t(`id.${template.content.id?.type.toLowerCase()}`)
                : ""}
            </p>
          </Field>
          <Field label={tWord("anonymous")} Icon={FileLock2}>
            <p className="text-sm">
              {template.content.isAnonymous ? tWord("yes") : tWord("no")}
            </p>
          </Field>
        </div>
        <h3>{t("form.content.title")}</h3>
        <ObjectJsonSchemaPill
          jsonSchemaZod={template.content.credentialSubject}
        />
      </CardContent>
    </Card>
  );
}
