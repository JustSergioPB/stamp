import Field from "@components/stamp/field";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useTranslation } from "@i18n/server";
import { FileLock2, FileQuestion, Fingerprint } from "lucide-react";
import ContentForm from "./content-form";
import { ContentDetailedView } from "@features/credentials/template/models/views/content-detailed.view";
import { ContentUtils } from "@features/credentials/template/utils/content.utils";
import { ObjectJsonSchemaPill } from "./json-schema-pill";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  value: ContentDetailedView | undefined;
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
  const content = ContentUtils.toZod(value);

  function renderContent() {
    if (!value) return <></>;
    const withOutId = ContentUtils.removeIdFromSchema(value.credentialSubject);

    return <ObjectJsonSchemaPill jsonSchema={withOutId} />;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("form.content.title")}</CardTitle>
          <ContentForm lang={lang} templateId={id} formValue={content} />
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
          <Field label={tWord("anonymous")} Icon={FileLock2}>
            <p className="text-sm">
              {value?.isAnonymous ? tWord("yes") : tWord("no")}
            </p>
          </Field>
        </div>
        <h3>{t("form.content.title")}</h3>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
