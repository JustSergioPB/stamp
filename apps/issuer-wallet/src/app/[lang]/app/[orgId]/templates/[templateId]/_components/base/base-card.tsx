import ChipList from "@components/stamp/chip-list";
import Field from "@components/stamp/field";
import StateBadge from "@components/stamp/status-badge";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Template } from "@features/credentials/template/models";
import { useTranslation } from "@i18n/server";
import {
  FileSignature,
  Loader,
  Languages,
  FileQuestion,
  Fingerprint,
  Text,
} from "lucide-react";
import BaseForm from "./base-form";
import { TemplateUtils } from "@features/credentials/template/utils";
import DeprecateButton from "../deprecate-button";
import PublishButton from "../publish-button";

interface Props extends React.HTMLAttributes<HTMLElement> {
  lang: string;
  template: Template;
}

export default async function BaseCard({
  lang,
  id,
  className,
  template,
}: Props) {
  const { t } = await useTranslation(lang, "template");
  const { t: tLang } = await useTranslation(lang, "langs");
  const { t: tWord } = await useTranslation(lang, "words");

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{template.base?.name ?? id}</CardTitle>
          <div className="flex items-center gap-4">
            <PublishButton lang={lang} template={template} />
            <DeprecateButton lang={lang} template={template} />
            <BaseForm
              lang={lang}
              templateId={template.id}
              formValue={template.base}
              disabled={!TemplateUtils.canEdit(template)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field type="vertical" label={t("summary.description")} Icon={Text}>
          <p className="text-sm">{template.base?.description}</p>
        </Field>
        <Field type="vertical" label={t("summary.type")} Icon={FileSignature}>
          <ChipList items={template.base?.type ?? []} />
        </Field>
        <div className="flex gap-8">
          <div className="space-y-4 basis-1/2">
            <h3>{tWord("summary")}</h3>
            <Field label={t("summary.status")} Icon={Loader}>
              <StateBadge value={template.state} lang={lang} />
            </Field>
            <Field label={t("summary.lang")} Icon={Languages}>
              <p className="text-sm">
                {template.base?.lang ? tLang(template.base?.lang) : ""}
              </p>
            </Field>
          </div>
          <div className="space-y-4 basis-1/2">
            <h3>{tWord("identification")}</h3>
            <div className="space-y-4">
              <Field label={tWord("identifiable")} Icon={FileQuestion}>
                <p className="text-sm">
                  {template.base?.id?.present ? tWord("yes") : tWord("no")}
                </p>
              </Field>
              <Field label={tWord("idType")} Icon={Fingerprint}>
                <p className="text-sm">
                  {template.base?.id?.type
                    ? t(`id.${template.base?.id?.type.toLowerCase()}`)
                    : ""}
                </p>
              </Field>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
