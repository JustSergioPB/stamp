import Field from "@components/stamp/field";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useTranslation } from "@i18n/server";
import { FileLock2, FileQuestion, Fingerprint } from "lucide-react";
import ContentForm from "./content-form";
import { ContentUtils } from "@features/credentials/template/utils/content.utils";
import { ObjectJsonSchemaPill } from "./json-schema-pill";
import { TemplateDetailedView } from "@features/credentials/template/models";
import { TemplateUtils } from "@features/credentials/template/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: TemplateDetailedView;
}

export default async function ContentCard({
  lang,
  template,
  className,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tWord } = await useTranslation(lang, "words");
  const content = ContentUtils.toZod(template.content);

  function renderContent() {
    const withOutId = ContentUtils.removeIdFromSchema(
      template.content.credentialSubject
    );

    return <ObjectJsonSchemaPill jsonSchema={withOutId} />;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.content.title")}</CardTitle>
          <ContentForm
            lang={lang}
            orgId={""}
            templateId={template.id}
            formValue={content}
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
        {renderContent()}
      </CardContent>
    </Card>
  );
}
